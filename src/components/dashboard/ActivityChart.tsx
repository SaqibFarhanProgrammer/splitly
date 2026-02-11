// components/dashboard/ActivityChart.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const data = [30, 45, 25, 60, 40, 75, 50];

export function ActivityChart() {
  const maxValue = Math.max(...data);
  
  return (
    <Card className="bg-zinc-950 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Weekly Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between h-32 gap-2">
          {data.map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-white/10 rounded-t-sm hover:bg-white/20 transition-colors relative group"
                style={{ height: `${(value / maxValue) * 100}%` }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ₹{value}k
                </div>
              </div>
              <span className="text-zinc-500 text-xs">{days[i]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}