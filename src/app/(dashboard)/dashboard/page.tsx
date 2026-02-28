// app/dashboard/page.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Wallet,
  Receipt,
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";
import React from "react";

// Import components
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { GroupCard, Group } from "@/components/dashboard/GroupCard";
import { ExpenseItem, Expense } from "@/components/dashboard/ExpenseItem";
import { BalanceItem, Balance } from "@/components/dashboard/BalanceItem";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { ActivityChart } from "@/components/dashboard/ActivityChart";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

// Dummy data
const groups: Group[] = [
  {
    id: 1,
    name: "Hunza Trip 2024",
    members: 4,
    totalExpenses: 45800,
    youOwe: 0,
    youAreOwed: 5200,
    status: "active",
    lastActivity: "2 days ago",
    avatar: "H",
  },
  {
    id: 2,
    name: "Office Lunch Group",
    members: 8,
    totalExpenses: 12500,
    youOwe: 1500,
    youAreOwed: 0,
    status: "active",
    lastActivity: "5 hours ago",
    avatar: "O",
  },
  {
    id: 3,
    name: "Flatmates - Karachi",
    members: 3,
    totalExpenses: 89000,
    youOwe: 4200,
    youAreOwed: 8000,
    status: "active",
    lastActivity: "1 week ago",
    avatar: "F",
  },
  {
    id: 4,
    name: "College Reunion",
    members: 12,
    totalExpenses: 0,
    youOwe: 0,
    youAreOwed: 0,
    status: "settled",
    lastActivity: "2 months ago",
    avatar: "C",
  },
];

const recentExpenses: Expense[] = [
  {
    id: 1,
    title: "Hotel Booking - Serena Inn",
    amount: 24000,
    paidBy: "You",
    group: "Hunza Trip 2024",
    date: "Dec 15, 2024",
    yourShare: 6000,
  },
  {
    id: 2,
    title: "Petrol - Day 1",
    amount: 8500,
    paidBy: "Ahmed",
    group: "Hunza Trip 2024",
    date: "Dec 14, 2024",
    yourShare: 2125,
  },
  {
    id: 3,
    title: "Dinner at Monal",
    amount: 6200,
    paidBy: "Saqib",
    group: "Hunza Trip 2024",
    date: "Dec 14, 2024",
    yourShare: 1550,
  },
];

const balances: Balance[] = [
  { name: "Ahmed", amount: 3200, type: "owed" },
  { name: "Saqib", amount: 2000, type: "owed" },
  { name: "Ali", amount: 1500, type: "owe" },
  { name: "Usman", amount: 800, type: "owed" },
  { name: "Bilal", amount: 1200, type: "owe" },
];

export default function DashboardPage() {
  return (
    <section className="min-h-screen h-screen mt-12  py-7 px-6  text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Balance"
            amount="₹12,400"
            trend="+12%"
            trendUp={true}
            icon={Wallet}
            iconBgColor="bg-white/5"
            iconColor="text-white"
          />
          <StatCard
            title="You Are Owed"
            amount="₹8,500"
            subtitle="From 3 people"
            icon={ArrowDownRight}
            iconBgColor="bg-emerald-500/10"
            iconColor="text-emerald-400"
            amountColor="text-emerald-400"
          />
          <StatCard
            title="You Owe"
            amount="₹5,700"
            subtitle="To 2 people"
            icon={ArrowUpRight}
            iconBgColor="bg-red-500/10"
            iconColor="text-red-400"
            amountColor="text-red-400"
          />
          <StatCard
            title="Monthly Spending"
            amount="₹24,500"
            trend="+8%"
            trendUp={false}
            icon={TrendingUp}
            iconBgColor="bg-blue-500/10"
            iconColor="text-blue-400"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tabs */}
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
                    <GroupCard key={group.id} group={group} />
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
                    {recentExpenses.map((expense) => (
                      <ExpenseItem key={expense.id} expense={expense} />
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

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
                        .filter((b) => b.type === "owed")
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
                        .filter((b) => b.type === "owe")
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
            <QuickActions />
            <ActivityChart />

            {/* Mini Stats */}
            <Card className="bg-zinc-950 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Total Expenses</span>
                  <span className="text-white font-semibold">₹45,200</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Groups Active</span>
                  <span className="text-white font-semibold">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Transactions</span>
                  <span className="text-white font-semibold">28</span>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Net Balance</span>
                    <span className="text-emerald-400 font-bold">+₹2,800</span>
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
