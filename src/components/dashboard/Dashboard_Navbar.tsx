// components/TopNavbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Settings,
  LogOut,
  PlusCircle,
  LayoutDashboard,
  Users,
  ChevronDown,
  Bell,
} from "lucide-react";

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Groups", href: "/groups", icon: Users },
];

export function TopNavbar() {
  const pathname = usePathname();
  const [notifications] = useState(3);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="  w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
      <div className="w-[85%] mx-auto h-16 flex items-center justify-between">
        {/* Left - Logo & Nav */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
              <span className="text-black font-bold text-lg">S</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">
              Splitwise
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-zinc-800 text-white"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
            <Link
              href="/groups"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              Create Group
            </Link>
          </nav>
        </div>

        {/* Right - Actions & Profile */}
        <div className="flex items-center gap-3">
          {/* Notification */}
          <button className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-white rounded-full" />
            )}
          </button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 p-1.5 pr-3 rounded-full bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <Avatar className="w-8 h-8 border border-zinc-700">
                  <AvatarFallback className="bg-zinc-800 text-white text-sm font-bold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-white hidden sm:block">
                  John Doe
                </span>
                <ChevronDown className="w-4 h-4 text-zinc-500 hidden sm:block" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-zinc-950 border-zinc-800 text-white"
            >
              <div className="px-3 py-2 border-b border-zinc-800">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-zinc-500">john@example.com</p>
              </div>
              <DropdownMenuItem
                asChild
                className="focus:bg-zinc-800 focus:text-white cursor-pointer"
              >
                <Link href="/profile" className="flex items-center gap-2">
                  <User className="w-4 h-4 text-zinc-400" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                asChild
                className="focus:bg-zinc-800 focus:text-white cursor-pointer"
              >
                <Link href="/settings" className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-zinc-400" />
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
