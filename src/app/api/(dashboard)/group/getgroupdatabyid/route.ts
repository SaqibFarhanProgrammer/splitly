import { Group } from "@/models/group.model";
import { ConnectDB } from "@/lib/ConnectDB";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  await ConnectDB();

  try {
    const body = await request.json();
    const { groupid } = body;

    if (!groupid) {
      return NextResponse.json(
        { message: "Group ID is required" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(groupid)) {
      return NextResponse.json(
        { message: "Invalid Group ID format" },
        { status: 400 }
      );
    }

    const group = await Group.findById(groupid);

    if (!group) {
      return NextResponse.json(
        { message: "Group not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Group fetched successfully",
        data: group,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch group error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
