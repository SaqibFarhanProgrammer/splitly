import { ConnectDB } from "@/lib/ConnectDB";
import { Group } from "@/models/group.model";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    await ConnectDB();

    const body = await request.json();
    const { memberId, groupId } = body;
    console.log(groupId);
    

    if (!memberId || !groupId) {
      return NextResponse.json(
        { message: "memberId and groupId are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const member = await User.findById(memberId);
    if (!member) {
      return NextResponse.json(
        { message: "Failed to find member" },
        { status: 404 }
      );
    }

    // Remove member from group
    const updatedGroup = await Group.findByIdAndUpdate(
      groupId,
      {
        $pull: {
          members: { userId: new mongoose.Types.ObjectId(memberId) },
        },
      },
      { new: true }
    );

    if (!updatedGroup) {
      return NextResponse.json(
        { message: "Group not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Member deleted successfully",
        group: updatedGroup,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}