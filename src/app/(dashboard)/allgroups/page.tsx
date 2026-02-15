// app/(app)/groups/page.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Users,
  Clock,
  ArrowUpRight,
  MoreVertical,
  Filter,
  Grid3X3,
  List,
} from "lucide-react";
import Link from "next/link";

const groups = [
  {
    id: 1,
    name: "Hunza Trip 2024",
    members: 4,
    totalExpenses: 45800,
    youOwe: 0,
    youAreOwed: 5200,
    status: "active",
    lastActivity: "2 days ago",
    avatar: "H",
    color: "bg-emerald-500/10 text-emerald-400",
  },
  {
    id: 2,
    name: "Office Lunch Group",
    members: 8,
    totalExpenses: 12500,
    youOwe: 1500,
    youAreOwed: 0,
    status: "active",
    lastActivity: "5 hours ago",
    avatar: "O",
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    id: 3,
    name: "Flatmates - Karachi",
    members: 3,
    totalExpenses: 89000,
    youOwe: 4200,
    youAreOwed: 8000,
    status: "active",
    lastActivity: "1 week ago",
    avatar: "F",
    color: "bg-purple-500/10 text-purple-400",
  },
  {
    id: 4,
    name: "College Reunion",
    members: 12,
    totalExpenses: 0,
    youOwe: 0,
    youAreOwed: 0,
    status: "settled",
    lastActivity: "2 months ago",
    avatar: "C",
    color: "bg-zinc-500/10 text-zinc-400",
  },
  {
    id: 5,
    name: "Birthday Party",
    members: 6,
    totalExpenses: 15000,
    youOwe: 2500,
    youAreOwed: 0,
    status: "active",
    lastActivity: "3 days ago",
    avatar: "B",
    color: "bg-pink-500/10 text-pink-400",
  },
  {
    id: 6,
    name: "Road Trip 2023",
    members: 5,
    totalExpenses: 35000,
    youOwe: 0,
    youAreOwed: 1800,
    status: "settled",
    lastActivity: "6 months ago",
    avatar: "R",
    color: "bg-orange-500/10 text-orange-400",
  },
];

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6 mt-15 w-[85vw] mr-20   ] mx-auto ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">All Groups</h1>
          <p className="text-zinc-400 text-sm mt-1">
            {groups.length} groups •{" "}
            {groups.filter((g) => g.status === "active").length} active
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 h-11"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-zinc-800 py-5 mt-0.5 text-zinc-700 hover:text-white hover:bg-zinc-800"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <div className="flex border border-zinc-800 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2.5 ${viewMode === "grid" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"}`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2.5 ${viewMode === "list" ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Groups Grid */}
      {filteredGroups.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-zinc-600" />
          </div>
          <h3 className="text-white font-medium mb-1">No groups found</h3>
          <p className="text-zinc-500 text-sm">Try adjusting your search</p>
        </div>
      ) : (
        <div
          className={`grid gap-4 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="group bg-zinc-950 border border-zinc-800/50 rounded-xl p-5 hover:border-zinc-700 transition-all duration-200 hover:shadow-lg hover:shadow-black/20"
            >
              <Link href={`/group/${group.id}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl ${group.color} flex items-center justify-center font-bold text-lg`}
                    >
                      {group.avatar}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold group-hover:text-zinc-200 transition-colors">
                        {group.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-zinc-500 mt-0.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>{group.members} members</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        group.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border-0"
                          : "bg-zinc-800 text-zinc-400 border-0"
                      }`}
                    >
                      {group.status === "active" ? "Active" : "Settled"}
                    </Badge>
                    <button className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 opacity-0 group-hover:opacity-100 transition-all">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-end justify-between pt-4 border-t border-zinc-800/50">
                  <div>
                    <p className="text-zinc-500 text-xs mb-1">Total Expenses</p>
                    <p className="text-white font-semibold text-lg">
                      ₹{group.totalExpenses.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    {group.youOwe > 0 ? (
                      <p className="text-red-400 text-sm font-medium">
                        You owe ₹{group.youOwe}
                      </p>
                    ) : group.youAreOwed > 0 ? (
                      <p className="text-emerald-400 text-sm font-medium">
                        You are owed ₹{group.youAreOwed}
                      </p>
                    ) : (
                      <p className="text-zinc-500 text-sm font-medium">
                        All settled
                      </p>
                    )}
                    <div className="flex items-center gap-1 text-zinc-600 text-xs mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{group.lastActivity}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
