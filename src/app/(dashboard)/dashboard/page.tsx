// app/dashboard/page.tsx
'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Users,
  Wallet,
  Receipt,
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight,
} from 'lucide-react'
import React, { useState } from 'react'

// Import components
import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { GroupCard, Group } from '@/components/dashboard/GroupCard'
import { ExpenseItem, Expense } from '@/components/dashboard/ExpenseItem'
import { BalanceItem, Balance } from '@/components/dashboard/BalanceItem'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { ActivityChart } from '@/components/dashboard/ActivityChart'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { useGroupContext } from '@/context/GroupContext'
import { useDashboardContext } from '@/context/Dashboard.context'
import { useExpenses } from '@/context/Expenses.Context'
import { SelectGroup } from '@/components/ui/select'
import SelectGroups from '@/components/dashboard/group/SelectGroup'
import GroupSelect from '@/components/dashboard/group/SelectGroup'
import { redirect } from 'next/navigation'
import DashboardChart from '@/components/DashboardChart'

const balances: Balance[] = [
  { name: 'Ahmed', amount: 3200, type: 'owed' },
  { name: 'Saqib', amount: 2000, type: 'owed' },
  { name: 'Ali', amount: 1500, type: 'owe' },
  { name: 'Usman', amount: 800, type: 'owed' },
  { name: 'Bilal', amount: 1200, type: 'owe' },
]

export default function DashboardPage() {
  const { groups } = useGroupContext()
  const [showSelectGroup, setshowSelectGroup] = useState(false)
  const { expenses } = useExpenses()

  const dashboardstate = useDashboardContext()

  function handleQuickAction(id?: string, groupid?: string) {
    if (id === 'add-expense') {
      setshowSelectGroup(true)
      console.log(id)
      console.log(groupid)
    }

    if (id === 'create-group') {
      console.log('open create group modal')
      redirect('/profile')
    }

    if (id === 'settle-up') {
      console.log('open settle up modal')
    }
  }

  return (
    <section className="min-h-screen h-screen mt-12  py-7 px-6  text-white font-['inter-reguler']">
      <div className="max-w-7xl mx-auto">
       
<DashboardChart/>


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
                <TabsTrigger
                  value="balances"
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Balances
                </TabsTrigger>
              </TabsList>

              {/* Groups Tab */}
              <TabsContent value="groups" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {groups.map((group) => (
                    <GroupCard key={group._id} group={group} />
                  ))}
                </div>
              </TabsContent>

              {/* Expenses Tab */}
              <TabsContent value="expenses" className="space-y-4">
                <Card className="bg-zinc-950 border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Recent Expenses
                    </CardTitle>
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

              {/* Balances Tab */}
              <TabsContent value="balances" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="bg-zinc-950 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <ArrowDownRight className="w-5 h-5 text-emerald-400" />
                        You Are Owed
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {balances
                        .filter((b) => b.type === 'owed')
                        .map((balance, i) => (
                          <BalanceItem key={i} balance={balance} />
                        ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-zinc-950 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <ArrowUpRight className="w-5 h-5 text-red-400" />
                        You Owe
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {balances
                        .filter((b) => b.type === 'owe')
                        .map((balance, i) => (
                          <BalanceItem key={i} balance={balance} />
                        ))}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <QuickActions onActionClick={handleQuickAction} />

            <ActivityChart />

            {/* Mini Stats */}
            <Card className="bg-zinc-950 border-white/10">
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
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Transactions</span>
                  <span className="text-white font-semibold">{0}</span>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Net Balance</span>
                    <span className="text-emerald-400 font-bold">+Rs2,800</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
