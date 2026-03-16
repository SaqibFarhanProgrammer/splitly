// components/dashboard/StatCard.tsx
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react'
import React from 'react'

interface StatCardProps {
  title: string
  amount: string
  trend?: string
  trendUp?: boolean
  icon: LucideIcon
  iconBgColor: string
  iconColor: string
  amountColor?: string
  subtitle?: string
}

export function StatCard({
  title,
  amount,
  trend,
  trendUp,
  icon: Icon,
  iconBgColor,
  iconColor,
  amountColor = 'text-white',
  subtitle,
}: StatCardProps) {
  return (
    <Card className="bg-zinc-950 border-white/10">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-zinc-400 text-sm mb-1">{title}</p>
            <p className={`text-3xl font-bold ${amountColor}`}>{amount}</p>
          </div>
          <div
            className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center`}
          >
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        </div>

        {subtitle && <p className="text-zinc-500 text-sm mt-4">{subtitle}</p>}
      </CardContent>
    </Card>
  )
}
