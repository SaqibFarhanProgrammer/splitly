import { NextRequest, NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/ConnectDB';
import { Group } from '@/models/group.model';
import { Expense } from '@/models/expense.model';
import { Settlement } from '@/models/settlement.model';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { calculateGroupBalances, roundCurrency } from '@/lib/financial-engine';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await ConnectDB();

    const userIdStr = user._id.toString();

    // Fetch user groups
    const groups = await Group.find({
      'members.userId': user._id,
      isActive: true,
    }).lean();

    const groupIds = groups.map((g) => g._id);

    // Fetch all expenses and settlements for user groups
    const [expenses, settlements] = await Promise.all([
      Expense.find({ groupId: { $in: groupIds } })
        .sort({ date: -1 })
        .lean(),
      Settlement.find({ groupId: { $in: groupIds } })
        .sort({ date: -1 })
        .lean(),
    ]);

    let totalYouOwe = 0;
    let totalYouAreOwed = 0;

    // Calculate user balance within each group
    for (const group of groups) {
      const gExpenses = expenses.filter(
        (e) => String(e.groupId) === String(group._id)
      );
      const gSettlements = settlements.filter(
        (s) => String(s.groupId) === String(group._id)
      );

      const { memberSummaries } = calculateGroupBalances(
        group.members,
        gExpenses,
        gSettlements
      );
      const userSummary = memberSummaries[userIdStr];

      if (userSummary) {
        if (userSummary.netBalance > 0) {
          totalYouAreOwed += userSummary.netBalance;
        } else if (userSummary.netBalance < 0) {
          totalYouOwe += Math.abs(userSummary.netBalance);
        }
      }
    }

    totalYouOwe = roundCurrency(totalYouOwe);
    totalYouAreOwed = roundCurrency(totalYouAreOwed);
    const netBalance = roundCurrency(totalYouAreOwed - totalYouOwe);

    return NextResponse.json({
      totalYouOwe,
      totalYouAreOwed,
      netBalance,
      activeGroupsCount: groups.length,
      recentExpenses: expenses.slice(0, 10),
      recentSettlements: settlements.slice(0, 10),
      groups,
    });
  } catch (error: any) {
    console.error('GET /api/dashboard/summary error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
