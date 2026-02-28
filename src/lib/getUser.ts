import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ConnectDB } from "@/lib/ConnectDB";
import { User } from "@/models/user.model";
import mongoose from "mongoose";
export const dynamic = "force-dynamic";
interface JwtPayload {
  userId: string;
}

export async function getUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) return null;

    const payload: JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as JwtPayload;

    if (!payload.userId) return null;

    await ConnectDB();

    const user = await User.findById(payload.userId).select("-password").lean();

    if (!user) return null;

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    return null;
  }
}
