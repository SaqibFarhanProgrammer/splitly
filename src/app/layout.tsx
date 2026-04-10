import './globals.css';
import { GetAllGroups } from '@/lib/Getallgroups';
import { getUser } from '@/lib/getUser';
import { GetExpense } from '@/lib/Expense';
import { getUserIdFromToken } from '@/lib/GetToken';
import { GetDashboardAllStateData } from '@/lib/GetDashboardStaesData';
import { GetNetBalance } from '@/lib/States';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Splitly',
  description: 'Track and split expenses',
};

import Providers from './Providers';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPromise = getUser();
  const groupsPromise = GetAllGroups();
  const expensePromise = GetExpense();
  // We need dashboard and states as well
  let dashboardPromise = GetDashboardAllStateData();
  let statesPromise = GetNetBalance();

  return (
    <html lang="en">
      <body className="antialiased bg-[#08080B]">
        <Providers
          userPromise={userPromise}
          groupsPromise={groupsPromise}
          expensePromise={expensePromise}
          dashboardPromise={dashboardPromise}
          statesPromise={statesPromise}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}
