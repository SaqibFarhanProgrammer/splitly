import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getUserIdFromToken() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    if (!token) {
      throw new Error('No token found');
    }

    const payload: JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    if (!payload.userId) return null;

    return payload.userId;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}
