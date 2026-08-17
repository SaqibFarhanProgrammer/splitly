'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Plus, Search, ChevronRight, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CreateGroupModal } from '@/components/groups/CreateGroupModal';
import axios from 'axios';

export default function AllGroupsPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [createGroupOpen, setCreateGroupOpen] = useState(false);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/group/getallgroups');
      setGroups(res.data.data || []);
    } catch (err) {
      console.error('Failed to load groups:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const filteredGroups = groups.filter((g) =>
    g.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
            My Groups
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your shared expense groups and group members.
          </p>
        </div>
        <Button onClick={() => setCreateGroupOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" /> Create Group
        </Button>
      </div>

      {/* Filter / Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Group Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="h-44 border-border">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filteredGroups.length === 0 ? (
        <Card className="border-dashed border-border bg-card p-12 text-center">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Users className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              {searchQuery ? 'No matching groups found' : 'No Groups Available'}
            </h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              {searchQuery
                ? `No group names match "${searchQuery}". Try a different keyword.`
                : 'Create a group to split expenses for trips, housemates, or events.'}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setCreateGroupOpen(true)}
                className="gap-2 mt-2"
              >
                <Plus className="h-4 w-4" /> Create First Group
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => (
            <Link key={group._id} href={`/group/${group._id}`}>
              <Card className="border-border bg-card hover:bg-accent/40 transition-colors cursor-pointer h-full flex flex-col justify-between shadow-xs">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-foreground truncate">
                      {group.name}
                    </CardTitle>
                    <Badge variant="outline">
                      {group.members?.length || 0} members
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-muted-foreground">
                    Created {new Date(group.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between pt-4 border-t border-border/60">
                    <div className="flex -space-x-2 overflow-hidden">
                      {group.members?.slice(0, 5).map((m: any, idx: number) => (
                        <Avatar
                          key={idx}
                          className="inline-block h-7 w-7 border-2 border-background"
                        >
                          <AvatarImage src={m.avatar} alt={m.username} />
                          <AvatarFallback className="text-[10px] bg-muted font-medium">
                            {m.username ? m.username.substring(0, 2) : 'M'}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>

                    <span className="text-xs font-semibold text-foreground flex items-center gap-1">
                      Manage Group <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <CreateGroupModal
        open={createGroupOpen}
        onOpenChange={setCreateGroupOpen}
        onGroupCreated={fetchGroups}
      />
    </div>
  );
}
