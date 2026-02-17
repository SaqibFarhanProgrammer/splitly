import { Group } from "@/models/group.model";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
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
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
  console.log(decoded);

  if (!decoded) {
    return NextResponse.json({ message: "token not found" });
  }
  const { userId } = decoded;
  console.log(userId);

  const groups = await Group.find({
    createdBy: userId,
  });

  return NextResponse.json({
    message: "fetched groups data succefyyly ",
    data: groups,
  });
}
