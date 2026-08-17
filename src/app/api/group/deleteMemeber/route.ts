import { NextRequest, NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/ConnectDB';
import { Group } from '@/models/group.model';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { globalCache } from '@/lib/cache';

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getAuthenticatedUser(request);
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await ConnectDB();
    const body = await request.json();
    const { groupId, memberId, userId } = body;

    const targetMemberId = memberId || userId;

    if (!groupId || !targetMemberId) {
      return NextResponse.json(
        { error: 'groupId and target memberId are required' },
        { status: 400 }
      );
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    // Verify currentUser is admin or the member removing themselves
    const currentMemberObj = group.members.find(
      (m) => m.userId.toString() === currentUser._id.toString()
    );

    if (!currentMemberObj) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const isSelfRemove =
      currentUser._id.toString() === targetMemberId.toString();
    if (!currentMemberObj.isAdmin && !isSelfRemove) {
      return NextResponse.json(
        { error: 'Forbidden: Only group admins can remove other members' },
        { status: 403 }
      );
    }

    group.members = group.members.filter(
      (m) => m.userId.toString() !== targetMemberId.toString()
    );

    await group.save();

    globalCache.invalidatePrefix(`user-groups:${targetMemberId.toString()}`);
    globalCache.invalidatePrefix(`user-groups:${currentUser._id.toString()}`);

    return NextResponse.json({
      message: 'Member removed successfully',
      group,
    });
  } catch (error: any) {
    console.error('POST /api/group/deleteMemeber error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
