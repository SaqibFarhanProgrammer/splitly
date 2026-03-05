import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { ConnectDB } from "./ConnectDB";
import { Expense } from "@/models/expense.model";

export async function GetExpense() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const payload: JwtPayload = jwt.verify(
    token,
    process.env.JWT_SECRET!,
  ) as JwtPayload;

  if (!payload.userId) return null;

  await ConnectDB();

  const expenses = await Expense.find({ paidBy: payload.userId }).lean();

  return JSON.parse(JSON.stringify(expenses));
}
