// components/modals/ManageMembers.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Crown, Trash2 } from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";
import { IMember } from "@/types/member";


interface ManageMembersProps {
  isOpen: boolean;
  onClose: () => void;
  members: IMember[];
  onDelete?: (memberId: string) => void;
  currentUserId?: string;
  onMemberDeleted?: (memberId: string) => void;
}

export default function ManageMembers({
  isOpen,
  onClose,
  members,
  onDelete,
  currentUserId = "1",
  onMemberDeleted,
}: ManageMembersProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const params = useParams();
  const giD = params.groupID;

  const handleDeleteClick = async (id: string) => {
    try {
      const res = await axios.post("/api/group/deleteMemeber", {
        groupId: giD,
        memberId: id,
      });

      if (res.data) {
        onMemberDeleted?.(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBalanceColor = (balance: number) => {
    if (balance > 0) return "text-emerald-400";
    if (balance < 0) return "text-red-400";
    return "text-zinc-400";
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm max-h-[85vh] overflow-hidden rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div>
            <h2 className="text-base font-semibold text-white">
              Manage Members
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {members.length} members
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white h-8 w-8"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[calc(85vh-120px)] p-4 space-y-2">
          {members.map((member, index) => (
            <div
              key={member.userId || index}
              className="flex items-center justify-between bg-zinc-900/50 border border-white/5 rounded-xl p-3"
            >
              <div className="flex items-center gap-3">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-zinc-800 text-white text-xs font-bold">
                    {member.username[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-white text-sm font-medium">
                      {member.username}
                    </p>
                    {member.isAdmin === true && (
                      <Crown className="w-3 h-3 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-zinc-500 text-xs">@{member.username}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-medium ${getBalanceColor(0)}`}>
                </span>

                {member.isAdmin !== true && member.userId !== currentUserId && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 ${
                      deleteConfirm === member.userId
                        ? "bg-red-500/20 text-red-400"
                        : "text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                    }`}
                    onClick={() => {
                      if (deleteConfirm === member.userId) {
                        handleDeleteClick(member.userId);
                        setDeleteConfirm(null);
                      } else {
                        setDeleteConfirm(member.userId);
                      }
                    }}
                  >
                    {deleteConfirm === member.userId ? (
                      <Trash2 className="w-3.5 h-3.5" />
                    ) : (
                      <X className="w-3.5 h-3.5" />
                    )}
                  </Button>
                )}

                {member.userId === currentUserId && (
                  <Badge className="bg-white/10 text-white text-[10px] border-0 px-2 py-0.5">
                    You
                  </Badge>
                )}

                {member.isAdmin === true && member.userId !== currentUserId && (
                  <Badge className="bg-yellow-500/10 text-yellow-500 text-[10px] border-0 px-2 py-0.5">
                    Admin
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-white/10 bg-zinc-950">
          <Button
            className="w-full bg-white text-black hover:bg-zinc-200 h-9 text-sm"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}