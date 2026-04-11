import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { User } from '@/models/user.model';
import { getUserIdFromToken } from '@/lib/GetToken';

export async function POST(req: NextRequest) {
  try {
    const { username, email } = await req.json();

    if (
      !username ||
      typeof username !== 'string' ||
      username.trim().length === 0
    ) {
      return NextResponse.json(
        { error: 'Username is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const userid = await getUserIdFromToken();
    const result = await User.findByIdAndUpdate(
      { _id: userid },
      { $set: { username, email } }
    );

    return NextResponse.json(
      { message: 'Profile updated successfully', result },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}
