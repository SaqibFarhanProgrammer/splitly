// components/dashboard/ExpenseItem.tsx
'use client';

import { Clock, Receipt } from 'lucide-react';
import React from 'react';

export interface Expense {
  createdAt: string;
  groupId: string;
  paidBy: string;
  paidmemberAvatar: string;
  paidmemberUsername: string;
  title: string;
  totalAmount?: number;
  type: string;
  updatedAt: string;
  _id: string;
}

interface ExpenseItemProps {
  expense: Expense;
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  return (
    <div
      key={expense._id}
      className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-xl border border-white/5 hover:border-white/10 group"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={expense.paidmemberAvatar}
            alt={expense.paidmemberUsername}
            className="w-12 h-12 rounded-full object-cover border-2 border-white/10 group-hover:border-white/20 transition-colors"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
              e.currentTarget.src = 'https://via.placeholder.com/48';
            }}
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-zinc-800 rounded-full flex items-center justify-center border border-white/10">
            <Clock className="w-3 h-3 text-zinc-400" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h4 className="text-white font-medium font-['inter-bold'] text-base">
            {expense.title}
          </h4>
          <div className="flex items-center gap-2 text-zinc-400 text-sm font-['inter-beta']">
            <span className="bg-white/5 px-2 py-0.5 rounded-full text-xs">
              {expense.groupId.split('').slice(0, 5).join('')
                ? 'Group Expense'
                : 'Personal'}
            </span>
            <span>•</span>
            <span>@{expense.paidmemberUsername}</span>
          </div>
        </div>
      </div>

      <div className="text-right flex flex-col items-end gap-1">
        <p className="text-white font-semibold font-['inter-bold'] text-lg">
          Rs{expense.totalAmount.toLocaleString()}
        </p>
        <div className="flex items-center gap-2"></div>
        <p className="text-zinc-500 text-xs mt-1">
          {new Date(expense.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
}
