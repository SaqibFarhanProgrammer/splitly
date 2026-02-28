"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMember } from "@/types/member";
import React from "react";

interface MembersListProps {
  groupData: {
    members: IMember[];
  };
}

export default function MembersList({ groupData }: MembersListProps) {
  if (!groupData?.members?.length) return null;

  return (
    <div className="flex f gap-4 mt-2">
      {" "}
      {/* flex-col for vertical stacking */}
      {groupData.members.map((member) => {
        const avatar = member.avatar;
        const hasAvatar =
          typeof avatar === "string" &&
          avatar.trim().length > 0 &&
          avatar.startsWith("http");

        return (
          <div
            key={member.userId?.toString() || member.username} // prefer _id if available
            className="flex items-center gap-3 bg-zinc-950 p-2 rounded-[10px] border  border-zinc-800"
          >
            <Avatar className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center">
              {hasAvatar ? (
                <AvatarImage src={member.avatar} className="object-cover" />
              ) : (
                <AvatarFallback className="bg-white text-black text-sm font-bold font-['inter-bold']">
                  {member.username
                    ? member.username.charAt(0).toUpperCase()
                    : "U"}
                </AvatarFallback>
              )}
            </Avatar>

            <span className="text-white text-sm truncate">
              {member.username || "Unknown"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
