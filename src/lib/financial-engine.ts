import { IExpense } from '@/models/expense.model';
import { ISettlement } from '@/models/settlement.model';

export function roundCurrency(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function formatCurrency(amount: number, symbol = '$'): string {
  const rounded = Math.abs(roundCurrency(amount)).toFixed(2);
  if (amount < 0) {
    return `-${symbol}${rounded}`;
  }
  return `${symbol}${rounded}`;
}

export interface MemberSummary {
  userId: string;
  username: string;
  avatar: string;
  totalPaid: number;
  totalOwed: number;
  netBalance: number;
}

export interface SuggestedSettlement {
  fromUserId: string;
  fromUsername: string;
  fromAvatar?: string;
  toUserId: string;
  toUsername: string;
  toAvatar?: string;
  amount: number;
}

export interface GroupFinancialSummary {
  memberSummaries: Record<string, MemberSummary>;
  suggestedSettlements: SuggestedSettlement[];
  totalExpenses: number;
}

export function calculateGroupBalances(
  members: Array<{ userId: string | any; username?: string; avatar?: string }>,
  expenses: any[],
  settlements: any[]
): GroupFinancialSummary {
  const memberSummaries: Record<string, MemberSummary> = {};
  let totalExpenses = 0;

  // Initialize member records
  for (const m of members) {
    const uId = String(m.userId);
    memberSummaries[uId] = {
      userId: uId,
      username: m.username || 'Member',
      avatar: m.avatar || '',
      totalPaid: 0,
      totalOwed: 0,
      netBalance: 0,
    };
  }

  // 1. Process Expenses
  for (const exp of expenses) {
    const amount = Number(exp.totalAmount) || 0;
    totalExpenses += amount;
    const paidById = String(exp.paidBy?._id || exp.paidBy);

    if (memberSummaries[paidById]) {
      memberSummaries[paidById].totalPaid += amount;
    }

    // Determine split allocation
    if (exp.splits && Array.isArray(exp.splits) && exp.splits.length > 0) {
      for (const s of exp.splits) {
        const participantId = String(s.userId?._id || s.userId);
        if (memberSummaries[participantId]) {
          memberSummaries[participantId].totalOwed += Number(s.amount) || 0;
        }
      }
    } else {
      // Fallback: Equal split among all active group members
      const activeMembersCount = members.length || 1;
      const equalShare = amount / activeMembersCount;
      for (const m of members) {
        const uId = String(m.userId);
        if (memberSummaries[uId]) {
          memberSummaries[uId].totalOwed += equalShare;
        }
      }
    }
  }

  // 2. Process Settlements
  for (const st of settlements) {
    const amount = Number(st.amount) || 0;
    const paidById = String(st.paidBy?._id || st.paidBy);
    const paidToId = String(st.paidTo?._id || st.paidTo);

    // Settlement reduces paidBy's effective debt (increases net balance)
    // and reduces paidTo's credit (decreases net balance)
    if (memberSummaries[paidById]) {
      memberSummaries[paidById].totalPaid += amount;
    }
    if (memberSummaries[paidToId]) {
      memberSummaries[paidToId].totalOwed += amount;
    }
  }

  // Calculate Net Balances and Round Values
  for (const key of Object.keys(memberSummaries)) {
    const summary = memberSummaries[key];
    summary.totalPaid = roundCurrency(summary.totalPaid);
    summary.totalOwed = roundCurrency(summary.totalOwed);
    summary.netBalance = roundCurrency(summary.totalPaid - summary.totalOwed);
  }

  // 3. Debt Simplification Algorithm (Minimal Settlement Matrix)
  const debtors: Array<{ userId: string; amount: number }> = [];
  const creditors: Array<{ userId: string; amount: number }> = [];

  for (const key of Object.keys(memberSummaries)) {
    const summary = memberSummaries[key];
    if (summary.netBalance < -0.009) {
      debtors.push({
        userId: summary.userId,
        amount: Math.abs(summary.netBalance),
      });
    } else if (summary.netBalance > 0.009) {
      creditors.push({ userId: summary.userId, amount: summary.netBalance });
    }
  }

  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const suggestedSettlements: SuggestedSettlement[] = [];
  let dIndex = 0;
  let cIndex = 0;

  while (dIndex < debtors.length && cIndex < creditors.length) {
    const debtor = debtors[dIndex];
    const creditor = creditors[cIndex];

    const settlementAmount = roundCurrency(
      Math.min(debtor.amount, creditor.amount)
    );

    if (settlementAmount > 0.009) {
      suggestedSettlements.push({
        fromUserId: debtor.userId,
        fromUsername: memberSummaries[debtor.userId]?.username || 'User',
        fromAvatar: memberSummaries[debtor.userId]?.avatar,
        toUserId: creditor.userId,
        toUsername: memberSummaries[creditor.userId]?.username || 'User',
        toAvatar: memberSummaries[creditor.userId]?.avatar,
        amount: settlementAmount,
      });
    }

    debtor.amount = roundCurrency(debtor.amount - settlementAmount);
    creditor.amount = roundCurrency(creditor.amount - settlementAmount);

    if (debtor.amount <= 0.009) dIndex++;
    if (creditor.amount <= 0.009) cIndex++;
  }

  return {
    memberSummaries,
    suggestedSettlements,
    totalExpenses: roundCurrency(totalExpenses),
  };
}
