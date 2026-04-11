import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { User } from '@/models/user.model';
import mongoose from 'mongoose';
export const dynamic = 'force-dynamic';
interface JwtPayload {
  userId: string;
}

export async function getUser(userid: string | Promise<string | null>) {
  try {
    const userId = await Promise.resolve(userid);

    const user = await User.findById(userId).select('-password').lean();

    if (!user) return null;

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return null;
  }
}
