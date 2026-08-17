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

    await ConnectDB();

    // Get user's groups
    const userGroups = await Group.find({
      'members.userId': user._id,
      isActive: true,
    }).select('_id');

    const groupIds = userGroups.map((g) => g._id);

    const expenses = await Expense.find({ groupId: { $in: groupIds } })
      .sort({ date: -1 })
      .limit(50)
      .lean();

    return NextResponse.json(expenses);
  } catch (error: any) {
    console.error('GET /api/expense/getallexpenses error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
