// components/ProfileSection.tsx
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

// Dummy Group Data

// Dummy Recent Expenses
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

// Dummy Balances
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
}

export default function Page() {
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [gdata, setgdata] = useState<GroupData[]>([]);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const handleCreateGroup = async (data: {
    groupName: string;
    members: { username: string }[];
  }) => {
    console.log("Creating group:", data);
    // API call yahan karo
    // await createGroupAPI(data);
  };

  const handleAddExpense = async (data: {
    description: string;
    amount: string;
    date: string;
    notes?: string;
  }) => {
    console.log("Adding expense:", data);
    // API call yahan karo
    // await addExpenseAPI(data);
  };

  useEffect(() => {
    axios.get("/api/group/getallgroups").then((res) => {
      if (res.data) {
        const data = res?.data?.data;
        console.log(data);

        setgdata(data);
      }

      console.log(gdata);
    });
  }, []);

  return (
    <section className="min-h-screen py-14 px-6 ]  text-white">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-2 border-white/10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-white text-black text-2xl font-bold">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold mb-1">John Doe</h1>
              <p className="text-zinc-400">john.doe@example.com</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge
                  variant="secondary"
                  className="bg-white/10 text-white border-0"
                >
                  Pro Member
                </Badge>
                <Badge
                  variant="outline"
                  className="border-white/20 text-zinc-400"
                >
                  Since 2023
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button onClick={() => setIsCreateGroupOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Group
            </Button>
          </div>
        </div>

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
                {gdata.map((group) => (
                  <Card
                    key={group.name}
                    className="bg-zinc-950 border-white/10 hover:border-white/20 transition-colors"
                  >
                    <Link href={`/group/${group._id}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="bg-zinc-800 text-white text-xs font-bold">
                              {group.name.split("")[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex items-center gap-4">
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-1">
                                {group.name}
                              </h3>
                              <div className="flex items-center gap-3 text-sm text-zinc-400">
                                <span className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  12 members
                                </span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                </span>
                              </div>
                            </div>
                          </div>
                          <Badge
                            variant={
                              group.isActive === true ? "default" : "secondary"
                            }
                            className={
                              group.isActive === true
                                ? "bg-white/10 text-white"
                                : "bg-zinc-800 text-zinc-400"
                            }
                          >
                            {group.isActive === true ? "Active" : "Settled"}
                          </Badge>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/5">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-zinc-400 text-sm mb-1">
                                Total Expenses
                              </p>
                              <p className="text-xl font-semibold text-white">
                                ₹{group.totalAmount}
                              </p>
                            </div>
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
          onSubmit={handleCreateGroup}
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
