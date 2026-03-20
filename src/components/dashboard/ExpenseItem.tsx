// components/dashboard/ExpenseItem.tsx
'use client'

import { Receipt } from 'lucide-react'
import React from 'react'

export interface Expense {
  createdAt: string
  groupId: string
  paidBy: string
  paidmemberAvatar: string
  paidmemberUsername: string
  title: string
  totalAmount?: number
  type: string
  updatedAt: string
  _id: string
}

interface ExpenseItemProps {
  expense: Expense
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  console.log(expense, 'hello')

  return (
    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
          <Receipt className="w-5 h-5 text-zinc-400" />
        </div>
        <div>
          <h4 className="text-white font-medium">{expense.title}</h4>
          <p className="text-zinc-400 text-sm">
            {expense.groupId} • {expense.createdAt}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white font-semibold">
          ₹{expense.totalAmount?.toLocaleString()}
        </p>
      </div>
    </div>
  )
}
