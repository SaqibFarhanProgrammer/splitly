import { Settlement } from "@/models/satelment.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { groupId } = await request.json();

    if (!groupId) {
      return NextResponse.json(
        { error: "groupId is required" },
        { status: 400 },
      );
    }

    const settlements = await Settlement.find({ groupId: groupId });
    console.log(settlements);

    return NextResponse.json(settlements, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch settlements" },
      { status: 500 },
    );
  }
}
