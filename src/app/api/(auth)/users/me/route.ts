import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "@/models/user.model";

export async function GET(req: NextRequest) {
  const token = await req.cookies.get("token")?.value;

  //
  if (!token) return NextResponse.json({ message: "token is not found" });

  const deocoded: string | JwtPayload = await jwt.verify(
    token,
    process.env.JWT_SECRET!,
  );

  function isjwtpayload(obj: any): obj is JwtPayload {
    return obj && typeof obj === "object" && "userId" in obj;
  }

  if (!isjwtpayload(deocoded))
    return NextResponse.json("payload is not a bject");

  const id = deocoded.userId;

  const user = await User.findById(id);

  return NextResponse.json({ message: "token fetch succes", data: user });
}
