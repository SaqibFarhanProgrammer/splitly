'use client';

import React, { useEffect, useState } from 'react';
import { User, Mail, Calendar, Users, Shield } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import axios from 'axios';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        const res = await axios.get('/api/auth/me');
        setUser(res.data.user);
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="border-b border-border pb-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
          User Profile
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Your personal account information and active settings.
        </p>
      </div>

      {loading ? (
        <Card className="border-border p-6 space-y-4">
          <Skeleton className="h-20 w-20 rounded-full" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </Card>
      ) : (
        <Card className="border-border bg-card shadow-xs">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-border">
                <AvatarImage src={user?.avatar} alt={user?.username} />
                <AvatarFallback className="text-xl bg-muted font-bold">
                  {user?.username
                    ? user.username.substring(0, 2).toUpperCase()
                    : 'U'}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {user?.username}
                  </h3>
                  <Badge variant="outline">Member</Badge>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> {user?.email}
                </p>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" /> Joined{' '}
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : 'Recently'}
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
