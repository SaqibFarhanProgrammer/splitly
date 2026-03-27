import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function getallexpensesofallgroups() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    if (!token) {
      console.error('Token not found in cookies');
      return null;
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
