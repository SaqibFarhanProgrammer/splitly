import { GroupProvider } from '@/context/GroupContext';
import { AuthProvider } from '@/context/AuthContext';
import { ProfileProvider } from '@/context/Profile.Context';
import { ExpensesProvider } from '@/context/Expenses.Context';
import { DashboardProvider } from '@/context/Dashboard.context';

import './globals.css';
import { GetAllGroups } from '@/lib/Getallgroups';
import { getUser } from '@/lib/getUser';
import { GetExpense } from '@/lib/Expense';
import { getUserIdFromToken } from '@/lib/GetToken';
import { GetDashboardAllStateData } from '@/lib/GetDashboardStaesData';
import { GetNetBalance } from '@/lib/States';
import { StateProvider } from '@/context/States.context';
import { NotificationProvider } from '@/context/notification.context';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Splitly',
  description: 'Track and split expenses',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userid = await getUserIdFromToken();
  const user = await getUser(userid);
  const groups = await GetAllGroups(userid);
  const expense = await GetExpense(userid);
  const expenseData = await GetDashboardAllStateData(userid);
  const states = await GetNetBalance();

  return (
    <html lang="en">
      <body className="antialiased bg-[#08080B]" cz-shortcut-listen="true">
        <AuthProvider user={user}>
          <GroupProvider groups={groups}>
            <ExpensesProvider expense={expense}>
              <DashboardProvider data={expenseData}>
                <NotificationProvider>
                  <StateProvider stateData={{ stateData: states }}>
                    <ProfileProvider>{children}</ProfileProvider>
                  </StateProvider>
                </NotificationProvider>
              </DashboardProvider>
            </ExpensesProvider>
          </GroupProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
