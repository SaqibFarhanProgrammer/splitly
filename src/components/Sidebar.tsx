// components/Sidebar.tsx
"use client";

import { useSidebar } from "@/context/SidebarContext";
import {
  Menu,
  X,
  Home,
  Users,
  Receipt,
  Wallet,
  Settings,
  LogOut,
  PlusCircle,
  ChevronRight,
  Bell,
  PanelLeft,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

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
  const loading = false; // user is undefined while loading, null if no user, object if logged in
  const isActive = (href: string) => pathname === href;

  // User initials nikaalne ke liye
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="z-20">
      {/* Mobile Menu Button - Perfect positioning */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2.5 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 bg-zinc-950 border-r border-zinc-800/50 z-50 transform transition-all duration-300 ease-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-[72px]" : "w-64"}`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-transparent to-transparent pointer-events-none" />

        {/* Header */}
        <div
          className={`relative flex items-center justify-between border-b border-zinc-800/50 h-16 ${isCollapsed ? "px-3" : "px-5"}`}
        >
          {!isCollapsed && !loading && (
            <div className="flex items-center gap-2.5 overflow-hidden">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.username || "User"}
                  className="w-8 h-8 rounded-lg object-cover shrink-0 shadow-lg shadow-white/5"
                />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-lg shadow-white/5 shrink-0">
                  <span className="text-black font-bold text-base font-['inter-bold']">
                    {user?.username
                      ? getInitials(user.username).charAt(0)
                      : "U"}
                  </span>
                </div>
              )}
              <div className="whitespace-nowrap">
                <h1 className="text-white font-bold text-base tracking-tight font-['inter-bold']">
                  {user?.username}
                </h1>
                <p className="text-zinc-500 text-[10px] leading-tight font-['inter-beta']">
                  {user?.email}
                </p>
              </div>
            </div>
          )}

          {!isCollapsed && loading && (
            <div className="flex items-center gap-2.5">
              <Skeleton className="w-8 h-8 rounded-lg bg-zinc-800" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-24 bg-zinc-800" />
                <Skeleton className="h-2 w-20 bg-zinc-800" />
              </div>
            </div>
          )}

          {isCollapsed && (
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-lg shadow-white/5 mx-auto overflow-hidden">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user?.username || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-black font-bold text-base font-['inter-bold']">
                  {user?.username ? getInitials(user.username).charAt(0) : "U"}
                </span>
              )}
            </div>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collapse Toggle - Desktop only */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors z-50 shadow-lg"
        >
          <PanelLeft
            className={`w-3 h-3 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
          />
        </button>

        {/* Add Expense Button */}
        <div className={`relative py-3 ${isCollapsed ? "px-2" : "px-3"}`}>
          <button
            className={`w-full group flex items-center justify-center rounded-lg bg-white text-black font-medium shadow-lg shadow-white/5 hover:shadow-white/10 hover:scale-[1.02] transition-all duration-200 ${isCollapsed ? "p-2.5" : "px-4 py-2.5 gap-2"}`}
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            {!isCollapsed && (
              <>
                <span className="whitespace-nowrap text-sm font-['inter-bold']">
                  Add Expense
                </span>
                <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </>
            )}
          </button>
        </div>

        {/* Main Navigation */}
        <nav
          className={`relative space-y-0.5 ${isCollapsed ? "px-2" : "px-3"}`}
        >
          {!isCollapsed && !loading && (
            <p className="px-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2 font-['inter-bold']">
              Menu
            </p>
          )}

          {loading && !isCollapsed && (
            <div className="px-3 mb-2">
              <Skeleton className="h-2 w-12 bg-zinc-800" />
            </div>
          )}

          {loading
            ? // Skeleton Navigation Items
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex items-center rounded-lg ${isCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2"}`}
                >
                  <Skeleton
                    className={`${isCollapsed ? "w-5 h-5" : "w-6 h-6"} rounded-md bg-zinc-800`}
                  />
                  {!isCollapsed && (
                    <Skeleton className="h-3 w-20 bg-zinc-800" />
                  )}
                </div>
              ))
            : // Actual Navigation
              navigation.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center rounded-lg text-xs font-medium transition-all duration-200 ${isCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2"} ${
                      active
                        ? "bg-zinc-800/80 text-white shadow-lg shadow-black/20"
                        : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
                    }`}
                    title={isCollapsed ? link.name : undefined}
                  >
                    <div
                      className={`rounded-md transition-colors shrink-0 ${isCollapsed ? "p-0 bg-transparent" : "p-1"} ${
                        active && !isCollapsed
                          ? "bg-white/10"
                          : !isCollapsed
                            ? "bg-zinc-800/50 group-hover:bg-zinc-700/50"
                            : ""
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${active ? "text-white" : "text-zinc-400 group-hover:text-zinc-300"}`}
                      />
                    </div>
                    {!isCollapsed && (
                      <>
                        <span className="whitespace-nowrap font-['inter-beta']">
                          {link.name}
                        </span>
                        {active && (
                          <div className="ml-auto w-1 h-1 rounded-full bg-white" />
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
        </nav>

        {/* Bottom Section */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-2 border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl ${isCollapsed ? "px-2" : ""}`}
        >
          <nav className="space-y-0.5 mb-2">
            {loading && !isCollapsed
              ? // Bottom Nav Skeleton
                Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2">
                    <Skeleton className="w-4 h-4 bg-zinc-800" />
                    <Skeleton className="h-3 w-24 bg-zinc-800" />
                  </div>
                ))
              : bottomNavigation.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center rounded-lg text-xs font-medium transition-all duration-200 ${isCollapsed ? "justify-center p-2.5" : "gap-3 px-3 py-2"} ${
                        active
                          ? "bg-zinc-800/80 text-white"
                          : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
                      }`}
                      title={isCollapsed ? link.name : undefined}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {!isCollapsed && (
                        <>
                          <span className="whitespace-nowrap font-['inter-beta']">
                            {link.name}
                          </span>
                          {"badge" in link && link.badge && (
                            <span className="ml-auto bg-white text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full font-['inter-bold']">
                              {link.badge}
                            </span>
                          )}
                        </>
                      )}
                      {isCollapsed && "badge" in link && link.badge && (
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full" />
                      )}
                    </Link>
                  );
                })}
          </nav>

          {/* User Profile Section */}
          <div
            className={`flex items-center rounded-lg bg-zinc-900/50 border border-zinc-800/50 ${isCollapsed ? "justify-center p-1.5" : "gap-3 px-2.5 py-2"}`}
          >
            {loading ? (
              // User Skeleton
              <>
                <Skeleton
                  className={`rounded-full bg-zinc-800 ${isCollapsed ? "w-8 h-8" : "w-8 h-8"}`}
                />
                {!isCollapsed && (
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3 w-20 bg-zinc-800" />
                    <Skeleton className="h-2 w-24 bg-zinc-800" />
                  </div>
                )}
              </>
            ) : (
              // Actual User
              <>
                {!isCollapsed && (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-zinc-200 truncate font-['inter-bold']">
                        {user?.username || "User"}
                      </p>
                      <p className="text-[10px] text-zinc-500 truncate font-['inter-beta']">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                    <button className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
