import { Group } from "@/models/group.model";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { username, groupiD } = await request.json();
  console.log(username, groupiD);

  const member = await User.findOne({ username: username });

  member?.Groups.push(groupiD);
  member?.save({
    validateBeforeSave: false,
  });

  const group = await Group.findById(groupiD);
  group?.members.push({
    username: username,
    isadmin: false,
  });

  group?.save({ validateBeforeSave: false });

  return NextResponse.json({
    message: "memeber add successfully",
    status: 200,
    data: group,
  });
}
