'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Receipt, Plus, Clock } from 'lucide-react';

import GroupsList from '@/components/dashboard/group/GroupsList';
import { Group, User } from '@/types/globalTypes';
import { ProfileProvider } from '@/context/Profile.Context';

import ProfileHeader from '@/components/dashboard/profile/ProfileHeader';
import { UploadImageModal } from '@/components/dashboard/profile/UploadProfileImage';
import { CreateGroupModal } from '@/components/CreateGroup';
import { AddExpenseModal } from '@/components/AddExpenseModal';

export interface ExpenseType {
  _id: string;
  title: string;
  totalAmount: number;
  groupId: string;
  paidBy: string;
  paidmemberUsername: string;
  paidmemberAvatar: string;
  createdAt: string | Date;
  updatedAt: string;
  __v: number;
}

export default function Page() {
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const [loading, setLoading] = useState(true);

  const [groupData, setGroupData] = useState<Group[]>([]);
  const [expenseData, setExpenseData] = useState<ExpenseType[]>([]);
  const [userData, setUserData] = useState<User | null>(null);

  const handleAddExpense = async () => {};

  async function GetUser() {
    try {
      const res = await axios.get('/api/users/me');
      if (res.status === 200) setUserData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function GetAllGroups() {
    try {
      const res = await axios.get('/api/group/getallgroups');
      if (res.status === 200) setGroupData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function GetAllExpenses() {
    try {
      const res = await axios.get('/api/expense/getall');
      if (res.status === 200) setExpenseData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([GetUser(), GetAllGroups(), GetAllExpenses()]);
      setLoading(false);
    };

    init();
  }, []);

  return (
    <section className="min-h-screen mt-10 py-14 px-6 text-white">
      <div className="max-w-6xl mx-auto">
        <ProfileProvider>
          <ProfileHeader
            userData={userData}
            setIsCreateGroupOpen={setIsCreateGroupOpen}
          />
          <UploadImageModal />
        </ProfileProvider>

        <Tabs defaultValue="groups" className="w-full">
          <TabsList className="bg-zinc-950 border border-white/10 p-1 mb-8">
            <TabsTrigger value="groups">
              <Users className="w-4 h-4 mr-2" />
              My Groups
            </TabsTrigger>

            <TabsTrigger value="expenses">
              <Receipt className="w-4 h-4 mr-2" />
              Recent Expenses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="groups" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Groups</h2>

              <Button onClick={() => setIsCreateGroupOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </div>

            <GroupsList
              expenses={expenseData}
              loading={loading}
              groupData={groupData}
            />
          </TabsContent>

          <TabsContent value="expenses">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Recent Expenses</h2>

              <Button onClick={() => setIsAddExpenseOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </div>

            <Card className="bg-zinc-950 border-white/10">
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
                <CardDescription>
                  Latest transactions across groups
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="flex justify-between p-4 bg-white/5 rounded-xl"
                      >
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <Skeleton className="w-40 h-4" />
                        <Skeleton className="w-20 h-4" />
                      </div>
                    ))
                  : expenseData.map((expense) => (
                      <div
                        key={expense._id}
                        className="flex justify-between items-center p-4 bg-white/5 rounded-xl"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={expense.paidmemberAvatar}
                            className="w-10 h-10 rounded-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                'https://via.placeholder.com/40';
                            }}
                          />

                          <div>
                            <h4 className="font-medium">{expense.title}</h4>
                            <p className="text-xs text-gray-400">
                              @{expense.paidmemberUsername} •{' '}
                              {expense.groupId.slice(0, 6)}
                            </p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="font-bold">
                            Rs {expense.totalAmount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(expense.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <CreateGroupModal
          isOpen={isCreateGroupOpen}
          onClose={() => setIsCreateGroupOpen(false)}
          onGroupCreated={(newGroup: any) =>
            setGroupData((prev) => [...prev, newGroup])
          }
        />

        <AddExpenseModal
          isOpen={isAddExpenseOpen}
          onClose={() => setIsAddExpenseOpen(false)}
          onSubmit={handleAddExpense}
        />
      </div>
    </section>
  );
}
