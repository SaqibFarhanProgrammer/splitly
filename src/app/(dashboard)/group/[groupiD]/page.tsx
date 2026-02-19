// app/group/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  Plus,
  CheckCircle2,
  MoreVertical,
  Send,
  Wallet,
  Receipt,
  Settings,
  Trash2,
  UserMinus,
  UserPlus,
  LogOut,
  Edit3,
} from "lucide-react";
import Link from "next/link";
import axios, { AxiosRequestConfig } from "axios";
import { number } from "zod";
import AddMembers from "@/components/dashboard/group/AddMemebers";
import { useRouter } from "next/navigation";
import mongoose from "mongoose";

// Form Types
interface SettlementFormValues {
  memberId: string;
  amount: string;
  note: string;
}

interface ExpenseFormValues {
  amount: string;
  description: string;
  paidBy: string;
  splitWith: string[];
}

interface Imemeber {
  username: string;
  isadmin: boolean;
}

interface IgroupData {
  name: string;
  totalAmount: number;
  isActive: boolean;
  members: Imemeber[];
  createdBy: string;
  createdAt: number;
  upnumberdAt: number;
}

// Dummy Group Data - isAdmin flag added
const GroupdataDefault: IgroupData = {
  name: "Hunza Trip 2024",
  isActive: true, // Change to false to see non-admin view
  members: [],
  totalAmount: 45800,
  createdBy: "",
  createdAt: 100,
  upnumberdAt: 100,
};

// Dummy Expenses (Chat style)
const expenses = [];

export default function GroupPage() {
  const params = useParams();
  const router = useRouter();
  const [isSettlementOpen, setIsSettlementOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [groupData, setgroupData] = useState<IgroupData>(GroupdataDefault);

  const [ShowAddmember, setShowAddmember] = useState(false);
  // Settlement Form
  const settlementForm = useForm<SettlementFormValues>({
    defaultValues: {
      memberId: "",
      amount: "",
      note: "",
    },
  });

  // Expense Form
  const expenseForm = useForm<ExpenseFormValues>({
    defaultValues: {
      amount: "",
      description: "",
      paidBy: "",
      splitWith: [],
    },
  });

  // Settlement Validation
  const validateSettlement = (data: SettlementFormValues) => {
    const errors: Partial<Record<keyof SettlementFormValues, string>> = {};

    if (!data.memberId) {
      errors.memberId = "Please select a member";
    }

    if (!data.amount) {
      errors.amount = "Amount is required";
    } else if (parseFloat(data.amount) <= 0) {
      errors.amount = "Amount must be greater than 0";
    } else if (isNaN(parseFloat(data.amount))) {
      errors.amount = "Please enter a valid number";
    }

    return errors;
  };

  // Expense Validation
  const validateExpense = (data: ExpenseFormValues) => {
    const errors: Partial<Record<keyof ExpenseFormValues, string>> = {};

    if (!data.amount) {
      errors.amount = "Amount is required";
    } else if (parseFloat(data.amount) <= 0) {
      errors.amount = "Amount must be greater than 0";
    } else if (isNaN(parseFloat(data.amount))) {
      errors.amount = "Please enter a valid number";
    }

    if (!data.description.trim()) {
      errors.description = "Description is required";
    }

    if (!data.paidBy) {
      errors.paidBy = "Select who paid";
    }

    if (!data.splitWith || data.splitWith.length === 0) {
      errors.splitWith = "Select at least one member to split with";
    }

    return errors;
  };

  const onSettlementSubmit = (data: SettlementFormValues) => {
    const errors = validateSettlement(data);

    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([key, message]) => {
        settlementForm.setError(key as keyof SettlementFormValues, {
          type: "manual",
          message: message,
        });
      });
      return;
    }

    console.log("Settlement:", data);
    setIsSettlementOpen(false);
    settlementForm.reset();
  };

  const onExpenseSubmit = (data: ExpenseFormValues) => {
    const errors = validateExpense(data);

    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([key, message]) => {
        expenseForm.setError(key as keyof ExpenseFormValues, {
          type: "manual",
          message: message,
        });
      });
      return;
    }

    console.log("Expense:", data);
    setIsExpenseOpen(false);
    expenseForm.reset();
  };

  const getBalanceColor = (balance: number) => {
    if (balance > 0) return "text-emerald-400";
    if (balance < 0) return "text-red-400";
    return "text-zinc-400";
  };

  async function deleteGroup() {
    try {
      const res = await axios.delete(
        `/api/group/delete?groupId=${params.groupID}`,
      );
      console.log(res.data);
      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  }

  async function GetGroupData() {
    const { groupID } = params;

    const res = await axios.post("/api/group/getgroupdatabyid", {
      groupid: groupID,
    });

    console.log(res);
    return res.data?.data;
  }

  useEffect(() => {
    GetGroupData().then((data) => setgroupData(data));
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header with Dropdown */}
      {ShowAddmember ? (
        <AddMembers
          isOpen={ShowAddmember}
          onClose={() => setShowAddmember(false)}
        />
      ) : null}
      <header className="sticky top-0 z-30   ">
        <div className="w-full px-25 mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-white">
                {groupData.name}
              </h1>
              <p className="text-xs text-zinc-400">0 members</p>
            </div>
          </div>

          {/* Dropdown Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-white"
              >
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-zinc-950 border-white/10 text-white"
            >
              {groupData.isActive ? (
                <>
                  <DropdownMenuItem className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Group
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowAddmember(!ShowAddmember)}
                    className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Member
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white">
                    <UserMinus className="w-4 h-4 mr-2" />
                    Manage Members
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem
                    onClick={deleteGroup}
                    className="hover:bg-red-500/20 text-red-400 cursor-pointer focus:text-red-400 focus:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Group
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem className="hover:bg-white/10 cursor-pointer focus:bg-white/10 focus:text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Group Info
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem className="hover:bg-red-500/20 text-red-400 cursor-pointer focus:text-red-400 focus:bg-red-500/20">
                    <LogOut className="w-4 h-4 mr-2" />
                    Leave Group
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Settlement Summary Card */}
      <div className="max-w-3xl mx-auto w-full px-4 py-4">
        <Card className="bg-zinc-950 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-zinc-400">
                Settlement Summary
              </h2>
              <Badge
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
              >
                Active
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs text-zinc-400 mb-1">Total</p>
                <p className="text-lg font-bold text-white">
                  PKR,{groupData.totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="text-center border-x border-white/10">
                <p className="text-xs text-zinc-400 mb-1">You Get</p>
                <p className="text-lg font-bold text-emerald-400">PKR,5,200</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-zinc-400 mb-1">You Owe</p>
                <p className="text-lg font-bold text-red-400">PKR,0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Members Quick View */}
      <div className="max-w-3xl mx-auto w-full px-4 pb-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {groupData.members?.map((member) => (
            <div
              key={member.username}
              className="flex items-center gap-2 bg-zinc-950 border border-white/10 rounded-[10px] px-3 pr-5 py-2 min-w-fit"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-zinc-800 text-white text-xs font-bold">
                  {member.username.split("")[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm text-white font-medium">
                  {groupData.createdBy === member._id ? "You" : member.username}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat-style Expense List */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 pb-24 space-y-4">
        {expenses.map((expense) => (
          <div key={expense.id} className="flex gap-3">
            <Avatar className="w-10 h-10 mt-1">
              <AvatarFallback className="bg-zinc-800 text-white text-sm font-bold">
                {expense.user.avatar}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              {expense.type === "expense" ? (
                <Card className="bg-zinc-950 border-white/10">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm text-zinc-400 mb-1">
                          {expense.user.name}
                        </p>
                        <h3 className="text-white font-medium">
                          {expense.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">
                          ₹{expense.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-zinc-500">{expense.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <p className="text-xs text-zinc-400">{expense.split}</p>
                      {expense.youPaid ? (
                        <Badge className="bg-emerald-500/10 text-emerald-400 border-0 text-xs">
                          You paid
                        </Badge>
                      ) : (
                        <p className="text-xs text-red-400">
                          You owe ₹{expense.yourShare}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="bg-zinc-900/50 border-white/5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <p className="text-sm text-zinc-300">
                        <span className="text-white font-medium">
                          {expense.user.name}
                        </span>{" "}
                        paid{" "}
                        <span className="text-white font-medium">
                          ₹{expense.amount}
                        </span>{" "}
                        to{" "}
                        <span className="text-white font-medium">
                          {expense.to}
                        </span>
                      </p>
                    </div>
                    {expense.note && (
                      <p className="text-xs text-zinc-500 mt-2 ml-6">
                        {expense.note}
                      </p>
                    )}
                    <p className="text-xs text-zinc-600 mt-2 ml-6">
                      {expense.date}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0  left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-white/10 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex gap-3">
          {/* Add Expense Dialog */}
          <Dialog open={isExpenseOpen} onOpenChange={setIsExpenseOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-white text-black hover:bg-zinc-200 h-10 text-sm font-medium">
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-zinc-950 border-white/10 text-white max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  <Receipt className="w-5 h-5" />
                  Add Expense
                </DialogTitle>
              </DialogHeader>

              <Form {...expenseForm}>
                <form
                  onSubmit={expenseForm.handleSubmit(onExpenseSubmit)}
                  className="space-y-6 mt-4"
                >
                  {/* Amount */}
                  <FormField
                    control={expenseForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400">
                          Amount (₹)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="bg-zinc-900 border-white/10 text-white h-12 text-lg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Description */}
                  <FormField
                    control={expenseForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What was this for?"
                            className="bg-zinc-900 border-white/10 text-white h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Paid By */}
                  <FormField
                    control={expenseForm.control}
                    name="paidBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400">Paid By</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-zinc-900 border-white/10 text-white h-12">
                              <SelectValue placeholder="Who paid?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-900 border-white/10">
                            {groupData.members.map((member) => (
                              <SelectItem
                                key={member.id}
                                value={member.id}
                                className="text-white focus:bg-white/10 focus:text-white"
                              >
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarFallback className="bg-zinc-800 text-xs">
                                      {member.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  {member.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Split With */}
                  <FormField
                    control={expenseForm.control}
                    name="splitWith"
                    render={() => (
                      <FormItem>
                        <FormLabel className="text-zinc-400">
                          Split With
                        </FormLabel>
                        <div className="space-y-3 mt-2">
                          {groupData.members.map((member) => (
                            <FormField
                              key={member.id}
                              control={expenseForm.control}
                              name="splitWith"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={member.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          member.id,
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                member.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== member.id,
                                                ),
                                              );
                                        }}
                                        className="border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal text-white flex items-center gap-2 cursor-pointer">
                                      <Avatar className="w-6 h-6">
                                        <AvatarFallback className="bg-zinc-800 text-xs text-white">
                                          {member.avatar}
                                        </AvatarFallback>
                                      </Avatar>
                                      {member.name}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10 h-12"
                      onClick={() => setIsExpenseOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-white text-black hover:bg-zinc-200 h-12"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Expense
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          {/* Settlement Dialog */}
          <Dialog open={isSettlementOpen} onOpenChange={setIsSettlementOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10 h-10 text-sm font-medium"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Settlement
              </Button>
            </DialogTrigger>

            <DialogContent className="bg-zinc-950 border-white/10 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Record Payment
                </DialogTitle>
              </DialogHeader>

              <Form {...settlementForm}>
                <form
                  onSubmit={settlementForm.handleSubmit(onSettlementSubmit)}
                  className="space-y-6 mt-4"
                >
                  <FormField
                    control={settlementForm.control}
                    name="memberId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400">Pay To</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-zinc-900 border-white/10 text-white h-12">
                              <SelectValue placeholder="Select member" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-900 border-white/10">
                            {groupData.members
                              .filter((m) => m.id !== "1")
                              .map((member) => (
                                <SelectItem
                                  key={member.id}
                                  value={member.id}
                                  className="text-white focus:bg-white/10 focus:text-white"
                                >
                                  <div className="flex items-center gap-2">
                                    <Avatar className="w-6 h-6">
                                      <AvatarFallback className="bg-zinc-800 text-xs">
                                        {member.avatar}
                                      </AvatarFallback>
                                    </Avatar>
                                    {member.name}
                                    <span
                                      className={getBalanceColor(
                                        member.balance,
                                      )}
                                    >
                                      ({member.balance > 0 ? "gets" : "owes"} ₹
                                      {Math.abs(member.balance)})
                                    </span>
                                  </div>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={settlementForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400">
                          Amount (₹)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="bg-zinc-900 border-white/10 text-white h-12 text-lg"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={settlementForm.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400">
                          Note (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What's this for?"
                            className="bg-zinc-900 border-white/10 text-white h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-white/20 text-white hover:bg-white/10 h-12"
                      onClick={() => setIsSettlementOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-white text-black hover:bg-zinc-200 h-12"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Confirm Payment
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
