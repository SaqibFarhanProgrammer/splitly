import { NextRequest, NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/ConnectDB';
import { Expense } from '@/models/expense.model';
import { Group } from '@/models/group.model';
import { getAuthenticatedUser } from '@/lib/auth-server';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const groupId = searchParams.get('groupId') || searchParams.get('groupid');

    if (!groupId) {
      return NextResponse.json(
        { error: 'groupId is required' },
        { status: 400 }
      );
    }

    await ConnectDB();

    const group = await Group.findById(groupId);
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    const isMember = group.members.some(
      (m) => m.userId.toString() === user._id.toString()
    );

    if (!isMember) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const expenses = await Expense.find({ groupId }).sort({ date: -1 }).lean();

    return NextResponse.json(expenses);
  } catch (error: any) {
    console.error('GET /api/expense/getallexpensesbygroupid error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
