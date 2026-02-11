// components/dashboard/BalanceItem.tsx
"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import React from "react";

export interface Balance {
  name: string;
  amount: number;
  type: "owed" | "owe";
}

interface BalanceItemProps {
  balance: Balance;
}

export function BalanceItem({ balance }: BalanceItemProps) {
  const isOwed = balance.type === "owed";
  
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg border ${
        isOwed
          ? "bg-emerald-500/5 border-emerald-500/10"
          : "bg-red-500/5 border-red-500/10"
      }`}
    >
      <div className="flex items-center gap-3">
        <Avatar className="w-10 h-10">
          <AvatarFallback className="bg-zinc-800 text-white">
            {balance.name[0]}
          </AvatarFallback>
        </Avatar>
        <span className="text-white font-medium">{balance.name}</span>
      </div>
      <span
        className={`font-semibold ${
          isOwed ? "text-emerald-400" : "text-red-400"
        }`}
      >
        ₹{balance.amount}
      </span>
    </div>
  );
}