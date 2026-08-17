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
    const groupId = body.groupId || body.groupid;

    if (!groupId) {
      return NextResponse.json(
        { error: 'groupId is required' },
        { status: 400 }
      );
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    group.members = group.members.filter(
      (m) => m.userId.toString() !== currentUser._id.toString()
    );

    await group.save();

    globalCache.invalidatePrefix(`user-groups:${currentUser._id.toString()}`);

    return NextResponse.json({ message: 'Left group successfully' });
  } catch (error: any) {
    console.error('POST /api/group/leavegroup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
