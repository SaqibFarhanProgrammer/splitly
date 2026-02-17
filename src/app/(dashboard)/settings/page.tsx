// app/settings/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Lock, 
  Bell, 
  Shield, 
  Mail, 
  Camera,
  Loader2,
  Save,
  Trash2
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Profile Form
  const profileForm = useForm({
    defaultValues: {
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com",
      bio: "Software Developer",
    },
  });

  // Account Form
  const accountForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Notification Settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    expenses: true,
    groups: true,
    marketing: false,
  });

  const handleProfileSubmit = async (data: any) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Profile updated:", data);
    setIsLoading(false);
  };

  const handlePasswordSubmit = async (data: any) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Password changed:", data);
    setIsLoading(false);
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
            <TabsTrigger 
              value="notifications" 
              className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="data-[state=active]:bg-white data-[state=active]:text-black text-zinc-400"
            >
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Profile Information</h2>
              
              {/* Avatar Section */}
              <div className="flex items-center gap-6 mb-8">
                <Avatar className="w-24 h-24 border-2 border-white/10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-white text-black text-3xl font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 mb-2">
                    <Camera className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-zinc-500">JPG, PNG. Max 2MB</p>
                </div>
              </div>

              <form onSubmit={profileForm.handleSubmit(handleProfileSubmit)} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-white">Full Name</Label>
                    <Input
                      {...profileForm.register("name", { required: true })}
                      className="bg-zinc-900 border-white/10 text-white h-11"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Username</Label>
                    <Input
                      {...profileForm.register("username", { required: true })}
                      className="bg-zinc-900 border-white/10 text-white h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                      {...profileForm.register("email", { required: true })}
                      type="email"
                      className="pl-10 bg-zinc-900 border-white/10 text-white h-11"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Bio</Label>
                  <textarea
                    {...profileForm.register("bio")}
                    rows={3}
                    className="w-full bg-zinc-900 border border-white/10 rounded-lg p-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/20 resize-none"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    className="bg-white text-black hover:bg-zinc-200"
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6">
            <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Change Password</h2>
              
              <form onSubmit={accountForm.handleSubmit(handlePasswordSubmit)} className="space-y-5 max-w-md">
                <div className="space-y-2">
                  <Label className="text-white">Current Password</Label>
                  <Input
                    {...accountForm.register("currentPassword", { required: true })}
                    type="password"
                    className="bg-zinc-900 border-white/10 text-white h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">New Password</Label>
                  <Input
                    {...accountForm.register("newPassword", { required: true, minLength: 6 })}
                    type="password"
                    className="bg-zinc-900 border-white/10 text-white h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Confirm New Password</Label>
                  <Input
                    {...accountForm.register("confirmPassword", { required: true })}
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
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
                    Update Password
                  </Button>
                </div>
              </form>
            </div>

            <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">Danger Zone</h2>
              <p className="text-zinc-400 mb-4">Once you delete your account, there is no going back.</p>
              <Button variant="destructive" className="bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Notification Preferences</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Email Notifications</h3>
                    <p className="text-sm text-zinc-500">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    className="data-[state=checked]:bg-white"
                  />
                </div>

                <Separator className="bg-white/10" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Push Notifications</h3>
                    <p className="text-sm text-zinc-500">Receive push notifications</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) => setNotifications({...notifications, push: checked})}
                    className="data-[state=checked]:bg-white"
                  />
                </div>

                <Separator className="bg-white/10" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Expense Updates</h3>
                    <p className="text-sm text-zinc-500">Get notified about new expenses</p>
                  </div>
                  <Switch
                    checked={notifications.expenses}
                    onCheckedChange={(checked) => setNotifications({...notifications, expenses: checked})}
                    className="data-[state=checked]:bg-white"
                  />
                </div>

                <Separator className="bg-white/10" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Group Activity</h3>
                    <p className="text-sm text-zinc-500">Notifications about group changes</p>
                  </div>
                  <Switch
                    checked={notifications.groups}
                    onCheckedChange={(checked) => setNotifications({...notifications, groups: checked})}
                    className="data-[state=checked]:bg-white"
                  />
                </div>

                <Separator className="bg-white/10" />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Marketing Emails</h3>
                    <p className="text-sm text-zinc-500">Receive promotional content</p>
                  </div>
                  <Switch
                    checked={notifications.marketing}
                    onCheckedChange={(checked) => setNotifications({...notifications, marketing: checked})}
                    className="data-[state=checked]:bg-white"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="bg-zinc-950 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-zinc-500">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                    Enable
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Active Sessions</h3>
                    <p className="text-sm text-zinc-500">Manage your active devices</p>
                  </div>
                  <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                    View
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Login History</h3>
                    <p className="text-sm text-zinc-500">Check recent login activity</p>
                  </div>
                  <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                    View
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}