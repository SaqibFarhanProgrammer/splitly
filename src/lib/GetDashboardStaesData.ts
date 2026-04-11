import { Expense } from '@/models/expense.model';
import { ConnectDB } from './ConnectDB';
import { Group } from '@/models/group.model';
import { ObjectId } from 'mongoose';

export async function GetDashboardAllStateData(
  userid: string | Promise<string | null>
) {
  const userId = await Promise.resolve(userid);
  await ConnectDB();

  // Date ranges
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  // Expenses in last 30 days by user
  const expensesLast30Days = await Expense.find({
    paidBy: userId,
    createdAt: { $gte: thirtyDaysAgo },
  }).select('totalAmount -_id');

  const monthlyspending = expensesLast30Days.reduce(
    (sum, exp) => sum + exp.totalAmount,
    0
  );

  // Fetch groups the user is part of
  const groups = await Group.find({
    createdBy: userId,
    'members.userId': userId,
  }).select('_id');

  const mygroups = groups.map((g) => g._id);

  // All expenses in those groups in last 30 days
  const allexpenses = await Expense.find({
    groupId: { $in: mygroups },
    createdAt: { $gte: thirtyDaysAgo },
  }).select('totalAmount -_id');

  const allexpenseamount = allexpenses.reduce(
    (sum, exp) => sum + exp.totalAmount,
    0
  );

  const balance = allexpenseamount - monthlyspending;
  const youGet = balance > 0 ? balance : 0;
  const youOwe = balance < 0 ? balance : 0;

  // Daily expenses in last 7 days (aggregate)
  const dailyExpensesRaw = await Expense.aggregate([
    {
      $match: {
        groupId: { $in: mygroups }, // filter for user's groups
        createdAt: { $gte: last7Days },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        total: { $sum: '$totalAmount' },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  // Fill missing days with 0
  const dailyExpenses: { date: string; total: number }[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date();
    day.setDate(day.getDate() - (6 - i));
    const dayStr = day.toISOString().split('T')[0];
    const found = dailyExpensesRaw.find((d) => d._id === dayStr);
    dailyExpenses.push({ date: dayStr, total: found ? found.total : 0 });
  }

  return { monthlyspending, youOwe, youGet, dailyExpenses };
}
