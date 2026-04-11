import { NextRequest, NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/ConnectDB';
import { Group } from '@/models/group.model';
import { getUserIdFromToken } from '@/lib/GetTokenFromRequest';

export async function GET(req: NextRequest) {
  try {
    await ConnectDB();

    const id = getUserIdFromToken(req);
    console.log("chala");
    
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'UserId is required' },
        { status: 400 }
      );
    }

    const groups = await Group.find({
      $or: [{ createdBy: id }, { 'members.userId': id }],
    });

    return NextResponse.json({ success: true, data: groups }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching groups:', error.message);

    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
