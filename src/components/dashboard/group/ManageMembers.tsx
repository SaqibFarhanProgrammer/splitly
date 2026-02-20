// components/modals/ManageMembers.tsx
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X, Shield, Crown, Trash2, UserMinus } from "lucide-react";

// Dummy members data
const initialMembers = [
  { id: "1", name: "You", username: "you", avatar: "Y", role: "admin", balance: 5200 },
  { id: "2", name: "Ahmed", username: "ahmed123", avatar: "A", role: "member", balance: -3200 },
  { id: "3", name: "Saqib", username: "saqib_khan", avatar: "S", role: "member", balance: -2000 },
  { id: "4", name: "Ali", username: "ali_01", avatar: "A", role: "member", balance: 0 },
];

type Role = "admin" | "member";

interface Member {
  id: string;
  name: string;
  username: string;
  avatar: string;
  role: Role;
  balance: number;
}

interface ManageMembersProps {
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
}

export default function ManageMembers({ isOpen, onClose, isAdmin = true }: ManageMembersProps) {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleRoleChange = (memberId: string, newRole: Role) => {
    setMembers(members.map(m => 
      m.id === memberId ? { ...m, role: newRole } : m
    ));
  };

  const handleDelete = (memberId: string) => {
    if (deleteConfirm === memberId) {
      setMembers(members.filter(m => m.id !== memberId));
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
    // Backdrop with blur
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Modal */}
      <div 
        className="relative w-full max-w-md max-h-[85vh] overflow-hidden rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div>
            <h2 className="text-lg font-bold text-white">Manage Members</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              {members.length} members • {members.filter(m => m.role === "admin").length} admins
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
        <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-5 space-y-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between bg-zinc-900/50 border border-white/5 rounded-xl p-3"
            >
              {/* Left - Avatar & Info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-zinc-800 text-white text-sm font-bold">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white text-sm font-medium">{member.name}</p>
                    {member.role === "admin" && (
                      <Crown className="w-3.5 h-3.5 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-zinc-500 text-xs">@{member.username}</p>
                  <p className={`text-xs mt-0.5 ${getBalanceColor(member.balance)}`}>
                    {member.balance > 0 ? "+" : ""}₹{Math.abs(member.balance)}
                  </p>
                </div>
              </div>

              {/* Right - Actions */}
              <div className="flex items-center gap-2">
                {/* Role Badge (non-admin view) */}
                {!isAdmin && (
                  <Badge 
                    variant="outline" 
                    className={`text-xs border-0 ${
                      member.role === "admin" 
                        ? "bg-yellow-500/10 text-yellow-500" 
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {member.role === "admin" ? "Admin" : "Member"}
                  </Badge>
                )}

                {/* Admin Controls */}
                {isAdmin && member.id !== "1" && (
                  <>
                    {/* Role Select */}
                    <Select
                      value={member.role}
                      onValueChange={(value: Role) => handleRoleChange(member.id, value)}
                    >
                      <SelectTrigger className="w-28 h-8 bg-zinc-900 border-white/10 text-white text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-white/10">
                        <SelectItem 
                          value="admin" 
                          className="text-white text-xs focus:bg-white/10 focus:text-white"
                        >
                          <div className="flex items-center gap-2">
                            <Shield className="w-3 h-3" />
                            Admin
                          </div>
                        </SelectItem>
                        <SelectItem 
                          value="member"
                          className="text-white text-xs focus:bg-white/10 focus:text-white"
                        >
                          <div className="flex items-center gap-2">
                            <UserMinus className="w-3 h-3" />
                            Member
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Delete Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`h-8 w-8 ${
                        deleteConfirm === member.id
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : "text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                      }`}
                      onClick={() => handleDelete(member.id)}
                    >
                      {deleteConfirm === member.id ? (
                        <Trash2 className="w-4 h-4" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                    </Button>
                  </>
                )}

                {/* Self indicator */}
                {member.id === "1" && (
                  <Badge className="bg-white/10 text-white text-xs border-0">
                    You
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-950">
          <Button 
            className="w-full bg-white text-black hover:bg-zinc-200 h-10"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}