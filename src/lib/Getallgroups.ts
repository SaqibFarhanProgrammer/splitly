import axios from "axios";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Group } from "@/models/group.model";

export async function GetAllGroups() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) {
      console.error("Token not found in cookies");
      return [];
    }

    const payload: JwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as JwtPayload;

    if (!payload.userId) return null;

    const groups = await Group.find({
      $or: [{ createdBy: payload.userId }, { "members.userId": payload.userId }],
    });


    return JSON.parse(JSON.stringify(groups));
  } catch (error: any) {
    console.error(
      "Error fetching groups:",
      error.response?.data || error.message,
    );
    return [];
  }
}
