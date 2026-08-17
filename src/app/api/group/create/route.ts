import { NextRequest, NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/ConnectDB';
import { Group } from '@/models/group.model';
import { User } from '@/models/user.model';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { createGroupSchema } from '@/lib/validations';
import { globalCache } from '@/lib/cache';

export async function POST(request: NextRequest) {
  try {
    const currentUser = await getAuthenticatedUser(request);
    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await ConnectDB();
    const body = await request.json();

    const result = createGroupSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, members } = result.data;

    // Initial members list starting with the creator
    const memberList: Array<{
      userId: any;
      isAdmin: boolean;
      username: string;
      avatar: string;
    }> = [
      {
        userId: currentUser._id,
        isAdmin: true,
        username: currentUser.username,
        avatar: currentUser.avatar || '',
      },
    ];

    // Add additional members by email or username if provided
    if (members && Array.isArray(members) && members.length > 0) {
      const additionalUsers = await User.find({
        $or: [
          { email: { $in: members.map((m) => m.toLowerCase()) } },
          { username: { $in: members } },
        ],
        _id: { $ne: currentUser._id },
      });

      for (const addU of additionalUsers) {
        memberList.push({
          userId: addU._id,
          isAdmin: false,
          username: addU.username,
          avatar: addU.avatar || '',
        });
      }
    }

    const newGroup = await Group.create({
      name: name.trim(),
      createdBy: currentUser._id,
      members: memberList,
    });

    // Invalidate user group cache
    globalCache.invalidatePrefix(`user-groups:${currentUser._id.toString()}`);

    return NextResponse.json(
      { message: 'Group created successfully', group: newGroup },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('POST /api/group/create error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
