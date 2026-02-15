// components/dashboard/DashboardHeader.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings, Plus } from "lucide-react";
import React from "react";

interface DashboardHeaderProps {
  name: string;
  email: string;
  initials: string;
  memberSince: string;
  isPro?: boolean;
}

export function DashboardHeader({
  name,
  email,
  initials,
  memberSince,
  isPro = true,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
      <div className="flex items-center gap-4">
        <Avatar className="w-20 h-20 border-2 border-white/10">
          <AvatarImage src="" />
          <AvatarFallback className="bg-white text-black text-2xl font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">{name}</h1>
          <p className="text-zinc-400">{email}</p>
          <div className="flex items-center gap-2 mt-2">
            {isPro && (
              <Badge
                variant="secondary"
                className="bg-white/10 text-white border-0"
              >
                Pro Member
              </Badge>
            )}
            <Badge variant="outline" className="border-white/20 text-zinc-400">
              Since {memberSince}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Group
        </Button>
      </div>
    </div>
  );
}
