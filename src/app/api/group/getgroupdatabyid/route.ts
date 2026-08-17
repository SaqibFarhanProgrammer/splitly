import { NextRequest, NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/ConnectDB';
import { Group } from '@/models/group.model';
import { Expense } from '@/models/expense.model';
import { Settlement } from '@/models/settlement.model';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { calculateGroupBalances } from '@/lib/financial-engine';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get('groupId');

    if (!groupId) {
      return NextResponse.json(
        { error: 'groupId param is required' },
        { status: 400 }
      );
    }

    await ConnectDB();

    const group = await Group.findById(groupId).lean();
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    // Verify membership
    const isMember = group.members.some(
      (m: any) => String(m.userId) === user._id.toString()
    );

    if (!isMember) {
      return NextResponse.json(
        { error: 'Forbidden: You are not a member of this group' },
        { status: 403 }
      );
    }

    const [expenses, settlements] = await Promise.all([
      Expense.find({ groupId }).sort({ date: -1 }).lean(),
      Settlement.find({ groupId }).sort({ date: -1 }).lean(),
    ]);

    const financialSummary = calculateGroupBalances(
      group.members,
      expenses,
      settlements
    );

    return NextResponse.json({
      group,
      expenses,
      settlements,
      financialSummary,
    });
  } catch (error: any) {
    console.error('GET /api/group/getgroupdatabyid error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // Support POST request format where body contains groupId
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const groupId = body.groupId || body.groupid || body.id;

    if (!groupId) {
      return NextResponse.json(
        { error: 'groupId is required' },
        { status: 400 }
      );
    }

    await ConnectDB();

    const group = await Group.findById(groupId).lean();
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    const isMember = group.members.some(
      (m: any) => String(m.userId) === user._id.toString()
    );

    if (!isMember) {
      return NextResponse.json(
        { error: 'Forbidden: You are not a member of this group' },
        { status: 403 }
      );
    }

    const [expenses, settlements] = await Promise.all([
      Expense.find({ groupId }).sort({ date: -1 }).lean(),
      Settlement.find({ groupId }).sort({ date: -1 }).lean(),
    ]);

    const financialSummary = calculateGroupBalances(
      group.members,
      expenses,
      settlements
    );

    return NextResponse.json({
      group,
      expenses,
      settlements,
      financialSummary,
    });
  } catch (error: any) {
    console.error('POST /api/group/getgroupdatabyid error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
