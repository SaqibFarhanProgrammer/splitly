'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Users,
  Plus,
  Receipt,
  Scale,
  ArrowRight,
  CheckCircle2,
  Trash2,
  UserPlus,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { formatCurrency, SuggestedSettlement } from '@/lib/financial-engine';
import { AddExpenseModal } from '@/components/expenses/AddExpenseModal';
import { SettleModal } from '@/components/settlements/SettleModal';
import { toast } from 'sonner';
import axios from 'axios';

export default function GroupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const groupID = (params?.groupiD as string) || '';

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Modals
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [settleOpen, setSettleOpen] = useState(false);
  const [selectedSuggestedSettlement, setSelectedSuggestedSettlement] =
    useState<SuggestedSettlement | null>(null);

  // Add Member inline
  const [memberInput, setMemberInput] = useState('');
  const [addingMember, setAddingMember] = useState(false);

  const fetchGroupData = async () => {
    if (!groupID) return;
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/group/getgroupdatabyid?groupId=${groupID}`
      );
      setData(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to load group details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, [groupID]);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberInput.trim()) return;

    try {
      setAddingMember(true);
      const res = await axios.post('/api/group/addmemeber', {
        groupId: groupID,
        memberIdentifier: memberInput.trim(),
      });
      toast.success(res.data.message || 'Member added');
      setMemberInput('');
      fetchGroupData();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to add member');
    } finally {
      setAddingMember(false);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      await axios.post('/api/group/delete', { groupId: groupID });
      toast.success('Group deleted successfully');
      router.push('/allgroups');
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to delete group');
    }
  };

  const openSettlementFor = (settlement?: SuggestedSettlement) => {
    setSelectedSuggestedSettlement(settlement || null);
    setSettleOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  const group = data?.group;
  const expenses = data?.expenses || [];
  const settlements = data?.settlements || [];
  const summary = data?.financialSummary;

  return (
    <div className="space-y-8">
      {/* Group Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
              {group?.name || 'Group Details'}
            </h2>
            <Badge variant="outline">
              {group?.members?.length || 0} Members
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Created on {new Date(group?.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => setAddExpenseOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" /> Add Expense
          </Button>

          <Button
            variant="outline"
            onClick={() => openSettlementFor()}
            className="gap-2"
          >
            <DollarSign className="h-4 w-4" /> Settle Up
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to delete this group?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This operation is permanent. All expenses and settlement
                  records in this group will be deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteGroup}
                  className="bg-destructive text-destructive-foreground hover:opacity-90"
                >
                  Delete Group
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* Debt Simplification & Settlement Matrix Banner */}
      <Card className="border-border bg-card shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-foreground" />
              <CardTitle className="text-base font-bold">
                Suggested Minimal Settlements
              </CardTitle>
            </div>
            <Badge variant="secondary" className="text-xs">
              Total Expenses: {formatCurrency(summary?.totalExpenses || 0)}
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Optimized minimal payment transactions required to zero out all
            balances in this group.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!summary?.suggestedSettlements ||
          summary.suggestedSettlements.length === 0 ? (
            <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium py-2">
              <CheckCircle2 className="h-5 w-5" /> Everyone is completely
              settled up in this group!
            </div>
          ) : (
            <div className="space-y-3">
              {summary.suggestedSettlements.map(
                (s: SuggestedSettlement, idx: number) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border border-border bg-muted/30"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border border-border">
                        <AvatarImage src={s.fromAvatar} alt={s.fromUsername} />
                        <AvatarFallback className="text-xs bg-muted">
                          {s.fromUsername.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex items-center gap-2 text-sm font-medium">
                        <span>{s.fromUsername}</span>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <span>{s.toUsername}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <span className="text-base font-bold text-foreground">
                        {formatCurrency(s.amount)}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openSettlementFor(s)}
                        className="h-8 text-xs gap-1"
                      >
                        Record Payment
                      </Button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Group Detail Tabs */}
      <Tabs defaultValue="expenses" className="w-full">
        <TabsList className="bg-muted p-1">
          <TabsTrigger value="expenses" className="gap-2">
            <Receipt className="h-4 w-4" /> Expenses ({expenses.length})
          </TabsTrigger>
          <TabsTrigger value="balances" className="gap-2">
            <Scale className="h-4 w-4" /> Member Balances
          </TabsTrigger>
          <TabsTrigger value="members" className="gap-2">
            <Users className="h-4 w-4" /> Members ({group?.members?.length || 0}
            )
          </TabsTrigger>
        </TabsList>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Expense Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              {expenses.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground space-y-3">
                  <p>No expenses added to this group yet.</p>
                  <Button
                    onClick={() => setAddExpenseOpen(true)}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" /> Add First Expense
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {expenses.map((exp: any) => (
                    <div
                      key={exp._id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between py-4 gap-3 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-9 w-9 mt-0.5 border border-border">
                          <AvatarImage
                            src={exp.paidmemberAvatar}
                            alt={exp.paidmemberUsername}
                          />
                          <AvatarFallback className="text-xs bg-muted">
                            {exp.paidmemberUsername
                              ? exp.paidmemberUsername.substring(0, 2)
                              : 'M'}
                          </AvatarFallback>
                        </Avatar>

                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {exp.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Paid by{' '}
                            <span className="font-medium">
                              {exp.paidmemberUsername || 'Member'}
                            </span>{' '}
                            •{' '}
                            {new Date(
                              exp.date || exp.createdAt
                            ).toLocaleDateString()}
                          </p>
                          {exp.splits && exp.splits.length > 0 && (
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              Split between {exp.splits.length} participants (
                              {exp.splitType || 'EQUAL'})
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <Badge variant="secondary" className="text-xs">
                          {exp.category || 'General'}
                        </Badge>
                        <span className="text-base font-bold text-foreground">
                          {formatCurrency(exp.totalAmount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Member Balances Tab */}
        <TabsContent value="balances" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Individual Net Standings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(summary?.memberSummaries || {}).map((m: any) => (
                  <div
                    key={m.userId}
                    className="p-4 rounded-lg border border-border bg-muted/20 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border border-border">
                          <AvatarImage src={m.avatar} alt={m.username} />
                          <AvatarFallback className="text-xs bg-muted">
                            {m.username.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-bold text-foreground">
                          {m.username}
                        </span>
                      </div>

                      <div
                        className={`text-sm font-bold ${
                          m.netBalance > 0
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : m.netBalance < 0
                              ? 'text-destructive'
                              : 'text-muted-foreground'
                        }`}
                      >
                        {m.netBalance > 0
                          ? `gets back ${formatCurrency(m.netBalance)}`
                          : m.netBalance < 0
                            ? `owes ${formatCurrency(Math.abs(m.netBalance))}`
                            : 'settled up'}
                      </div>
                    </div>

                    <div className="flex justify-between text-xs text-muted-foreground border-t border-border/50 pt-2">
                      <span>Total paid: {formatCurrency(m.totalPaid)}</span>
                      <span>Total share: {formatCurrency(m.totalOwed)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Group Roster
              </CardTitle>
              <CardDescription>
                Members who can add and split expenses in this group
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Member inline form */}
              <form onSubmit={handleAddMember} className="flex gap-2">
                <Input
                  placeholder="Enter email or username to add member..."
                  value={memberInput}
                  onChange={(e) => setMemberInput(e.target.value)}
                  className="max-w-md text-sm"
                />
                <Button
                  type="submit"
                  disabled={addingMember}
                  className="gap-1.5"
                >
                  <UserPlus className="h-4 w-4" /> Add Member
                </Button>
              </form>

              <div className="divide-y divide-border border-t border-border pt-4">
                {group?.members?.map((m: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between py-3"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border">
                        <AvatarImage src={m.avatar} alt={m.username} />
                        <AvatarFallback className="text-xs bg-muted">
                          {m.username ? m.username.substring(0, 2) : 'M'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {m.username}
                        </p>
                      </div>
                    </div>

                    {m.isAdmin && (
                      <Badge variant="outline" className="text-xs">
                        Admin
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <AddExpenseModal
        open={addExpenseOpen}
        onOpenChange={setAddExpenseOpen}
        groups={[group]}
        defaultGroupId={groupID}
        onExpenseAdded={fetchGroupData}
      />

      <SettleModal
        open={settleOpen}
        onOpenChange={setSettleOpen}
        groupId={groupID}
        groupMembers={group?.members || []}
        suggestedSettlement={selectedSuggestedSettlement}
        onSettlementRecorded={fetchGroupData}
      />
    </div>
  );
}
