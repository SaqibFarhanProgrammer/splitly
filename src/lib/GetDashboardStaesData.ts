import { Expense } from "@/models/expense.model";

export async function GetDashboardAllStateData(userid: string) {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const expensesLast30Days = await Expense.find({
    paidBy: userid,
    createdAt: { $gte: thirtyDaysAgo },
  }).select("totalAmount -_id");

  

}
