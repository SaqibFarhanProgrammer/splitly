"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock } from "lucide-react";
import Link from "next/link";
import React from "react";
import { IMember } from "@/types/member";

export interface Group {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  members: IMember[];
  totalAmount: number;
  isActive: boolean;
}

interface GroupCardProps {
  group: Group;
  youOwe?: number;       // Optional, if you track per user
  youAreOwed?: number;   // Optional
}

export function GroupCard({ group, youOwe = 0, youAreOwed = 0 }: GroupCardProps) {

  return (
    <div>
      <Link href={`/group/${group._id}`}>
        <Card className="bg-zinc-950 border-white/10 hover:border-white/20 transition-colors cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14 bg-zinc-800">
                  <AvatarFallback className="bg-zinc-800 text-white text-xl font-bold">
                    {group.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {group.name}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {group.members.length} members
                    </span>
                    <span>•</span>
                    <p className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      nill
                    </p>
                  </div>
                </div>
              </div>
              <Badge
                variant={group.isActive ? "default" : "secondary"}
                className={group.isActive ? "bg-white/10 text-white" : "bg-zinc-800 text-zinc-400"}
              >
                {group.isActive ? "Active" : "Settled"}
              </Badge>
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm mb-1">Total Expenses</p>
                  <p className="text-xl font-semibold text-white">
                    ₹{group.totalAmount.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  {youOwe > 0 ? (
                    <p className="text-red-400 font-medium">You owe ₹{youOwe}</p>
                  ) : youAreOwed > 0 ? (
                    <p className="text-emerald-400 font-medium">You are owed ₹{youAreOwed}</p>
                  ) : (
                    <p className="text-zinc-500 font-medium">All settled</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}