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
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Groups", href: "/groups", icon: Users },
  { name: "Expenses", href: "/expenses", icon: Receipt },
  { name: "Balances", href: "/balances", icon: Wallet },
];

const bottomNavigation = [
  { name: "Notifications", href: "/notifications", icon: Bell, badge: 3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 transition-all"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-zinc-950 border-r border-zinc-800/50 z-40 transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "w-20" : "w-72"}`}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 via-transparent to-transparent pointer-events-none" />

        {/* Header */}
        <div className={`relative flex items-center justify-between px-4 py-5 border-b border-zinc-800/50 ${isCollapsed ? "px-3" : "px-6"}`}>
          {!isCollapsed && (
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-white/5 shrink-0">
                <span className="text-black font-bold text-lg">S</span>
              </div>
              <div className="whitespace-nowrap">
                <h1 className="text-white font-bold text-lg tracking-tight">
                  Splitwise
                </h1>
                <p className="text-zinc-500 text-xs">Manage expenses</p>
              </div>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-white/5 mx-auto">
              <span className="text-black font-bold text-lg">S</span>
            </div>
          )}

          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collapse Toggle (Desktop only) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors z-50"
        >
          <PanelLeft className={`w-3 h-3 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} />
        </button>

        {/* Quick Action */}
        <div className={`relative py-4 ${isCollapsed ? "px-2" : "px-4"}`}>
          <button className={`w-full group flex items-center justify-center rounded-xl bg-white text-black font-medium shadow-lg shadow-white/5 hover:shadow-white/10 hover:scale-[1.02] transition-all duration-200 ${isCollapsed ? "p-3" : "px-4 py-3 gap-3"}`}>
            <PlusCircle className="w-5 h-5 shrink-0" />
            {!isCollapsed && (
              <>
                <span className="whitespace-nowrap">Add Expense</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </>
            )}
          </button>
        </div>

        {/* Main Navigation */}
        <nav className={`relative space-y-1 ${isCollapsed ? "px-2" : "px-3"}`}>
          {!isCollapsed && (
            <p className="px-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
              Menu
            </p>
          )}
          {navigation.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`group flex items-center rounded-xl text-sm font-medium transition-all duration-200 ${isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-3"} ${
                  active
                    ? "bg-zinc-800/80 text-white shadow-lg shadow-black/20"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
                }`}
                title={isCollapsed ? link.name : undefined}
              >
                <div
                  className={`rounded-lg transition-colors shrink-0 ${isCollapsed ? "p-0 bg-transparent" : "p-1.5"} ${
                    active && !isCollapsed ? "bg-white/10" : !isCollapsed ? "bg-zinc-800/50 group-hover:bg-zinc-700/50" : ""
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${active ? "text-white" : "text-zinc-400 group-hover:text-zinc-300"}`}
                  />
                </div>
                {!isCollapsed && (
                  <>
                    <span className="whitespace-nowrap">{link.name}</span>
                    {active && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 border-t border-zinc-800/50 bg-zinc-950/50 backdrop-blur-xl ${isCollapsed ? "px-2" : ""}`}>
          <nav className="space-y-1 mb-3">
            {bottomNavigation.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center rounded-xl text-sm font-medium transition-all duration-200 ${isCollapsed ? "justify-center p-3" : "gap-3 px-4 py-2.5"} ${
                    active
                      ? "bg-zinc-800/80 text-white"
                      : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-100"
                  }`}
                  title={isCollapsed ? link.name : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && (
                    <>
                      <span className="whitespace-nowrap">{link.name}</span>
                      {"badge" in link && link.badge && (
                        <span className="ml-auto bg-white text-black text-xs font-bold px-2 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </>
                  )}
                  {isCollapsed && "badge" in link && link.badge && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className={`flex items-center rounded-xl bg-zinc-900/50 border border-zinc-800/50 ${isCollapsed ? "justify-center p-2" : "gap-3 px-3 py-3"}`}>
            <Avatar className={`border-2 border-zinc-800 shrink-0 ${isCollapsed ? "w-10 h-10" : "w-10 h-10"}`}>
              <AvatarFallback className="bg-zinc-800 text-zinc-200 text-sm font-bold">
                JD
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-200 truncate">
                    John Doe
                  </p>
                  <p className="text-xs text-zinc-500 truncate">john@example.com</p>
                </div>
                <button className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}