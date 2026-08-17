import { NextRequest, NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/ConnectDB';
import { Expense } from '@/models/expense.model';
import { Group } from '@/models/group.model';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { addExpenseSchema } from '@/lib/validations';
import { roundCurrency } from '@/lib/financial-engine';

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getAuthenticatedUser(request);
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await ConnectDB();
    const body = await request.json();

    // Map backward-compatible fields if passed by existing UI
    const payload = {
      groupId: body.groupId || body.groupid,
      title: body.title || body.description,
      totalAmount: Number(body.totalAmount || body.amount),
      category: body.category || 'General',
      splitType: body.splitType || 'EQUAL',
      splits: body.splits,
    };

    const result = addExpenseSchema.safeParse(payload);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const { groupId, title, totalAmount, category, splitType, splits } =
      result.data;

    // Verify group & membership
    const group = await Group.findById(groupId);
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    const isMember = group.members.some(
      (m) => m.userId.toString() === currentUser._id.toString()
    );

    if (!isMember) {
      return NextResponse.json(
        { error: 'Forbidden: You are not a member of this group' },
        { status: 403 }
      );
    }

    // Build splits breakdown
    let computedSplits: Array<{
      userId: any;
      amount: number;
      percentage?: number;
    }> = [];

    if (splits && splits.length > 0 && splitType !== 'EQUAL') {
      computedSplits = splits.map((s) => ({
        userId: s.userId,
        amount: roundCurrency(s.amount),
        percentage: s.percentage,
      }));
    } else {
      // Equal split across all active group members
      const activeMembersCount = group.members.length || 1;
      const equalShare = roundCurrency(totalAmount / activeMembersCount);
      computedSplits = group.members.map((m) => ({
        userId: m.userId,
        amount: equalShare,
        percentage: roundCurrency(100 / activeMembersCount),
      }));
    }

    const newExpense = await Expense.create({
      groupId,
      title: title.trim(),
      totalAmount: roundCurrency(totalAmount),
      paidBy: currentUser._id,
      paidmemberUsername: currentUser.username,
      paidmemberAvatar: currentUser.avatar || '',
      category,
      splitType,
      splits: computedSplits,
      date: new Date(),
    });

    return NextResponse.json(
      { message: 'Expense added successfully', expense: newExpense },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST /api/expense/addexpense error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
