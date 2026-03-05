import { GroupProvider } from "@/context/GroupContext";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/Profile.Context";
import { GetAllGroups } from "@/lib/Getallgroups";
import { getUser } from "@/lib/getUser";
import fav from "@/assets/images/favicon.jpg";
import { GetExpense } from "@/lib/Expense";
import { ExpensesProvider } from "@/context/Expenses.Context";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Splitly",
  description: "Track and split expenses",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const groups = await GetAllGroups();
  const expense = await GetExpense();
  return (
    <html lang="en">
      <body className="antialiased bg-[#08080B]" cz-shortcut-listen="true">
        <AuthProvider user={user}>
          <GroupProvider groups={groups}>
            <ExpensesProvider expense={expense}>
              <ProfileProvider>{children}</ProfileProvider>
            </ExpensesProvider>
          </GroupProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
