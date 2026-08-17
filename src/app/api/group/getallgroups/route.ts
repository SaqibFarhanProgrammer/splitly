import { NextRequest, NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/ConnectDB';
import { Group } from '@/models/group.model';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { globalCache } from '@/lib/cache';

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cacheKey = `user-groups:${user._id.toString()}`;
    const cachedData = globalCache.get(cacheKey);
    if (cachedData) {
      return NextResponse.json({ data: cachedData, cached: true });
    }

    await ConnectDB();

    const groups = await Group.find({
      'members.userId': user._id,
      isActive: true,
    })
      .sort({ updatedAt: -1 })
      .lean();

    globalCache.set(cacheKey, groups, 30000); // 30s TTL cache

    return NextResponse.json({ data: groups });
  } catch (error: any) {
    console.error('GET /api/group/getallgroups error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
