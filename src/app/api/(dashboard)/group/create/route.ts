import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/lib/ConnectDB";
import { Group } from "@/models/group.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(request: NextRequest) {
  
  try {
    interface Token {
      userId: string;
    }
    await ConnectDB();
    
    const body = await request.json();
    const { name, totalAmount } = body;
    const cookieStore = await cookies(); // ✅ important
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authentication token required" },
        { status: 401 },
      );
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET!);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const id:string = decode.userId;

    if (name === undefined || totalAmount === undefined) {
      return NextResponse.json(
        { success: false, message: "Name and totalAmount are required" },
        { status: 400 },
      );
    }

    if (typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Name must be a valid non-empty string" },
        { status: 400 },
      );
    }

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
      name: name.trim().toString(),
      totalAmount: parsedAmount,
      createdBy: id,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Group created successfully",
        data: newGroup,
      },
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
