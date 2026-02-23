import { Group } from "@/models/group.model";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, groupId } = body;

    if (!username || !groupId) {
      return NextResponse.json(
        { message: "Username and groupId are required" },
        { status: 400 },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(groupId)) {
      return NextResponse.json(
        { message: "Invalid groupId format" },
        { status: 400 },
      );
    }

    const group = await Group.findById(groupId);
    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const alreadyMember = group.members.some(
      (member: any) => member.username === username,
    );

    if (alreadyMember) {
      return NextResponse.json(
        { message: "User already in group" },
        { status: 409 },
      );
    }

    group.members.push({
      username,
      isAdmin: false,
      userId: user._id,
    });

    await group.save();

    return NextResponse.json(
      {
        message: "Member added successfully",
        data: user,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
