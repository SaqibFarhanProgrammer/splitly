import { ConnectDB } from '@/lib/ConnectDB';
import { Group } from '@/models/group.model';
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Expense } from '@/models/expense.model';
import { Settlement } from '@/models/satelment.model';

export async function POST(req: NextRequest) {
  try {
    await ConnectDB();
    const { groupid } = await req.json();

    if (!groupid) {
      return NextResponse.json(
        { error: 'groupid is required' },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(groupid)) {
      return NextResponse.json(
        { error: 'Invalid groupid format' },
        { status: 400 }
      );
    }

    const existingGroup = await Group.findById(groupid);

    if (!existingGroup) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    console.log(typeof groupid);

    const res = await Expense.deleteMany({ groupId: groupid });
    const ress = await Settlement.deleteMany({ groupId: groupid });
    await Group.findByIdAndDelete(groupid);

    return NextResponse.json(
      { message: 'Group deleted successfully', res, ress },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete group error:', error);

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
