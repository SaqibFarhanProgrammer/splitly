import { Settlement } from "@/models/satelment.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { groupId } = await request.json();
  console.log(groupId, "from settlment");

  const settlemnts = await Settlement.find({
    groupId: groupId,
  });

  console.log(settlemnts, "settlement");

  return NextResponse.json({
    message: "get all settlment success",
    settlemnts,
  });
}
