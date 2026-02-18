import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/ConnectDB";
import { Group } from "@/models/group.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { User } from "@/models/user.model";

interface TokenPayload extends JwtPayload {
  userId: string;
}

interface MemeberInterface {
  Memebers: [];
}

export async function POST(request: NextRequest) {
  try {
    await ConnectDB();

    const body = await request.json();
    const { name, totalAmount } = body;

    if (!name || !totalAmount) {
      return NextResponse.json(
        { success: false, message: "Name and totalAmount are required" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication token required" },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as
      | string
      | TokenPayload;

    // Type guard
    function isTokenPayload(obj: any): obj is TokenPayload {
      return obj && typeof obj === "object" && "userId" in obj;
    }

    if (!isTokenPayload(decoded)) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 },
      );
    }

    const userId = decoded.userId;

    const user = await User.findById(userId);

    if (!user) return NextResponse.json({ messsage: "user nto found" });

    const parsedAmount = Number(totalAmount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { success: false, message: "Total amount must be a positive number" },
        { status: 400 },
      );
    }

    const existingGroup = await Group.findOne({ name: name.trim() });
    if (existingGroup) {
      return NextResponse.json(
        { success: false, message: "Group already exists" },
        { status: 409 },
      );
    }

    const newGroup = await Group.create({
      name: name.trim(),
      totalAmount: parsedAmount,
      isActive: true,
      createdBy: userId,
      members: [{ username: user.username, isadmin: true }],
    });

    return NextResponse.json(
      { success: true, message: "Group created successfully", data: newGroup },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create Group Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
