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
    <div className="flex f gap-3 mt-3">
      {members.map((member) => {
        const avatar = member.avatar;

        const hasAvatar =
          typeof avatar === "string" &&
          avatar.trim().length > 0 &&
          avatar.startsWith("http");

        return (
          <div
            key={member.userId?.toString() || member.username}
            className="flex  items-center gap-3 bg-zinc-950 p-3 rounded-[12px] border border-zinc-800 hover:bg-zinc-900 transition"
          >
            <Avatar className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center">
              {hasAvatar ? (
                <AvatarImage
                  src={member.avatar}
                  className="object-cover w-full h-full"
                />
              ) : (
                <AvatarFallback className="bg-white text-black text-sm font-bold">
                  {member.username
                    ? member.username.charAt(0).toUpperCase()
                    : "U"}
                </AvatarFallback>
              )}
            </Avatar>

            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1.5">
                <p className="text-white text-sm font-medium">
                  {member.username || "Unknown"}
                </p>

                {member.isAdmin === true && (
                  <Crown className="w-3.5 h-3.5 text-yellow-500" />
                )}
              </div>

              <p className="text-zinc-500 text-xs">
                @{member.username || "unknown"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
