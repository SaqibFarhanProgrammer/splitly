// components/dashboard/QuickActions.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Plus, 
  Users, 
  Receipt, 
  Wallet,
  ArrowRight
} from "lucide-react";
import React from "react";

const actions = [
  {
    title: "Add Expense",
    description: "Log a new expense",
    icon: Receipt,
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    title: "Create Group",
    description: "Start a new group",
    icon: Users,
    color: "bg-purple-500/10 text-purple-400",
  },
  {
    title: "Settle Up",
    description: "Clear your balances",
    icon: Wallet,
    color: "bg-emerald-500/10 text-emerald-400",
  },
];

export function QuickActions() {
  return (
    <Card className="bg-zinc-950 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <button
            key={action.title}
            className="w-full flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left group"
          >
            <div className={`w-10 h-10 rounded-full ${action.color} flex items-center justify-center`}>
              <action.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">{action.title}</h4>
              <p className="text-zinc-400 text-sm">{action.description}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
          </button>
        ))}
      </CardContent>
    </Card>
  );
}