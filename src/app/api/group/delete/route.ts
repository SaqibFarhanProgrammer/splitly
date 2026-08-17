import { NextRequest, NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/ConnectDB';
import { Group } from '@/models/group.model';
import { Expense } from '@/models/expense.model';
import { Settlement } from '@/models/settlement.model';
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
    const groupId = body.groupId || body.groupid || body.id;

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

    // Verify currentUser is admin or creator
    const currentMember = group.members.find(
      (m) => m.userId.toString() === currentUser._id.toString()
    );

    const isCreator = group.createdBy.toString() === currentUser._id.toString();
    const isAdmin = currentMember?.isAdmin || isCreator;

    if (!isAdmin) {
      return NextResponse.json(
        {
          error:
            'Forbidden: Only group admins or creator can delete this group',
        },
        { status: 403 }
      );
    }

    // Delete or deactivate group and associated expenses/settlements
    await Promise.all([
      Group.findByIdAndDelete(groupId),
      Expense.deleteMany({ groupId }),
      Settlement.deleteMany({ groupId }),
    ]);

    for (const m of group.members) {
      globalCache.invalidatePrefix(`user-groups:${m.userId.toString()}`);
    }

    return NextResponse.json({ message: 'Group deleted successfully' });
  } catch (error: any) {
    console.error('POST /api/group/delete error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
