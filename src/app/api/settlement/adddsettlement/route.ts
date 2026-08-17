import { NextRequest, NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/ConnectDB';
import { Settlement } from '@/models/settlement.model';
import { Group } from '@/models/group.model';
import { User } from '@/models/user.model';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { addSettlementSchema } from '@/lib/validations';
import { roundCurrency } from '@/lib/financial-engine';

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getAuthenticatedUser(request);
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await ConnectDB();
    const body = await request.json();

    const payload = {
      groupId: body.groupId || body.groupid,
      paidTo: body.paidTo || body.paidto,
      amount: Number(body.amount),
      note: body.note || 'Settlement payment',
    };

    const result = addSettlementSchema.safeParse(payload);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const { groupId, paidTo, amount, note } = result.data;

    // Verify group membership
    const group = await Group.findById(groupId);
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    const isMember = group.members.some(
      (m) => m.userId.toString() === currentUser._id.toString()
    );

    if (!isMember) {
      return NextResponse.json(
        { error: 'Forbidden: You are not a member of this group' },
        { status: 403 }
      );
    }

    // Verify recipient exists and is group member
    const recipient = await User.findById(paidTo);
    if (!recipient) {
      return NextResponse.json(
        { error: 'Recipient user not found' },
        { status: 404 }
      );
    }

    const newSettlement = await Settlement.create({
      groupId,
      paidBy: currentUser._id,
      paidTo,
      amount: roundCurrency(amount),
      paidByUserName: currentUser.username,
      paidByUserAvatar: currentUser.avatar || '',
      paidToUserName: recipient.username,
      note: (note || 'Settlement payment').trim(),
      date: new Date(),
    });

    return NextResponse.json(
      {
        message: 'Settlement recorded successfully',
        settlement: newSettlement,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST /api/settlement/adddsettlement error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
