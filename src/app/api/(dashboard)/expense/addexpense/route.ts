import { ExpenseFormValues } from "@/app/(dashboard)/group/[groupID]/page";
import { Expense } from "@/models/expense.model";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { amount, description, paidBy, groupid }: ExpenseFormValues =
    await request.json();

  // Validation
  if (!amount || (amount as number) <= 0) {
    return NextResponse.json(
      { error: "Amount must be greater than 0" },
      { status: 400 },
    );
  }

  if (!description || description.trim() === "") {
    return NextResponse.json(
      { error: "Description is required" },
      { status: 400 },
    );
  }

  const user = await User.findById(paidBy).select(
    "-password -email -groups  -createdAt -updatedAt",
  );
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const expense = await Expense.create({
    totalAmount: amount as number,
    title: description,
    paidBy: paidBy,
    groupId: groupid,
    paidmemberAvatar: user.avatar,
    paidmemberUsername: user.username,
  });

  return NextResponse.json({ message: "Expense added successfully!", expense });
}
