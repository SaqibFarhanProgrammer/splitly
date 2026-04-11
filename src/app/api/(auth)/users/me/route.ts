import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '@/models/user.model';
import { ConnectDB } from '@/lib/ConnectDB';

interface TokenPayload extends JwtPayload {
  userId: string;
}

function isJwtPayload(obj: unknown): obj is TokenPayload {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'userId' in obj
  );
}

export async function GET(req: NextRequest) {
  try {
    await ConnectDB()
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Token not found' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    if (!isJwtPayload(decoded)) {
      return NextResponse.json(
        { message: 'Invalid token payload' },
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Token verified successfully',
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error: 'Invalid or expired token' },
      { status: 500 }
    );
  }
}