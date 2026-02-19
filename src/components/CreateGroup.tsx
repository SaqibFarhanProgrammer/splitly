// components/modals/CreateGroupModal.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Loader2 } from "lucide-react";
import axios from "axios";

interface CreateGroupData {
  groupName: string;
  totalExpense: string;
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
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateGroupData>({
    defaultValues: {
      groupName: "",
      totalExpense: "",
    },
  });

  const handleCreateGroup = async (data: CreateGroupData) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/group/create", {
        name: data.groupName,
        totalAmount: data.totalExpense,
      });
      setIsLoading(false);
      reset();
      onClose();
      console.log(response);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal - Compact Size */}
      <div className="relative w-full max-w-sm bg-zinc-950 border border-white/10 rounded-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-base font-semibold text-white">Create New Group</h2>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        {/* Form - Compact */}
        <form
          id="create-group-form"
          onSubmit={handleSubmit(handleCreateGroup)}
          className="p-4 space-y-4"
        >
          {/* Group Name */}
          <div className="space-y-1.5">
            <Label className="text-zinc-400 text-xs font-medium">
              Group Name
            </Label>
            <Input
              placeholder="e.g., Trip to Hunza"
              className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 h-9 text-sm"
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
          <div className="space-y-1.5">
            <Label className="text-zinc-400 text-xs font-medium">
              Total Expense
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">
                ₹
              </span>
              <Input
                type="number"
                placeholder="0.00"
                className="pl-7 bg-zinc-900 border-white/10 text-white placeholder:text-zinc-600 h-9 text-sm"
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
        </form>

        {/* Footer - Compact */}
        <div className="p-4 border-t border-white/10 flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 border-white/10 text-white hover:bg-white/5 h-9 text-xs"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-group-form"
            className="flex-1 bg-white text-black hover:bg-zinc-200 h-9 text-xs"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}