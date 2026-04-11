'use client';

import { GroupProvider } from '@/context/GroupContext';
import { AuthProvider } from '@/context/AuthContext';
import { ProfileProvider } from '@/context/Profile.Context';
import { ExpensesProvider } from '@/context/Expenses.Context';
import { DashboardProvider } from '@/context/Dashboard.context';
import { StateProvider } from '@/context/States.context';

type ProvidersProps = {
  children: React.ReactNode;
  userPromise: Promise<any>;
  groupsPromise: Promise<any>;
  expensePromise: Promise<any>;
  dashboardPromise: Promise<any>;
  statesPromise: Promise<any>;
};

export default function Providers({
  children,
  userPromise,
  groupsPromise,
  expensePromise,
  dashboardPromise,
  statesPromise,
}: ProvidersProps) {
  return (
    <AuthProvider userPromise={userPromise}>
      <GroupProvider groupsPromise={groupsPromise}>
        <ExpensesProvider expensePromise={expensePromise}>
          <DashboardProvider dataPromise={dashboardPromise}>
            <StateProvider statePromise={statesPromise}>
              <ProfileProvider>{children}</ProfileProvider>
            </StateProvider>
          </DashboardProvider>
        </ExpensesProvider>
      </GroupProvider>
    </AuthProvider>
  );
}
