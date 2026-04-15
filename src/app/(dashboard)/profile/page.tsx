'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Plus } from 'lucide-react';

import { Group, User } from '@/types/globalTypes';
import { ProfileProvider } from '@/context/Profile.Context';

import ProfileHeader from '@/components/dashboard/profile/ProfileHeader';
import { UploadImageModal } from '@/components/dashboard/profile/UploadProfileImage';
import { CreateGroupModal } from '@/components/CreateGroup';
import { AddExpenseModal } from '@/components/AddExpenseModal';
import GroupsList from '@/components/dashboard/group/GroupsList';
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
    setLoading(true);

    try {
      const res = await axios.get('/api/group/getallgroups');

      const groups = res?.data?.data;

      if (Array.isArray(groups)) {
        setGroupData(groups);
      } else {
        setGroupData([]);
      }
    } catch (err) {
      console.log(err);
      setGroupData([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetAllGroups();
    GetUser();
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
          </TabsList>

          <TabsContent value="groups" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Groups</h2>

              <Button onClick={() => setIsCreateGroupOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </div>

            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i} className="bg-zinc-950 border-white/10">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full bg-zinc-800" />
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-32 bg-zinc-800" />
                          <Skeleton className="h-3 w-20 bg-zinc-800" />
                        </div>
                      </div>
                      <Skeleton className="h-5 w-16 bg-zinc-800 rounded-full" />
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <GroupsList loading={loading} groupData={groupData} />
            )}
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
