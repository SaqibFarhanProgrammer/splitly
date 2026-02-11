import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/ConnectDB";

export async function GET() {
  try {
    ConnectDB();
    console.log("connect DB");
  } catch (error) {
    console.log(error);
  }

  return NextResponse.json("hello");
}
