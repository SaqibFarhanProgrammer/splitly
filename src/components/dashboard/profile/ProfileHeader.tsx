import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Settings, Plus, Edit, Edit2Icon } from "lucide-react";
import React from "react";
import { useAuth } from "@/context/AuthContext";

interface ProfileHeaderProps {
  setIsCreateGroupOpen: (open: boolean) => void;
}

function ProfileHeader({ setIsCreateGroupOpen }: ProfileHeaderProps) {
  const { user, loading } = useAuth();

  console.log("usere", user);


  // User ke initials nikaalne ke liye
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Join date format karne ke liye
  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  // Loading skeleton layout - exact same structure
  if (loading) {
    return (
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <Skeleton className="w-20 h-20 rounded-full bg-zinc-800" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-52 bg-zinc-800" />
            <Skeleton className="h-4 w-48 bg-zinc-800" />
            <Skeleton className="h-5 w-24 bg-zinc-800 mt-2" />
          </div>
        </div>

        <div className="flex gap-3">
          <Skeleton className="h-9 w-28 bg-zinc-800" />
          <Skeleton className="h-9 w-28 bg-zinc-800" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
      <div className="flex items-center gap-4">
        <Avatar className="w-20 h-20 border-2 border-white/10">
          <AvatarImage src={user?.avatar || ""} />
          <AvatarFallback className="bg-white text-black text-2xl font-bold">
            {user?.username ? getInitials(user.username) : "U"}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold mb-1">
            {user?.username || "User"}
          </h1>
          <p className="text-zinc-400">{user?.email || "user@example.com"}</p>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className="border-white/20 text-zinc-400">
              Since {user?.createdAt ? formatJoinDate(user.createdAt) : "2023"}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" className="text-black">
          <Edit2Icon className="w-4 h-4 mr-2 text-neutral-900" />
          Edit Profile
        </Button>
        <Button onClick={() => setIsCreateGroupOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Group
        </Button>
      </div>
    </div>
  );
}

export default ProfileHeader;
