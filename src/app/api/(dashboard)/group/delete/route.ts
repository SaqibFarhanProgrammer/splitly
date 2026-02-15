import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { groupiD: string } },
) {
  console.log("Params object:", params);
  console.log("Group ID from params:", params.groupiD);

  return NextResponse.json({ message: "hello", idFromParams: params.groupiD });
}
