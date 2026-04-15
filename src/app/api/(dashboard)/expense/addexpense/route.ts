import { ConnectDB } from '@/lib/ConnectDB';
import { Expense } from '@/models/expense.model';
import { Group } from '@/models/group.model';
import { User } from '@/models/user.model';
import { ExpenseFormValues } from '@/types/globalTypes';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await ConnectDB();

    const body: ExpenseFormValues = await request.json();

    const { amount, description, paidBy, groupid } = body;

    // Debug (remove in production)
    console.log({ amount, description, paidBy, groupid });

    // Required fields check
    if (!amount || !description || !paidBy || !groupid) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Amount validation
    const numericAmount = Number(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { error: 'Amount must be a positive number' },
        { status: 400 }
      );
    }

    // Description validation
    if (description.trim() === '') {
      return NextResponse.json(
        { error: 'Description cannot be empty' },
        { status: 400 }
      );
    }

    // Check user
    const user = await User.findById(paidBy).select(
      '-password -email -groups -createdAt -updatedAt'
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check group
    const group = await Group.findById(groupid);

    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    // Create expense
    const expense = await Expense.create({
      totalAmount: numericAmount,
      title: description.trim(),
      paidBy,
      groupId: groupid,
      paidmemberAvatar: user.avatar,
      paidmemberUsername: user.username,
    });

    return NextResponse.json(
      {
        message: 'Expense added successfully',
        expense,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST /expense error:', error);

    return NextResponse.json(
      {
        error: 'Internal Server Error',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
