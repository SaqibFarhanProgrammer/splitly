'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { redirect, useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
} from 'lucide-react';

import Link from 'next/link';
import axios from 'axios';

import { IMember } from '@/types/member';
import { useAuth } from '@/context/AuthContext';
import mongoose from 'mongoose';

import { Skeleton } from '@/components/ui/skeleton';
import { ExpenseSkeleton } from '@/components/Skeliton/ExpenseListSkeliton';
import { MembersListSkeleton } from '@/components/Skeliton/MembersListSkeleton';
import SettlementList from '@/components/dashboard/group/SettlementList';
import { SettlementT } from '@/types/settlementTypes';
import { fi } from 'zod/locales';
import { Expense } from '@/types/globalTypes';

const AddMembers = dynamic(
  () => import('@/components/dashboard/group/AddMemebers'),
  { loading: () => <Skeleton className="h-10 w-full" /> }
);

const ManageMembers = dynamic(
  () => import('@/components/dashboard/group/ManageMembers'),
  { loading: () => <Skeleton className="h-10 w-full" /> }
);

const MembersList = dynamic(
  () => import('@/components/dashboard/group/MembersList'),
  { loading: () => <MembersListSkeleton /> }
);

const ExpensesList = dynamic(
  () => import('@/components/dashboard/group/ExpensesList'),
  { loading: () => <ExpenseSkeleton /> }
);

interface SettlementFormValues {
  memberId: string;
  amount: string;
  note: string;
}

export interface ExpenseFormValues {
  amount: number | string;
  description: string;
  paidBy: string | mongoose.Types.ObjectId;
  groupid: string;
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
  name: 'Hunza Trip 2024',
  isActive: true,
  members: [],
  totalAmount: 45800,
  createdBy: '',
  createdAt: 100,
  upnumberdAt: 100,
  _id: '',
};

interface SettlementType {
  groupId: string;
  paidBy: string;
  paidTo: string;
  amount: number;
  paidByUserAvatar: string;
  paidByUserName: string;
  paidToUserName: string;
  note: string;
}

export default function GroupPage() {
  const params = useParams();
  const router = useRouter();
  const [isSettlementOpen, setIsSettlementOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [groupData, setgroupData] = useState<IgroupData>(GroupdataDefault);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [ShowAddmember, setShowAddmember] = useState(false);
  const [expense, setexpense] = useState<Expense[]>([]);
  const [settlements, setsettlements] = useState<SettlementT[]>([]);

  const { user } = useAuth();

  const expenseForm = useForm<ExpenseFormValues>({
    defaultValues: {
      amount: '',
      description: '',
      paidBy: '',
    },
  });

  const settlementForm = useForm<SettlementFormValues>({
    defaultValues: {
      memberId: '',
      amount: '',
      note: '',
    },
  });

  const validateExpense = (data: ExpenseFormValues): boolean => {
    let isValid = true;

    if (!data.amount || Number(data.amount) <= 0) {
      expenseForm.setError('amount', {
        type: 'manual',
        message: 'Valid amount required',
      });
      isValid = false;
    }

    if (!data.description) {
      expenseForm.setError('description', {
        type: 'manual',
        message: 'Description required',
      });
      isValid = false;
    }

    if (!data.paidBy) {
      expenseForm.setError('paidBy', {
        type: 'manual',
        message: 'Select who paid',
      });
      isValid = false;
    }

    return isValid;
  };

  const validateSettlement = (data: SettlementFormValues): boolean => {
    let isValid = true;

    if (!data.memberId) {
      settlementForm.setError('memberId', {
        type: 'manual',
        message: 'Select a member',
      });
      isValid = false;
    }

    if (!data.amount || parseFloat(data.amount) <= 0) {
      settlementForm.setError('amount', {
        type: 'manual',
        message: 'Valid amount required',
      });
      isValid = false;
    }

    return isValid;
  };

  const onExpenseSubmit = async (data: ExpenseFormValues) => {
    if (!validateExpense(data)) return;

    try {
      const groupid = params.groupID;

      const formdata: ExpenseFormValues = {
        amount: data.amount,
        description: data.description,
        paidBy: data.paidBy,
        groupid: groupid as string,
      };

      const res = await axios.post('/api/expense/addexpense', formdata);

      setIsExpenseOpen(false);
      expenseForm.reset();
      getExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);

      expenseForm.setError('amount', {
        type: 'manual',
        message: 'Failed to add expense',
      });
    }
  };

  const onSettlementSubmit = async (data: SettlementFormValues) => {
    if (!validateSettlement(data)) return;

    const groupid = params.groupID as string;

    const selectedMember = groupData.members.find(
      (m) => m.username === data.memberId
    );

    if (!selectedMember || !user?._id) return;

    try {
      const res = await axios.post('/api/settlement/adddsettlement', {
        paidBy: user._id,
        paidTo: selectedMember.userId,
        amount: data.amount,
        note: data.note,
        paidByUserAvatar: user.avatar || '',
        paidByUserName: user.username || '',
        paidToUserAvatar: selectedMember.avatar || '',
        paidToUserName: selectedMember.username || '',
        groupid: groupid,
      });

      if (res.status === 200 || res.status === 201) {
        const newSettlement: SettlementT = {
          groupId: groupid,
          paidBy: user._id.toString(),
          paidTo: selectedMember.userId as string,
          amount: Number(data.amount),
          paidByUserAvatar: user.avatar || '',
          paidByUserName: user.username || '',
          paidToUserName: selectedMember.username || '',
          note: data.note || '',
        };

        setsettlements((prev) => [newSettlement, ...prev]);
      }
    } catch (error) {
      console.error('Settlement error:', error);
    }

    setIsSettlementOpen(false);
    settlementForm.reset();
  };
  async function deleteGroup() {
    try {
      const groupid = params.groupID;
      const res = await axios.post(`/api/group/delete`, {
        groupid: groupid,
      });

      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  }

  async function GetGroupData() {
    try {
      const { groupID } = params;

      const res = await axios.post('/api/group/getgroupdatabyid', {
        groupid: groupID,
      });

      if (res?.status === 200) {
        return res.data?.data;
      } else {
        redirect('/profile');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleleavegroup() {
    try {
      const res = await axios.post('/api/group/leavegroup', {
        groupid: params.groupID,
      });

      router.push('/profile');
    } catch (error) {
      console.error(error);
    }
  }

  async function getallSettlement() {
    try {
      const res = await axios.post(
        '/api/settlement/getallsettlementbyGroupid',
        {
          groupId: params.groupID,
        }
      );
      if (res.data) setsettlements(res?.data.settlemnts);
    } catch (error) {
      console.error('Error fetching settlements:', error);
    }
  }

  async function getExpenses() {
    try {
      const groupid = params.groupID;

      const res = await axios.post('/api/expense/getallexpensesbygroupid', {
        groupId: groupid,
      });
      setexpense(res.data.expenses);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  }
  function calculateBalance() {
    if (!expense || !groupData?.members || !user?._id) return 0;

    const totalAmount = expense.reduce((sum, exp) => {
      return sum + Number(exp.totalAmount);
    }, 0);

    const membersCount = groupData.members.length;
    if (membersCount === 0) return 0;

    const share = totalAmount / membersCount;

    const youPaid = expense
      .filter((exp) => exp.paidBy.toString() === user._id)
      .reduce((sum, exp) => {
        return sum + Number(exp.totalAmount);
      }, 0);

    const settlementsPaid = settlements
      .filter((s) => s.paidBy === user._id)
      .reduce((sum, s) => {
        return sum + Number(s.amount);
      }, 0);

    const settlementsReceived = settlements
      .filter((s) => s.paidTo === user._id)
      .reduce((sum, s) => {
        return sum + Number(s.amount);
      }, 0);

    const expenseBalance = youPaid - share;

    const balance = expenseBalance - settlementsReceived + settlementsPaid;

    return balance;
  }

  function calculateYouOwe() {
    const balance = calculateBalance();

    if (balance < 0) {
      return Math.abs(Math.round(balance));
    }

    return 0;
  }

  function calculateYouGet() {
    const balance = calculateBalance();

    if (balance > 0) {
      return Math.round(balance);
    }

    return 0;
  }
  useEffect(() => {
    GetGroupData().then((data) => {
      if (data) setgroupData(data);
    });

    getallSettlement();
    getExpenses();
  }, [params.groupID]);

  return (
    <div className="min-h-screen bg-[#08080B] flex flex-col mt-15 font-['inter-reguler']">
      {ShowAddmember && (
        <AddMembers
          isOpen={ShowAddmember}
          onClose={() => setShowAddmember(false)}
        />
      )}

      <header className="sticky backdrop-blur-[10px] top-15 z-30 px-20">
        <div className="w-full px-4 mx-auto h-16 flex items-center justify-between">
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
              <h1 className="text-lg font-['inter-bold'] text-white">
                {groupData.name}
              </h1>
              <p className="text-xs font-['inter-light-betaa'] text-zinc-400">
                {groupData.members?.length || 0} members
              </p>
            </div>
          </div>

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
              className="w-56 bg-zinc-950 border-white/10 text-white font-['inter-reguler']"
            >
              {groupData.isActive &&
              groupData.createdBy.toString() === user?._id ? (
                <>
                  <DropdownMenuItem className="hover:bg-white/10 cursor-pointer font-['inter-bold']">
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Group
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowAddmember(!ShowAddmember)}
                    className="hover:bg-white/10 cursor-pointer font-['inter-bold']"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add Member
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setIsManageOpen(true)}
                    className="hover:bg-white/10 cursor-pointer font-['inter-bold']"
                  >
                    <UserMinus className="w-4 h-4 mr-2" />
                    Manage Members
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={deleteGroup}
                    className="hover:bg-red-500/20 text-red-400 cursor-pointer font-['inter-bold']"
                  >
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
                  <DropdownMenuItem
                    onClick={handleleavegroup}
                    className="hover:bg-red-500/20 text-red-400 cursor-pointer font-['inter-bold']"
                  >
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
              <h2 className="text-sm font-['inter-bold'] text-zinc-400">
                Overall Summary
              </h2>
              <Badge
                variant="outline"
                className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 font-['inter-bold']"
              >
                Active
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs font-['inter-light-betaa'] text-zinc-400 mb-1">
                  Total Expense
                </p>
                <p className="text-lg font-['inter-bold'] text-white">
                  PKR{' '}
                  {expense
                    .reduce((sum, exp) => sum + exp.totalAmount, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="text-center border-x border-white/10">
                <p className="text-xs font-['inter-light-betaa'] text-zinc-400 mb-1">
                  You Get
                </p>
                <p className="text-lg font-['inter-bold'] text-emerald-400">
                  PKR {calculateYouGet().toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-['inter-light-betaa'] text-zinc-400 mb-1">
                  You Owe
                </p>
                <p className="text-lg font-['inter-bold'] text-red-400">
                  PKR {calculateYouOwe().toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto w-full px-4 pb-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {!groupData.members ? (
            <MembersListSkeleton />
          ) : (
            <MembersList groupData={groupData} />
          )}
        </div>
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 pb-28 space-y-3">
        {!expense ? (
          <ExpenseSkeleton />
        ) : expense.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-10">
            No expenses yet
          </p>
        ) : (
          <ExpensesList expense={expense} />
        )}
      </div>
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 pb-28 space-y-3">
        <p className="text-2xl text-white">Settlements</p>
        <SettlementList settlements={settlements} />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#08080B]/90 backdrop-blur-xl border-t border-white/10 z-40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex gap-3">
          <Dialog open={isExpenseOpen} onOpenChange={setIsExpenseOpen}>
            <DialogTrigger asChild>
              <Button className="flex-1 bg-zinc-100 text-black hover:bg-zinc-200 h-10 text-sm font-medium">
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
                  className="space-y-5 mt-4"
                >
                  <FormField
                    control={expenseForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 text-sm">
                          Amount (PKR)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="bg-zinc-900 border-white/10 text-white h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={expenseForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 text-sm">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What was this for?"
                            className="bg-zinc-900 border-white/10 text-white h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={expenseForm.control}
                    name="paidBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 text-sm">
                          Paid By
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-zinc-900 border-white/10 text-white h-11">
                              <SelectValue placeholder="Who paid?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-900 border-white/10">
                            {groupData.members.map((member, index) => (
                              <SelectItem
                                key={index}
                                value={member.userId as string}
                                className="text-white text-sm"
                              >
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-6 h-6">
                                    {member.avatar === '' ? (
                                      <AvatarFallback className="bg-zinc-800 text-xs">
                                        {member.username
                                          .charAt(0)
                                          .toUpperCase()}
                                      </AvatarFallback>
                                    ) : (
                                      <AvatarImage
                                        src={member.avatar}
                                        className="h-full w-full object-cover"
                                      />
                                    )}
                                  </Avatar>
                                  {member.userId === user?._id
                                    ? 'You'
                                    : member.username}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white h-10 text-sm"
                      onClick={() => setIsExpenseOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-zinc-100 text-black hover:bg-zinc-200 h-10 text-sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <Dialog open={isSettlementOpen} onOpenChange={setIsSettlementOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 border-zinc-700 text-zinc-800 hover:bg-zinc-800 hover:text-white h-10 text-sm font-medium"
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
                  className="space-y-5 mt-4"
                >
                  <FormField
                    control={settlementForm.control}
                    name="memberId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 text-sm">
                          Pay To
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-zinc-900 border-white/10 text-white h-11">
                              <SelectValue placeholder="Select member" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-zinc-900 border-white/10">
                            {groupData.members
                              .filter((m) => m.userId !== user?._id)
                              .map((member) => (
                                <SelectItem
                                  key={member.username}
                                  value={member.username}
                                  className="text-white text-sm"
                                >
                                  <div className="flex items-center gap-2">
                                    <Avatar className="w-6 h-6">
                                      {member.avatar === '' ? (
                                        <AvatarFallback className="bg-zinc-800 text-xs">
                                          {member.username
                                            .charAt(0)
                                            .toUpperCase()}
                                        </AvatarFallback>
                                      ) : (
                                        <AvatarImage
                                          src={member.avatar}
                                          className="h-full w-full object-cover"
                                        />
                                      )}
                                    </Avatar>
                                    {member.username}
                                  </div>
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={settlementForm.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 text-sm">
                          Amount (PKR)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0.00"
                            className="bg-zinc-900 border-white/10 text-white h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={settlementForm.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400 text-sm">
                          Note (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What's this for?"
                            className="bg-zinc-900 border-white/10 text-white h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white h-10 text-sm"
                      onClick={() => setIsSettlementOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-zinc-100 text-black hover:bg-zinc-200 h-10 text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Confirm
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <ManageMembers
        isOpen={isManageOpen}
        onClose={() => setIsManageOpen(false)}
        members={groupData.members}
        currentUserId="your-user-id"
        onMemberDeleted={(deletedMemberId) =>
          setgroupData((prev) => ({
            ...prev,
            members: prev.members.filter(
              (m) => (m.userId?.toString() as string) !== deletedMemberId
            ),
          }))
        }
      />
    </div>
  );
}
