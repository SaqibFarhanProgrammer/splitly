'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2, Users } from 'lucide-react';

interface CreateGroupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGroupCreated?: () => void;
}

export function CreateGroupModal({
  open,
  onOpenChange,
  onGroupCreated,
}: CreateGroupModalProps) {
  const [name, setName] = useState('');
  const [membersInput, setMembersInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Group name is required');
      return;
    }

    const memberList = membersInput
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    try {
      setLoading(true);
      const res = await axios.post('/api/group/create', {
        name: name.trim(),
        members: memberList,
      });

      toast.success(res.data.message || 'Group created successfully');
      setName('');
      setMembersInput('');
      onOpenChange(false);
      if (onGroupCreated) onGroupCreated();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Users className="h-5 w-5" /> Create New Group
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Group friends, roommates, or trip companions to share and split
            expenses.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="group-name">Group Name</Label>
            <Input
              id="group-name"
              placeholder="e.g. Paris Trip, Apartment 4B, Friday Night Dinner"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="members-input">Invite Members (Optional)</Label>
            <Input
              id="members-input"
              placeholder="Usernames or emails (comma-separated)"
              value={membersInput}
              onChange={(e) => setMembersInput(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              You can also add members later from the group settings.
            </p>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="gap-1.5">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Create Group
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
