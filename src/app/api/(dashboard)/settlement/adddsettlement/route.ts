import { Settlement } from "@/models/satelment.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const {
      paidBy,
      paidTo,
      amount,
      note,
      groupid,
      paidByUserAvatar,
      paidByUserName,
      paidToUserAvatar,
      paidToUserName,
    } = data;

    if (!paidBy || !paidTo || !amount || !groupid) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (amount <= 0) {
      return NextResponse.json(
        { message: "Amount must be greater than 0" },
        { status: 400 }
      );
    }

    await Settlement.create({
      groupId: groupid,
      paidBy,
      paidTo,
      amount,
      note: note || "",
      paidByUserAvatar: paidByUserAvatar || "",
      paidByUserName: paidByUserName || "",
      paidToUserAvatar: paidToUserAvatar || "",
      paidToUserName: paidToUserName || "",
    });

    return NextResponse.json({
      message: "Settlement added successfully",
      status: 200,
    });
  } catch (error) {
    console.error("Error adding settlement:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}