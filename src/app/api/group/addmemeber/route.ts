import { NextRequest, NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/ConnectDB';
import { Group } from '@/models/group.model';
import { User } from '@/models/user.model';
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
    const { groupId, memberIdentifier, username, email } = body;

    const identifier = memberIdentifier || email || username;

    if (!groupId || !identifier) {
      return NextResponse.json(
        {
          error:
            'groupId and member identifier (email or username) are required',
        },
        { status: 400 }
      );
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    // Verify current user is a member of the group
    const isMember = group.members.some(
      (m) => m.userId.toString() === currentUser._id.toString()
    );

    if (!isMember) {
      return NextResponse.json(
        { error: 'Forbidden: Only group members can add new members' },
        { status: 403 }
      );
    }

    // Find the user to add
    const targetUser = await User.findOne({
      $or: [
        { email: identifier.toLowerCase().trim() },
        { username: identifier.trim() },
      ],
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: 'User not found with that email or username' },
        { status: 404 }
      );
    }

    // Check if already in group
    const alreadyInGroup = group.members.some(
      (m) => m.userId.toString() === targetUser._id.toString()
    );

    if (alreadyInGroup) {
      return NextResponse.json(
        { error: 'User is already a member of this group' },
        { status: 400 }
      );
    }

    group.members.push({
      userId: targetUser._id,
      isAdmin: false,
      username: targetUser.username,
      avatar: targetUser.avatar || '',
    });

    await group.save();

    // Invalidate caches
    globalCache.invalidatePrefix(`user-groups:${targetUser._id.toString()}`);
    globalCache.invalidatePrefix(`user-groups:${currentUser._id.toString()}`);

    return NextResponse.json({
      message: 'Member added successfully',
      group,
    });
  } catch (error: any) {
    console.error('POST /api/group/addmemeber error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
