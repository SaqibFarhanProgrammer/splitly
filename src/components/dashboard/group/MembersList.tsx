"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMember } from "@/types/member";
import { Crown } from "lucide-react";
import React from "react";

interface MembersListProps {
  groupData: {
    members: IMember[];
  };
}

export default function MembersList({ groupData }: MembersListProps) {
  if (!groupData?.members?.length) return null;

  const members = [...groupData.members].sort(
    (a, b) => Number(b.isAdmin) - Number(a.isAdmin),
  );

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {members.map((member) => {
        const avatar = member.avatar;
        const hasAvatar =
          typeof avatar === "string" &&
          avatar.trim().length > 0 &&
          avatar.startsWith("http");

        return (
          <div
            key={member.userId?.toString() || member.username}
            className="flex items-center gap-2.5 bg-zinc-950/80 px-3 py-2.5 rounded-full border border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900/80 transition-all duration-200 flex-shrink-0"
          >
            <div className="relative">
              <Avatar className="w-8 h-8 ring-2 ring-zinc-800">
                {hasAvatar ? (
                  <AvatarImage
                    src={member.avatar}
                    className="object-cover"
                    alt={member.username}
                  />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-zinc-600 to-zinc-800 text-white text-xs font-bold">
                    {member.username?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                )}
              </Avatar>
              {member.isAdmin && (
                <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-yellow-500/20 rounded-full flex items-center justify-center border border-yellow-500/30">
                  <Crown className="w-2.5 h-2.5 text-yellow-500" />
                </div>
              )}
            </div>

            <div className="flex flex-col leading-none pr-1">
              <span className="text-white text-sm font-medium whitespace-nowrap">
                {member.username || "Unknown"}
              </span>
              <span className="text-zinc-500 text-[10px] whitespace-nowrap mt-0.5">
                {member.isAdmin ? "Admin" : "Member"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}