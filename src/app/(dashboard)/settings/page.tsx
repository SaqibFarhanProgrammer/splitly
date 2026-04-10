'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Save, Lock, Trash2, User, Mail } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import axios from 'axios';
import { toast } from 'sonner';
import bcrypt from 'bcryptjs';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthContext } from '@/context/AuthContext';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useAuthContext();


  const profileForm = useForm({
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
    },
  });

  const accountForm = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Demo hashed password (frontend comparison). Replace with secure backend check in prod
  const userPasswordHash =
    '$2a$10$CwTycUXWue0Thq9StjUM0uJ8s6e5Io1oMqVhU9A3G4jOzN6kA4qG6'; // hash of 'password123'

  const handleProfileSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const res = await axios.post('/api/users/updateProfile', {
        username: data.username,
        email: data.email,
      });

      toast.success(res.data.message || 'Profile updated');
    } catch (error: any) {
      const message = error?.response?.data?.error || 'Something went wrong';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (data: any) => {
    // Frontend bcrypt check
    const isMatch = await bcrypt.compare(
      data.currentPassword,
      userPasswordHash
    );

    if (!isMatch) {
      toast.error('Current password is incorrect');
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      toast.error('New password and confirm password do not match');
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        '/api/users/updatePassword',
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message || 'Password updated');
      accountForm.reset();
    } catch (error: any) {
      const message = error?.response?.data?.error || 'Something went wrong';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4 mt-10">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-zinc-400">Manage your account preferences</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-zinc-950 border border-white/10 p-1 mb-8 w-full justify-start">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400"
            >
              <Lock className="w-4 h-4 mr-2" />
              Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Profile Information
              </h2>

              <div className="flex items-center gap-6 mb-8">
                <Avatar className="w-24 h-24 border-2 border-white/10">
                  <AvatarImage src={user?.avatar} className="object-cover" />
                  <AvatarFallback className="bg-white text-black text-3xl font-bold">
                    {user?.username?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <form
                onSubmit={profileForm.handleSubmit(handleProfileSubmit)}
                className="space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  {user?.username ? (
                    <div className="space-y-2">
                      <Label className="text-white">Username</Label>
                      <Input
                        {...profileForm.register('username', {
                          required: true,
                        })}
                        className="bg-zinc-900 border-white/10 text-white h-11"
                      />
                    </div>
                  ) : (
                    <Skeleton className="h-10 w-150 bg-zinc-700" />
                  )}
                </div>

                {user?.email ? (
                  <div className="space-y-2">
                    <Label className="text-white">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <Input
                        {...profileForm.register('email', { required: true })}
                        type="email"
                        className="pl-10 bg-zinc-900 border-white/10 text-white h-11"
                      />
                    </div>
                  </div>
                ) : (
                  <Skeleton className="h-10 w-200 bg-zinc-700" />
                )}

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="bg-white text-black hover:bg-zinc-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Change Password
              </h2>

              <form
                onSubmit={accountForm.handleSubmit(handlePasswordSubmit)}
                className="space-y-5 max-w-md"
              >
                <div className="space-y-2">
                  <Label className="text-white">Current Password</Label>
                  <Input
                    {...accountForm.register('currentPassword', {
                      required: true,
                    })}
                    type="password"
                    className="bg-zinc-900 border-white/10 text-white h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">New Password</Label>
                  <Input
                    {...accountForm.register('newPassword', {
                      required: true,
                      minLength: 6,
                    })}
                    type="password"
                    className="bg-zinc-900 border-white/10 text-white h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Confirm New Password</Label>
                  <Input
                    {...accountForm.register('confirmPassword', {
                      required: true,
                    })}
                    type="password"
                    className="bg-zinc-900 border-white/10 text-white h-11"
                  />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    className="bg-white text-black hover:bg-zinc-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Lock className="w-4 h-4 mr-2" />
                    )}
                    Update Password
                  </Button>
                </div>
              </form>
            </div>

            <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Danger Zone</h2>
              <p className="text-zinc-400 mb-4">
                Once you delete your account, there is no going back.
              </p>
              <Button
                variant="destructive"
                className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
