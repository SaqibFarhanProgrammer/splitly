import { Group } from "@/models/group.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { groupid } = await request.json();
    const group = await Group.findById(groupid);

    return NextResponse.json({
      message: "group fetched succss",
      status: 200,
      data: group,
    });
  } catch (error) {
    console.log(error);
  }
}
