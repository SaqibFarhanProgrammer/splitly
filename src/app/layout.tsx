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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#08080B]" cz-shortcut-listen="true">
        <>{children}</>
      </body>
    </html>
  );
}
