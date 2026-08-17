import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { ConnectDB } from '@/lib/ConnectDB';
import { User, IUserDocument } from '@/models/user.model';

export interface DecodedToken {
  userId: string;
  email?: string;
}

export function getUserIdFromRequest(request: NextRequest): string | null {
  try {
    const token =
      request.cookies.get('splitly-token')?.value ||
      request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) return null;

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('JWT_SECRET is missing in environment variables');
      return null;
    }

    const decoded = jwt.verify(token, secret) as DecodedToken;
    return decoded.userId || null;
  } catch (error) {
    return null;
  }
}

export async function getAuthenticatedUser(
  request: NextRequest
): Promise<IUserDocument | null> {
  const userId = getUserIdFromRequest(request);
  if (!userId) return null;

  await ConnectDB();
  const user = await User.findById(userId).select('-password');
  return user || null;
}
