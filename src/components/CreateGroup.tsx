// components/modals/CreateGroupModal.tsx
"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Plus, Loader2 } from "lucide-react";
import axios from "axios";

interface CreateGroupData {
  groupName: string;
  totalExpense: string;
  members: { username: string }[];
}

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: CreateGroupData) => Promise<void>;
}

export function CreateGroupModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateGroupModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGroupData>({
    defaultValues: {
      groupName: "",
      totalExpense: "",
      members: [{ username: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const handleCreateGroup = async (data: CreateGroupData) => {
    setIsLoading(true);
    const resposne = await axios.post("/api/group/create", {
      name: data.groupName,
      totalAmount: data.totalExpense,
    });
    setIsLoading(false);
    onClose();
    data.groupName = "";
    data.totalExpense = "";
    console.log(resposne);
  };

  if (!isOpen) return null;

  async function GetGroups() {
    
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-[450px] h-[70vh] bg-zinc-950 border border-white/10 rounded-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <h2 className="text-lg font-bold text-white">Create New Group</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-5">
          <form
            id="create-group-form"
            onSubmit={handleSubmit(handleCreateGroup)}
            className="space-y-5"
          >
            {/* Group Name */}
            <div className="space-y-2">
              <Label className="text-white text-sm font-medium">
                Group Name
              </Label>
              <Input
                placeholder="e.g., Trip to Hunza"
                className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 h-10"
                {...register("groupName", {
                  required: "Required",
                  minLength: { value: 3, message: "Min 3 chars" },
                })}
              />
              {errors.groupName && (
                <p className="text-xs text-red-400">
                  {errors.groupName.message}
                </p>
              )}
            </div>

            {/* Total Expense */}
            <div className="space-y-2">
              <Label className="text-white text-sm font-medium">
                Total Expense
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 font-medium">
                  ₹
                </span>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="pl-8 bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 h-10"
                  {...register("totalExpense", {
                    required: "Required",
                    min: { value: 1, message: "Min 1" },
                  })}
                />
              </div>
              {errors.totalExpense && (
                <p className="text-xs text-red-400">
                  {errors.totalExpense.message}
                </p>
              )}
            </div>

            {/* Members */}
          </form>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/10 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 border-white/10 text-white hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-group-form"
            className="flex-1 bg-white text-black hover:bg-zinc-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
