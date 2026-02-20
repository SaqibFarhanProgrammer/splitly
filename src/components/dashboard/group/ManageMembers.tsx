// components/modals/ManageMembers.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Crown, Trash2 } from "lucide-react";

interface Member {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: "admin" | "member";
  balance: number;
}

interface ManageMembersProps {
  isOpen: boolean;
  onClose: () => void;
  members: Member[];
  onDelete?: (memberId: string) => void;
  currentUserId?: string;
}

export default function ManageMembers({
  isOpen,
  onClose,
  members,
  onDelete,
  currentUserId = "1",
}: ManageMembersProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleDeleteClick = (memberId: string) => {
    if (deleteConfirm === memberId) {
      onDelete?.(memberId);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(memberId);
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
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div>
            <h2 className="text-base font-semibold text-white">Manage Members</h2>
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

        {/* Members List */}
        <div className="overflow-y-auto max-h-[calc(85vh-120px)] p-4 space-y-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between bg-zinc-900/50 border border-white/5 rounded-xl p-3"
            >
              {/* Left - Avatar & Info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-zinc-800 text-white text-xs font-bold">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-white text-sm font-medium">{member.name}</p>
                    {member.role === "admin" && (
                      <Crown className="w-3 h-3 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-zinc-500 text-xs">@{member.username}</p>
                </div>
              </div>

              {/* Right - Actions */}
              <div className="flex items-center gap-2">
                {/* Balance */}
                <span className={`text-xs font-medium ${getBalanceColor(member.balance)}`}>
                  {member.balance > 0 ? "+" : ""}₹{Math.abs(member.balance)}
                </span>

                {/* Delete Button - Only for non-admin, non-self */}
                {member.role !== "admin" && member.id !== currentUserId && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-7 w-7 ${
                      deleteConfirm === member.id
                        ? "bg-red-500/20 text-red-400"
                        : "text-zinc-500 hover:text-red-400 hover:bg-red-500/10"
                    }`}
                    onClick={() => handleDeleteClick(member.id)}
                  >
                    {deleteConfirm === member.id ? (
                      <Trash2 className="w-3.5 h-3.5" />
                    ) : (
                      <X className="w-3.5 h-3.5" />
                    )}
                  </Button>
                )}

                {/* Self Badge */}
                {member.id === currentUserId && (
                  <Badge className="bg-white/10 text-white text-[10px] border-0 px-2 py-0.5">
                    You
                  </Badge>
                )}

                {/* Admin Badge */}
                {member.role === "admin" && member.id !== currentUserId && (
                  <Badge className="bg-yellow-500/10 text-yellow-500 text-[10px] border-0 px-2 py-0.5">
                    Admin
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
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