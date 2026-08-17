'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Receipt,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Scale,
  TrendingUp,
  Wallet,
  Calendar,
  ChevronRight,
  UserCheck,
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
import { formatCurrency } from '@/lib/financial-engine';
import { CreateGroupModal } from '@/components/groups/CreateGroupModal';
import axios from 'axios';

export default function DashboardPage() {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/dashboard/summary');
      setSummary(res.data);
    } catch (err) {
      console.error('Failed to load dashboard summary:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Banner / Welcome */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            Financial Overview
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track your group balances, recent transactions, and settlements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setCreateGroupOpen(true)}
            className="gap-2"
          >
            <Users className="h-4 w-4" />
            Create Group
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* Net Balance Card */}
        <Card className="border-border bg-card shadow-xs relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Balance
            </CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-9 w-32" />
            ) : (
              <div>
                <div
                  className={`text-3xl font-bold tracking-tight ${
                    summary?.netBalance > 0
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : summary?.netBalance < 0
                        ? 'text-destructive'
                        : 'text-foreground'
                  }`}
                >
                  {formatCurrency(summary?.netBalance || 0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {summary?.netBalance > 0
                    ? 'Overall, you are owed money'
                    : summary?.netBalance < 0
                      ? 'Overall, you owe money'
                      : 'All settled up cleanly!'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* You Owe Card */}
        <Card className="border-border bg-card shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              You Owe
            </CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-9 w-28" />
            ) : (
              <div>
                <div className="text-3xl font-bold tracking-tight text-foreground">
                  {formatCurrency(summary?.totalYouOwe || 0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total pending payments to group members
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* You Are Owed Card */}
        <Card className="border-border bg-card shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              You Are Owed
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-9 w-28" />
            ) : (
              <div>
                <div className="text-3xl font-bold tracking-tight text-foreground">
                  {formatCurrency(summary?.totalYouAreOwed || 0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total pending reimbursements to collect
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="groups" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-muted p-1">
            <TabsTrigger value="groups" className="gap-2">
              <Users className="h-4 w-4" />
              Active Groups ({summary?.activeGroupsCount || 0})
            </TabsTrigger>
            <TabsTrigger value="expenses" className="gap-2">
              <Receipt className="h-4 w-4" />
              Recent Transactions
            </TabsTrigger>
          </TabsList>

          <Link
            href="/allgroups"
            className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            View all groups <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {/* Groups Tab */}
        <TabsContent value="groups" className="space-y-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-40 border-border">
                  <CardHeader>
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-8 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : !summary?.groups || summary.groups.length === 0 ? (
            <Card className="border-dashed border-border bg-card p-8 text-center">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Users className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  No Groups Yet
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Get started by creating your first group to manage shared
                  expenses with friends or teammates.
                </p>
                <Button
                  onClick={() => setCreateGroupOpen(true)}
                  className="gap-2 mt-2"
                >
                  <Plus className="h-4 w-4" /> Create Your First Group
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {summary.groups.map((group: any) => (
                <Link key={group._id} href={`/group/${group._id}`}>
                  <Card className="border-border bg-card hover:bg-accent/40 transition-colors cursor-pointer h-full flex flex-col justify-between">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold text-foreground truncate">
                          {group.name}
                        </CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {group.members?.length || 0} members
                        </Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
                        <div className="flex -space-x-2 overflow-hidden">
                          {group.members
                            ?.slice(0, 4)
                            .map((m: any, idx: number) => (
                              <Avatar
                                key={idx}
                                className="inline-block h-6 w-6 border-2 border-background"
                              >
                                <AvatarImage src={m.avatar} alt={m.username} />
                                <AvatarFallback className="text-[10px] bg-muted">
                                  {m.username
                                    ? m.username.substring(0, 2)
                                    : 'M'}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                        </div>
                        <span className="flex items-center gap-1 font-medium text-foreground">
                          Open Group <ChevronRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Recent Transactions Tab */}
        <TabsContent value="expenses" className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Activity Timeline
              </CardTitle>
              <CardDescription>
                Latest expenses and settlement payments across all groups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-14 w-full" />
                  ))}
                </div>
              ) : !summary?.recentExpenses ||
                summary.recentExpenses.length === 0 ? (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No recent expenses recorded.
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {summary.recentExpenses.map((exp: any) => (
                    <div
                      key={exp._id}
                      className="flex items-center justify-between py-3 px-1 first:pt-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground">
                          <Receipt className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
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
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm font-semibold text-foreground">
                          {formatCurrency(exp.totalAmount)}
                        </div>
                        <Badge
                          variant="secondary"
                          className="text-[10px] mt-0.5"
                        >
                          {exp.category || 'General'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateGroupModal
        open={createGroupOpen}
        onOpenChange={setCreateGroupOpen}
        onGroupCreated={fetchSummary}
      />
    </div>
  );
}
