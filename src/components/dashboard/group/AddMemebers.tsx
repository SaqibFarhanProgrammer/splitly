"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X, UserPlus } from "lucide-react";
import { IMember } from "@/types/member";

interface AddMembersProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMembers({ isOpen, onClose }: AddMembersProps) {
  const params = useParams();
  const groupID = params?.groupID as string;

  const [members, setMembers] = useState<IMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<IMember>({
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (data: IMember) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post("/api/group/addmemeber", {
        username: data.username.trim().toLowerCase(),
        groupId: groupID,
      });

      const newUser: IMember = res.data?.data;
      if (!newUser) {
        return;
      }
      setMembers((prev) => [...prev, newUser]);

      form.reset();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md max-h-[85vh] overflow-hidden rounded-2xl bg-zinc-950 border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h1 className="text-xl font-bold text-white">Add Members</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-400 hover:text-white h-8 w-8"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6">
          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-400 text-sm">
                      Username
                    </FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          placeholder="Enter username..."
                          className="bg-zinc-900 border-white/10 text-white h-11 focus:border-white/30"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="bg-white text-black hover:bg-zinc-200 h-11 px-3"
                      >
                        <UserPlus className="w-4 h-4" />
                      </Button>
                    </div>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />
            </form>
          </Form>

          {/* Error */}
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

          {/* Members */}
          <div className="mt-6">
            <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
              Current Members ({members.length})
            </h2>

            {members.length === 0 ? (
              <p className="text-zinc-500 text-sm">No members yet</p>
            ) : (
              <div className="space-y-2">
                {members.map((user, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-zinc-900/30 border border-white/5 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9">
                        <AvatarFallback className="bg-zinc-800 text-white text-sm font-bold">
                          {user.username.split("")[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <p className="text-white text-sm font-medium">
                          {user.username || user.username}
                        </p>
                        <p className="text-zinc-500 text-xs">
                          @{user.username}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded-full">
                      Member
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-zinc-950">
          <Button
            className="w-full bg-white text-black hover:bg-zinc-200 h-11"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
