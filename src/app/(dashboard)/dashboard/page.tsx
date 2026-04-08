// app/dashboard/page.tsx
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Wallet,
  Receipt,
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight,
  InfoIcon,
} from 'lucide-react';
import React, { useState } from 'react';

// Import components
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatCard } from '@/components/dashboard/StatCard';
import { GroupCard, Group } from '@/components/dashboard/GroupCard';
import { ExpenseItem, Expense } from '@/components/dashboard/ExpenseItem';
import { BalanceItem, Balance } from '@/components/dashboard/BalanceItem';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { ActivityChart } from '@/components/dashboard/ActivityChart';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useGroupContext } from '@/context/GroupContext';
import { useDashboardContext } from '@/context/Dashboard.context';
import { useExpenses } from '@/context/Expenses.Context';
import { SelectGroup } from '@/components/ui/select';
import SelectGroups from '@/components/dashboard/group/SelectGroup';
import GroupSelect from '@/components/dashboard/group/SelectGroup';
import { redirect } from 'next/navigation';
import DashboardChart from '@/components/DashboardChart';
import { useStateContext } from '@/context/States.context';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function DashboardPage() {
  const { groups } = useGroupContext();
  const [showSelectGroup, setshowSelectGroup] = useState(false);
  const { expenses } = useExpenses();
  const { stateData } = useStateContext();
  const dashboardstate = useDashboardContext();

  function handleQuickAction(id?: string, groupid?: string) {
    if (id === 'add-expense') {
      setshowSelectGroup(true);
    }

    if (id === 'create-group') {
      console.log('open create group modal');
      redirect('/profile');
    }
  }

  return (
    <section className="min-h-screen h-screen mt-12  py-7 px-6  text-white font-['inter-reguler'] ">
      <div className="max-w-7xl mx-auto">
        <DashboardChart />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="groups" className="w-full">
              <TabsList className="bg-zinc-950 border border-white/10 p-1 mb-2">
                <TabsTrigger
                  value="groups"
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400"
                >
                  <Users className="w-4 h-4 mr-2" />
                  My Groups
                </TabsTrigger>
                <TabsTrigger
                  value="expenses"
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400"
                >
                  <Receipt className="w-4 h-4 mr-2" />
                  Recent Expenses
                </TabsTrigger>
              </TabsList>

              <TabsContent value="groups" className="space-y-4">
                {groups.length === 0 ? (
                  <p className=' text-center pt-20 text-zinc-200'>No Group yet</p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {groups.map((group) => (
                      <GroupCard key={group._id} group={group} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="expenses" className="space-y-4">
                <Card className="bg-zinc-950 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Recent Expenses
                    </CardTitle>
                    s
                    <CardDescription className="text-zinc-400">
                      Latest transactions across your groups
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {expenses.map((expense, index) => (
                      <ExpenseItem key={index} expense={expense} />
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              {showSelectGroup && <SelectGroup />}
              {showSelectGroup && (
                <GroupSelect
                  onClick={handleQuickAction}
                  onClose={() => setshowSelectGroup(false)}
                />
              )}
            </Tabs>
          </div>

          <div className="space-y-6">
            <QuickActions onActionClick={handleQuickAction} />

            <ActivityChart />

            <Card className="bg-zinc-950 border-white/10 mb-5">
              <CardHeader>
                <CardTitle className="text-white text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Total Expenses</span>
                  <span className="text-white font-semibold">
                    Rs{dashboardstate.data.monthlyspending}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Groups Active</span>

                  <span className="text-white font-semibold">
                    {groups.length}
                  </span>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Net Balance</span>
                    {stateData > 0 ? (
                      <span className="text-emerald-400 font-bold">
                        +Rs{stateData}
                      </span>
                    ) : stateData < 0 ? (
                      <span className="text-red-400 font-bold">
                        -Rs{Math.abs(stateData)}
                      </span>
                    ) : (
                      <span className="text-gray-400 font-bold">Rs0</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
