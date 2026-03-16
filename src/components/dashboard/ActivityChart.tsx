// components/dashboard/ActivityChart.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/context/AuthContext'
import { useDashboardContext } from '@/context/Dashboard.context'
import { useExpenses } from '@/context/Expenses.Context'
import React from 'react'

export function ActivityChart() {
  // const maxValue = Math.max(...data)

  const { data } = useDashboardContext()

  const { expenses } = useExpenses()

  const today = new Date()
  const last7Days = []
  for (let i = 6; i >= 0; i--) {
    const day = new Date()
    day.setDate(today.getDate() - i)
    last7Days.push(day.toISOString().split('T')[0])
  }

  const dailyTotals = last7Days.map((dayStr) => {
    const total = expenses
      .filter((exp) => {
        const expDay = new Date(exp.createdAt).toISOString().split('T')[0]
        return expDay === dayStr
      })
      .reduce((sum, exp) => sum + exp.totalAmount, 0)

    return { date: dayStr, total }
  })

  console.log(dailyTotals)

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return (
    <Card className="bg-zinc-950 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between h-32 gap-2">
          {dailyTotals.map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-white/10 rounded-t-sm hover:bg-white/20 transition-colors relative group"
                // style={{ height: `${(value.total / maxValue) * 100}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{value.total}k
                </div>
              </div>
              <span className="text-zinc-500 text-xs">{days[i]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
