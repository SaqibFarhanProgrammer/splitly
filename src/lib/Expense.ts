import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { Expense } from '@/models/expense.model';

export async function GetExpense(userid: string | null) {
  const expenses = await Expense.find({ paidBy: userid }).lean();

  return JSON.parse(JSON.stringify(expenses));
}
