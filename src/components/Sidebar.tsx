"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import {
  Menu,
  X,
  Home,
  Users,
  User,
  Bell,
  Settings,
  LogOut,
  PlusCircle,
  ChevronRight,
  PanelLeft,
} from "lucide-react";

const navigation = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Groups", href: "/allgroups", icon: Users },
];

const bottomNavigation = [
  { name: "Notifications", href: "/notifications", icon: Bell, badge: 3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();
  const { user } = useAuth();
  const loading = !user;

  const isActive = (href: string) => pathname === href;

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="z-50">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden z-40 fixed top-3 left-4  p-2.5 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden z-50 fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 bg-zinc-950 border-r border-zinc-800/50 z-50
          transform transition-all duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "w-[75px]" : "w-64"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 border-b border-zinc-800/50 px-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              {user?.avatar ? (
                <AvatarImage src={user.avatar} />
              ) : (
                <AvatarFallback>
                  {user?.username ? getInitials(user.username).charAt(0) : "U"}
                </AvatarFallback>
              )}
            </Avatar>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <p className="text-white truncate">
                  {user?.username || "User"}
                </p>
                <p className="text-zinc-500 text-xs truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            )}
          </div>

          {/* Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 items-center justify-center text-zinc-400 hover:text-white"
          >
            <PanelLeft
              className={`${isCollapsed ? "rotate-180" : ""} w-3 h-3`}
            />
          </button>

          {/* Mobile Close */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Add Expense Button */}
        <div className={`relative py-3 ${isCollapsed ? "px-2" : "px-3"}`}>
          <button
            className={`w-full group flex items-center justify-center rounded-lg bg-white text-black font-medium shadow-lg shadow-white/5 hover:shadow-white/10 hover:scale-[1.02] transition-all duration-200 ${
              isCollapsed ? "p-2.5" : "px-4 py-2.5 gap-2"
            }`}
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            {!isCollapsed && (
              <>
                <span className="whitespace-nowrap text-sm font-bold">
                  Add Expense
                </span>
                <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </>
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col mt-2 space-y-1 px-1">
          {navigation.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-2 rounded-lg text-xs font-medium transition-all
                  ${isCollapsed ? "justify-center p-2.5" : "px-3 py-2"}
                  ${active ? "bg-zinc-800/80 text-white" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"}
                `}
                title={isCollapsed ? link.name : undefined}
              >
                <Icon className="w-4 h-4" />
                {!isCollapsed && <span className="truncate">{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-2 border-t border-zinc-800/50 flex items-center gap-2`}
        >
          <Avatar className="w-8 h-8">
            {user?.avatar ? (
              <AvatarImage src={user.avatar} />
            ) : (
              <AvatarFallback>
                {user?.username?.charAt(0) ?? "U"}
              </AvatarFallback>
            )}
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white truncate">{user?.username}</p>
              <p className="text-[10px] text-zinc-500 truncate">
                {user?.email}
              </p>
            </div>
          )}
          {!isCollapsed && (
            <LogOut className="w-4 h-4 text-zinc-400 hover:text-red-400 cursor-pointer" />
          )}
        </div>
      </aside>
    </div>
  );
}
