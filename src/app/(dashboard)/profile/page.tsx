"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CreateGroupModal } from "@/components/CreateGroup";
import { AddExpenseModal } from "@/components/AddExpenseModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Wallet,
  Receipt,
  Settings,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import axios from "axios";
import ProfileHeader from "@/components/dashboard/profile/ProfileHeader";
import { AuthProvider } from "@/context/AuthContext";

const recentExpenses = [
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

const balances = [
  { name: "Ahmed", amount: 3200, type: "owed" },
  { name: "Saqib", amount: 2000, type: "owed" },
  { name: "Ali", amount: 1500, type: "owe" },
];

interface GroupData {
  _id: string;
  name: string;
  totalAmount: number;
  isActive: boolean;
  members: [];
}

export default function Page() {
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [groupData, setgroupData] = useState<GroupData[]>([]);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const handleAddExpense = async (data: {
    description: string;
    amount: string;
    date: string;
    notes?: string;
  }) => {
    console.log("Adding expense:", data);
  };

  useEffect(() => {
    axios.get("/api/group/getallgroups").then((res) => {
      if (res.data) {
        setgroupData(res.data.data);
      }
      console.log(groupData);
    });
  }, []);

  return (
    <section className="min-h-screen py-14 px-6 ]  text-white">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <AuthProvider>

        <ProfileHeader setIsCreateGroupOpen={setIsCreateGroupOpen} />
        </AuthProvider>

        {/* Stats Overview */}

        {/* Main Content Tabs */}
        <Tabs defaultValue="groups" className="w-full">
          <TabsList className="bg-zinc-950 border border-white/10 p-1 mb-8">
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Your Groups</h2>
              <Button
                onClick={() => setIsCreateGroupOpen(true)}
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </div>
            {}
            <div className="grid md:grid-cols-2 gap-4">
              {groupData.map((group) => (
                <Card
                  key={group._id} // _id use karo name ki jagah for key
                  className="bg-zinc-950 border-white/10 hover:border-white/20 transition-all hover:shadow-lg hover:shadow-white/5"
                >
                  <Link href={`/group/${group._id}`} className="block">
                    <CardContent className="p-5">
                      {/* Header Row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-zinc-800 text-white text-sm font-bold">
                              {group.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-base font-semibold text-white leading-tight">
                              {group.name}
                            </h3>
                            <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                              <Users className="w-3 h-3" />
                              <span>{group.members.length} members</span>
                            </div>
                          </div>
                        </div>

                        <Badge
                          variant={group.isActive ? "default" : "secondary"}
                          className={
                            group.isActive
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-xs"
                              : "bg-zinc-800 text-zinc-400 border-zinc-700 text-xs"
                          }
                        >
                          {group.isActive ? "Active" : "Settled"}
                        </Badge>
                      </div>

                      {/* Stats Row */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div>
                          <p className="text-zinc-500 text-xs mb-0.5">
                            Total Expenses
                          </p>
                          <p className="text-lg font-bold text-white">
                            ₹{group.totalAmount.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 text-zinc-500 text-xs">
                          <Clock className="w-3 h-3" />
                          <span>Active</span>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Expenses Tab */}
          <TabsContent value="expenses" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Recent Expenses</h2>
              <Button
                onClick={() => setIsAddExpenseOpen(true)}
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </div>
            <Card className="bg-zinc-950 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Recent Expenses</CardTitle>
                <CardDescription className="text-zinc-400">
                  Latest transactions across your groups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentExpenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <Receipt className="w-5 h-5 text-zinc-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium">
                          {expense.title}
                        </h4>
                        <p className="text-zinc-400 text-sm">
                          {expense.group} • {expense.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">
                        ₹{expense.amount.toLocaleString()}
                      </p>
                      <p className="text-zinc-400 text-sm">
                        Your share: ₹{expense.yourShare}
                      </p>
                    </div>
                  </div>
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
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-zinc-800 text-white">
                              {balance.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-white font-medium">
                            {balance.name}
                          </span>
                        </div>
                        <span className="text-emerald-400 font-semibold">
                          ₹{balance.amount}
                        </span>
                      </div>
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
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 bg-red-500/5 rounded-lg border border-red-500/10"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-zinc-800 text-white">
                              {balance.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-white font-medium">
                            {balance.name}
                          </span>
                        </div>
                        <span className="text-red-400 font-semibold">
                          ₹{balance.amount}
                        </span>
                      </div>
                    ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <CreateGroupModal
          isOpen={isCreateGroupOpen}
          onClose={() => setIsCreateGroupOpen(false)}
          onGroupCreated={(newGroup) =>
            setgroupData((prev) => [...prev, newGroup])
          }
        />

        <AddExpenseModal
          isOpen={isAddExpenseOpen}
          onClose={() => setIsAddExpenseOpen(false)}
          onSubmit={handleAddExpense}
        />
      </div>
    </section>
  );
}
