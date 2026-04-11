'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ExpenseType } from './ExpenseItem';

interface Chartprop {
  expenses: ExpenseType[] | [];
}
export function ActivityChart({ expenses }: Chartprop) {
  console.log(expenses);

  const chartData = useMemo(() => {
    const today = new Date();
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(today.getDate() - i);
      last7Days.push(day.toISOString().split('T')[0]);
    }

    return last7Days.map((dayStr) => {
      const dayTotal = expenses
        .filter((exp) => {
          const expDate = new Date(exp.createdAt).toISOString().split('T')[0];
          return expDate === dayStr;
        })
        .reduce((sum, exp) => sum + (exp.totalAmount || 0), 0);

      const dateObj = new Date(dayStr);
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
      const fullDate = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      return {
        date: dayStr,
        day: dayName,
        fullDate: fullDate,
        amount: dayTotal,
      };
    });
  }, [expenses]);

  const totalAmount = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.amount, 0);
  }, [chartData]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 shadow-xl">
          <p className="text-zinc-400 text-xs mb-1">{data.fullDate}</p>
          <p className="text-white font-semibold">
            Rs{data.amount.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-zinc-950 border-white/10">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle className="text-white text-lg">Weekly Activity</CardTitle>
          <p className="text-zinc-400 text-sm mt-1">
            Last 7 days expenses overview
          </p>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-zinc-400 text-xs uppercase tracking-wider">
            Total
          </p>
          <p className="text-2xl font-bold text-white">
            Rs{totalAmount.toLocaleString()}
          </p>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717a', fontSize: 12 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#71717a', fontSize: 12 }}
                tickFormatter={(value) => `Rs${value}`}
                width={60}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: 'rgba(255,255,255,0.03)' }}
              />
              <Bar
                dataKey="amount"
                fill="rgba(255,255,255,0.9)"
                radius={[6, 6, 0, 0]}
                maxBarSize={50}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
