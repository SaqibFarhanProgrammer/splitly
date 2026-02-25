import { IMember } from "@/types/member";
import React from "react";

interface MembersListProps {
  groupData: {
    members: IMember[];
  };
}

function MembersList({ groupData }: MembersListProps) {
  return (
    <div className="flex flex-row gap-4 mt-2 overflow-x-auto">
      {groupData.members.map((member) => {
        const avatar = member.avatar;

        // Check if valid image URL exists
        const hasAvatar =
          typeof avatar === "string" &&
          avatar.trim().length > 0 &&
          avatar.startsWith("http");

        return (
          <div
            key={member.username}
            className="flex flex-col items-center gap-1 min-w-[60px]"
          >
            {/* Avatar Circle */}
            <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 flex items-center justify-center">
              {hasAvatar ? (
                <img
                  src={avatar}
                  alt={member.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm text-white font-medium">
                  {member.username?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            {/* Username */}
            <span className="text-white text-xs text-center truncate max-w-[60px]">
              {member.username}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default MembersList;
