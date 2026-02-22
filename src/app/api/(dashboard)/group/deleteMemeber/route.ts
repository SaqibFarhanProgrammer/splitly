import { ConnectDB } from "@/lib/ConnectDB";
import { Group } from "@/models/group.model";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await ConnectDB();
  const body = await request.json();

  const { memeberid } = body;
  console.log(memeberid);

  const member = await User.findById(memeberid);

  if (!member) {
    return NextResponse.json({
      message: "faild to find mmeber",
    });
  }

  const group = await Group.findOne({
    "members.id": member._id,
  });
  console.log(group);

  return NextResponse.json({
    message: "delte memeer success",
    status: 200,
  });
}
