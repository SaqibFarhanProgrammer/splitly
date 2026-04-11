'use client';

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
import { format, subDays } from 'date-fns';
import { ExpenseType } from './dashboard/ExpenseItem';

interface Chartprop{
  expenses:ExpenseType[]
}

function DashboardChart({ expenses }: Chartprop) {

  const chartData = useMemo(() => {
    const today = new Date();
    const last30Days = [];

    for (let i = 29; i >= 0; i--) {
      const date = subDays(today, i);
      last30Days.push(format(date, 'yyyy-MM-dd'));
    }

    return last30Days.map((dateStr) => {
      const dayTotal = expenses
        .filter((exp) => {
          const expDate = new Date(exp.createdAt).toISOString().split('T')[0];
          return expDate === dateStr;
        })
        .reduce((total, exp) => total + Number(exp.totalAmount), 0);

      return {
        date: dateStr,
        amount: dayTotal,
        displayDate: format(new Date(dateStr), 'dd/MM'),
      };
    });
  }, [expenses]);

  

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-950 border border-zinc-800 rounded-lg shadow-xl px-3 py-2">
          <p className="text-zinc-400 text-xs mb-1">{label}</p>
          <p className="text-white text-sm font-semibold">
            Rs. {payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-zinc-950 rounded-xl border border-zinc-800/50 p-6">
      {/* Header - Shadcn Style */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-white font-semibold text-base">Last 30 Days</h3>
          <p className="text-zinc-500 text-sm mt-0.5">Daily expense overview</p>
        </div>
      </div>

      {/* Chart - 20vh height */}
      <div className="w-full" style={{ height: '20vh', minHeight: '140px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 0, left: -20, bottom: 0 }}
            barGap={1}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a"
              vertical={false}
            />

            <XAxis
              dataKey="displayDate"
              stroke="#3f3f46"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={8}
              interval={4}
              tick={{ fill: '#71717a' }}
            />

            <YAxis
              stroke="#3f3f46"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#71717a' }}
              tickFormatter={(value) =>
                value >= 1000 ? `${value / 1000}k` : value
              }
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: '#27272a', opacity: 0.4 }}
            />

            <Bar
              dataKey="amount"
              fill="#e4e4e7"
              radius={[2, 2, 0, 0]}
              maxBarSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardChart;
