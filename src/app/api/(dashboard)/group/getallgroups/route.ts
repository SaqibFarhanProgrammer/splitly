import { Group } from "@/models/group.model";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ConnectDB } from "@/lib/ConnectDB";
import { User } from "@/models/user.model";
import mongoose from "mongoose";
export async function GET(req: NextRequest) {
  await ConnectDB();
  console.log("connect to db");

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "token not found" });
  }
  const decoded: string | JwtPayload = jwt.verify(
    token,
    process.env.JWT_SECRET!,
  );

  function isJwtpayload(obj: any): obj is JwtPayload {
    return obj && typeof obj === "object" && "userId" in obj;
  }

  if (!isJwtpayload(decoded)) {
    return NextResponse.json({ message: "token not found" });
  }
  const { userId } = decoded;

  const groups = await Group.find({
    createdBy: userId,
  });

  return NextResponse.json({
    message: "fetched groups data succefyyly ",
    data: groups,
  });
}
