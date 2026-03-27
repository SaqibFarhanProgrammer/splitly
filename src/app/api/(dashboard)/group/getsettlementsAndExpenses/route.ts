import { ConnectDB } from '@/lib/ConnectDB';
import { Expense } from '@/models/expense.model';
import { Settlement } from '@/models/satelment.model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  await ConnectDB();

  const { groupId } = await request.json();

  const expenses = await Expense.find({ groupId });
  const settlements = await Settlement.find({ groupId });

  const combined = [...expenses, ...settlements];

  return NextResponse.json(
    {
      message: 'data fetched successfully',
      data: combined,
    },
    { status: 200 }
  );
}
