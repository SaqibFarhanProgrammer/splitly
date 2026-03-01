import { Group } from "@/models/group.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { groupid, userid } = await request.json();

  const group = await Group.updateOne(
    {
      _id: groupid,
    },
    {
      $pull: { members: { userId: userid } },
    },
  );
  if (!group) {
    return new Response(JSON.stringify({ message: "Group not found" }), {
      status: 404,
    });
  }

  return NextResponse.json(
    { message: "Left group successfully" },
    { status: 200 },
  );
}
