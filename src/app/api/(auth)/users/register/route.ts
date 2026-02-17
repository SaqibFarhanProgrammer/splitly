import { NextResponse } from "next/server";
import { ConnectDB } from "@/lib/ConnectDB";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await ConnectDB();

  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username: username,
      email,
      password: hashedPassword,
      Groups: [],
    });

    if (newUser) {
    }
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
