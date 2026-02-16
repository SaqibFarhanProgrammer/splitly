import { ConnectDB } from "@/lib/ConnectDB";
import { Group } from "@/models/group.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest) {  
  try {
    await ConnectDB();

    const groupId = req.nextUrl.searchParams.get("groupId");

    // 1️⃣ Validate presence
    if (!groupId) {
      return NextResponse.json(
        { error: "groupId is required" },
        { status: 400 }
      );
    }

    // 2️⃣ Validate Mongo ObjectId format
    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return NextResponse.json(
        { error: "Invalid groupId format" },
        { status: 400 }
      );
    }

    // 3️⃣ Check if group exists
    const existingGroup = await Group.findById(groupId);

    if (!existingGroup) {
      return NextResponse.json(
        { error: "Group not found" },
        { status: 404 }
      );
    }

    // 4️⃣ Delete group
    await Group.findByIdAndDelete(groupId);

    return NextResponse.json(
      { message: "Group deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.error("Delete group error:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
