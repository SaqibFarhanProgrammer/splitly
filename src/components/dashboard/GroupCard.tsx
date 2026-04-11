'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ExpenseType } from './ExpenseItem';

interface IMember {
  userId?: string;
  username: string;
  avatar?: string;
  isAdmin?: boolean;
}

export interface GroupType {
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
  group: GroupType;
  expense: ExpenseType[];
  youOwe?: number; // Optional, if you track per user
  youAreOwed?: number; // Optional
}

export function GroupCard({
  group,
  youOwe = 0,
  youAreOwed = 0,
  expense,
}: GroupCardProps) {
  function getgrouptotalexpense(groupid: string) {
    const total = expense.filter((ex) => ex.groupId.includes(groupid));
    const finalamount = total.reduce((total, ex) => {
      return total + Number(ex.totalAmount);
    }, 0);

    return finalamount;
  }

  return (
    <div>
      <Link href={`/group/${group._id}`}>
        <Card className="bg-zinc-950 border-white/10 hover:border-white/20 transition-colors cursor-pointer overflow-hidden">
          <CardContent className="p-0">
            {/* Header: Avatar + Title + Status */}
            <div className="p-6 pb-4">
              <div className="flex items-start gap-4">
                <Avatar className="w-12 h-12 bg-zinc-800 border border-white/10">
                  <AvatarFallback className="bg-zinc-800 text-white font-bold">
                    {group.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {group.name}
                    </h3>
                    <Badge
                      variant={group.isActive ? 'default' : 'secondary'}
                      className={
                        group.isActive
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }
                    >
                      {group.isActive ? 'Active' : 'Settled'}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-3 mt-2 text-sm text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4" />
                      {group.members.length} members
                    </span>
                    <span className="text-zinc-600">•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      nill
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="px-6 py-4 bg-zinc-900/30 border-y border-white/5">
              <div className="flex items-center justify-between">
                {/* Total Expenses */}
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                    Total Expenses
                  </p>
                  <p className="text-xl font-bold text-white">
                    Rs{getgrouptotalexpense(group._id)}
                  </p>
                </div>

                {/* Balance */}
                <div className="text-right">
                  {youOwe > 0 ? (
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                        You Owe
                      </p>
                      <p className="text-lg font-semibold text-red-400">
                        ₹{youOwe}
                      </p>
                    </div>
                  ) : youAreOwed > 0 ? (
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                        You Are Owed
                      </p>
                      <p className="text-lg font-semibold text-emerald-400">
                        ₹{youAreOwed}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
                        Status
                      </p>
                      <p className="text-lg font-semibold text-zinc-400">
                        All Settled
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 flex items-center justify-between text-sm">
              <span className="text-zinc-500">View details</span>
              <ChevronRight className="w-4 h-4 text-zinc-600" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
