import { User } from "@/models/user.model";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { username, groupiD } = request.json();

  const member = User.findOne({ username: username });

  

}
