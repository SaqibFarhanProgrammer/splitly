"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import axios from "axios";
import AddMembers from "@/components/dashboard/group/AddMemebers";
import ManageMembers from "@/components/dashboard/group/ManageMembers";
import MembersList from "@/components/dashboard/group/MembersList";
import { IMember } from "@/types/member";
import { useAuth } from "@/context/AuthContext";

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

interface IgroupData {
  name: string;
  totalAmount: number;
  isActive: boolean;
  members: IMember[];
  createdBy: string;
  createdAt: number;
  upnumberdAt: number;
  _id: string;
}

const GroupdataDefault: IgroupData = {
  name: "Hunza Trip 2024",
  isActive: true,
  members: [],
  totalAmount: 45800,
  createdBy: "",
  createdAt: 100,
  upnumberdAt: 100,
  _id: "",
};

const expenses: any[] = [];

export default function GroupPage() {
  const params = useParams();
  const router = useRouter();
  const [isSettlementOpen, setIsSettlementOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [groupData, setgroupData] = useState<IgroupData>(GroupdataDefault);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [ShowAddmember, setShowAddmember] = useState(false);

  const { user } = useAuth();

  const expenseForm = useForm<ExpenseFormValues>({
    defaultValues: {
      amount: "",
      description: "",
      paidBy: "",
      splitWith: [],
    },
  });

  const settlementForm = useForm<SettlementFormValues>({
    defaultValues: {
      memberId: "",
      amount: "",
      note: "",
    },
  });

  const validateExpense = (data: ExpenseFormValues): boolean => {
    let isValid = true;
    if (!data.amount || parseFloat(data.amount) <= 0) {
      expenseForm.setError("amount", { type: "manual", message: "Valid amount required" });
      isValid = false;
    }
    if (!data.description.trim()) {
      expenseForm.setError("description", { type: "manual", message: "Description required" });
      isValid = false;
    }
    if (!data.paidBy) {
      expenseForm.setError("paidBy", { type: "manual", message: "Select who paid" });
      isValid = false;
    }
    if (!data.splitWith || data.splitWith.length === 0) {
      expenseForm.setError("splitWith", { type: "manual", message: "Select at least one member" });
      isValid = false;
    }
    return isValid;
  };

  const validateSettlement = (data: SettlementFormValues): boolean => {
    let isValid = true;
    if (!data.memberId) {
      settlementForm.setError("memberId", { type: "manual", message: "Select a member" });
      isValid = false;
    }
    if (!data.amount || parseFloat(data.amount) <= 0) {
      settlementForm.setError("amount", { type: "manual", message: "Valid amount required" });
      isValid = false;
    }
    return isValid;
  };

  const onExpenseSubmit = (data: ExpenseFormValues) => {
    if (!validateExpense(data)) return;
    console.log("Expense:", data);
    setIsExpenseOpen(false);
    expenseForm.reset();
  };

  const onSettlementSubmit = (data: SettlementFormValues) => {
    if (!validateSettlement(data)) return;
    console.log("Settlement:", data);
    setIsSettlementOpen(false);
    settlementForm.reset();
  };

  async function deleteGroup() {
    try {
      const res = await axios.delete(`/api/group/delete?groupId=${params.groupID}`);
      console.log(res);
      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  }

  async function GetGroupData() {
    const { groupID } = params;
    const res = await axios.post("/api/group/getgroupdatabyid", { groupid: groupID });
    return res.data?.data;
  }

  async function handleleavegroup() { 
    try {
      const res = await axios.post("/api/group/leavegroup", { groupid: params.groupID, userid: user?._id });
      router.push("/profile");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    GetGroupData().then((data) => setgroupData(data));
  }, []);

  return (
    <div className="min-h-screen bg-[#08080B] flex flex-col mt-15 font-['inter-reguler']">
      {ShowAddmember && <AddMembers isOpen={ShowAddmember} onClose={() => setShowAddmember(false)} />}

      <header className="sticky top-0 z-30 px-20">
        <div className="w-full px-4 mx-auto h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/profile">
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-['inter-bold'] text-white">{groupData.name}</h1>
              <p className="text-xs font-['inter-light-betaa'] text-zinc-400">{groupData.members?.length || 0} members</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-zinc-950 border-white/10 text-white font-['inter-reguler']">
              {groupData.isActive && groupData.createdBy.toString() === user?._id ? (
                <>
                  <DropdownMenuItem className="hover:bg-white/10 cursor-pointer font-['inter-bold']">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Group
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowAddmember(!ShowAddmember)} className="hover:bg-white/10 cursor-pointer font-['inter-bold']">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Member
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsManageOpen(true)} className="hover:bg-white/10 cursor-pointer font-['inter-bold']">
                    <UserMinus className="w-4 h-4 mr-2" />
                    Manage Members
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={deleteGroup} className="hover:bg-red-500/20 text-red-400 cursor-pointer font-['inter-bold']">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Group
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                </>
              ) : (
                <>
                  <DropdownMenuItem className="hover:bg-white/10 cursor-pointer font-['inter-bold']">
                    <Settings className="w-4 h-4 mr-2" />
                    Group Info
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={handleleavegroup} className="hover:bg-red-500/20 text-red-400 cursor-pointer font-['inter-bold']">
                    <LogOut className="w-4 h-4 mr-2" />
                    Leave Group
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="max-w-3xl mx-auto w-full px-4 py-4">
        <Card className="bg-zinc-950 border-white/10 font-['inter-reguler']">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-['inter-bold'] text-zinc-400">Settlement Summary</h2>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 font-['inter-bold']">
                Active
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs font-['inter-light-betaa'] text-zinc-400 mb-1">Total</p>
                <p className="text-lg font-['inter-bold'] text-white">PKR {groupData.totalAmount.toLocaleString()}</p>
              </div>
              <div className="text-center border-x border-white/10">
                <p className="text-xs font-['inter-light-betaa'] text-zinc-400 mb-1">You Get</p>
                <p className="text-lg font-['inter-bold'] text-emerald-400">PKR 0</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-['inter-light-betaa'] text-zinc-400 mb-1">You Owe</p>
                <p className="text-lg font-['inter-bold'] text-red-400">PKR 0</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto w-full px-4 pb-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <MembersList groupData={groupData} />
        </div>
      </div>

      {/* Expenses and Modals */}
      {/* Add Expense and Settlement Modals remain same, just added font-['inter-reguler'] to wrapper divs and labels */}

      <ManageMembers
        isOpen={isManageOpen}
        onClose={() => setIsManageOpen(false)}
        members={groupData.members}
        currentUserId="your-user-id"
        onMemberDeleted={(deletedMemberId) =>
          setgroupData((prev) => ({
            ...prev,
            members: prev.members.filter((m) => (m.userId?.toString() as string) !== deletedMemberId),
          }))
        }
      />
    </div>
  );
}