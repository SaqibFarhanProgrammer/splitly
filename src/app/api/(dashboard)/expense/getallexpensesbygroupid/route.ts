import { ConnectDB } from '@/lib/ConnectDB';
import { Expense } from '@/models/expense.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  await ConnectDB();

  const { groupId } = await request.json();

  const expenses = await Expense.find({ groupId: groupId });

  return NextResponse.json({ expenses: expenses }, { status: 200 });
}
