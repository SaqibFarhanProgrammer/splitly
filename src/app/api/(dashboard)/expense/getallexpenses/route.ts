import { GetExpense } from '@/lib/Expense';
import { getUserIdFromToken } from '@/lib/GetTokenFromRequest';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(requst: NextRequest) {
  const id = getUserIdFromToken(requst);
  const expenses = await GetExpense(id);
  console.log(expenses);

  return NextResponse.json(expenses);
}
