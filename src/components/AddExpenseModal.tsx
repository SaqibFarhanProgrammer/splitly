// components/modals/AddExpenseModal.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X, Receipt, Calendar, Loader2 } from "lucide-react";

interface AddExpenseData {
  description: string;
  amount: string;
  date: string;
  notes?: string;
}

interface AddExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupName?: string;
  onSubmit?: (data: AddExpenseData) => Promise<void>;
}

export function AddExpenseModal({ isOpen, onClose, groupName, onSubmit }: AddExpenseModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddExpenseData>({
    defaultValues: {
      description: "",
      amount: "",
      date: new Date().toISOString().split('T')[0],
      notes: "",
    },
  });

  const handleAddExpense = async (data: AddExpenseData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await onSubmit?.(data);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-[80%] h-[80vh] bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden flex flex-col font-inter-reguler">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Receipt className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-inter-bold text-white">Add Expense</h2>
              {groupName && (
                <p className="text-sm text-zinc-400 font-inter-beta">in {groupName}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <form id="add-expense-form" onSubmit={handleSubmit(handleAddExpense)} className="space-y-6">
            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white font-inter-bold">
                Description
              </Label>
              <Input
                id="description"
                placeholder="e.g., Dinner at Monal"
                className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 font-inter-reguler h-12"
                {...register("description", { 
                  required: "Description is required",
                  minLength: { value: 3, message: "Min 3 characters" }
                })}
              />
              {errors.description && (
                <p className="text-sm text-red-400 font-inter-beta">{errors.description.message}</p>
              )}
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-white font-inter-bold">
                Amount
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-inter-bold text-lg">₹</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-10 bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 font-inter-reguler h-12 text-lg"
                  {...register("amount", { 
                    required: "Amount is required",
                    min: { value: 1, message: "Min amount is 1" },
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Invalid amount"
                    }
                  })}
                />
              </div>
              {errors.amount && (
                <p className="text-sm text-red-400 font-inter-beta">{errors.amount.message}</p>
              )}
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-white font-inter-bold">
                Date
              </Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="date"
                  type="date"
                  className="pl-10 bg-zinc-900 border-white/10 text-white font-inter-reguler h-12"
                  {...register("date", { required: "Date is required" })}
                />
              </div>
              {errors.date && (
                <p className="text-sm text-red-400 font-inter-beta">{errors.date.message}</p>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-white font-inter-bold">
                Notes <span className="text-zinc-400 font-inter-beta">(Optional)</span>
              </Label>
              <Textarea
                id="notes"
                placeholder="Add any additional details..."
                className="bg-zinc-900 border-white/10 text-white placeholder:text-zinc-500 font-inter-reguler min-h-[100px] resize-none"
                {...register("notes")}
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 border-white/10 text-white hover:bg-white/5 font-inter-bold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="add-expense-form"
            className="flex-1 bg-white text-black hover:bg-zinc-200 font-inter-bold"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Expense"}
          </Button>
        </div>
      </div>
    </div>
  );
}