import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = await req.cookies.get("token")?.value;

  // 
  if (!token) return NextResponse.json({ message: "token is not found" });

  const deocoded = await jwt.verify(token, process.env.JWT_SECRET!);

  return NextResponse.json({ message: "token fetch succes", data: deocoded });
}
