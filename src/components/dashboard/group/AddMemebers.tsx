// components/AddMembers.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { X, Plus, UserPlus, Check } from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";

// Dummy existing members
const existingMembers = [
  { id: "2", name: "Ahmed", username: "ahmed123", avatar: "A", added: true },
  { id: "3", name: "Saqib", username: "saqib_khan", avatar: "S", added: true },
];

// Dummy searchable users
const searchableUsers = [
  { id: "4", name: "Ali", username: "ali_ahmed", avatar: "A" },
  { id: "5", name: "Usman", username: "usman_22", avatar: "U" },
  { id: "6", name: "Bilal", username: "bilal_k", avatar: "B" },
  { id: "7", name: "Zain", username: "zain_01", avatar: "Z" },
];

interface FormValues {
  username: string;
}

interface AddMembersProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMembers({ isOpen, onClose }: AddMembersProps) {
  const [searchResults, setSearchResults] = useState<typeof searchableUsers>(
    [],
  );
  const [addedMembers, setAddedMembers] = useState<string[]>([]);
  const [showResults,
   setShowResults] = useState(false);
  const params = useParams();
  const { groupID } = params;

  const form = useForm<FormValues>({
    defaultValues: {
      username: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setShowResults(true);
    console.log(data);
    

    const res = await axios.post("/api/group/addmemeber", {
      username: data.username.trim().toLowerCase(),
      groupiD: groupID,
    });

    console.log(res);
    
  };

  const addMember = (userId: string) => {

  };

  const removeMember = (userId: string) => {
    setAddedMembers(addedMembers.filter((id) => id !== userId));
  };

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    // Backdrop with blur
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={handleBackdropClick}
    >
      {/* Dialog Box */}
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

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] p-6">
          {/* Search Form */}
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

          {/* Search Results */}
          {showResults && (
            <div className="mt-5 space-y-3">
              <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Search Results
              </h2>
              {searchResults.length > 0 ? (
                <div className="space-y-2">
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between bg-zinc-900/50 border border-white/5 rounded-xl p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar className="w-9 h-9">
                          <AvatarFallback className="bg-zinc-800 text-white text-sm font-bold">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white text-sm font-medium">
                            {user.name}
                          </p>
                          <p className="text-zinc-500 text-xs">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                      {addedMembers.includes(user.id) ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 h-8 text-xs"
                          onClick={() => removeMember(user.id)}
                        >
                          <Check className="w-3 h-3 mr-1" />
                          Added
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          type="submit"
                          className="bg-white text-black hover:bg-zinc-200 h-8 text-xs"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-zinc-500 text-sm">No users found</p>
                </div>
              )}
            </div>
          )}

          {/* Existing Members */}
          <div className="mt-6">
            <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
              Current Members ({existingMembers.length})
            </h2>
            <div className="space-y-2">
              {existingMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between bg-zinc-900/30 border border-white/5 rounded-xl p-3"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9">
                      <AvatarFallback className="bg-zinc-800 text-white text-sm font-bold">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {member.name}
                      </p>
                      <p className="text-zinc-500 text-xs">
                        @{member.username}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500 bg-zinc-900 px-2 py-1 rounded-full">
                    Member
                  </span>
                </div>
              ))}
            </div>
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
