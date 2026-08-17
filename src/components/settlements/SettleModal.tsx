'use client';

import React, { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2, DollarSign } from 'lucide-react';
import { SuggestedSettlement } from '@/lib/financial-engine';

interface SettleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId: string;
  groupMembers: any[];
  suggestedSettlement?: SuggestedSettlement | null;
  onSettlementRecorded?: () => void;
}

export function SettleModal({
  open,
  onOpenChange,
  groupId,
  groupMembers = [],
  suggestedSettlement,
  onSettlementRecorded,
}: SettleModalProps) {
  const [recipientId, setRecipientId] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('Settlement payment');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (suggestedSettlement) {
      setRecipientId(suggestedSettlement.toUserId);
      setAmount(suggestedSettlement.amount.toString());
      setNote(`Settled debt to ${suggestedSettlement.toUsername}`);
    } else if (groupMembers.length > 0 && !recipientId) {
      setRecipientId(
        String(groupMembers[0].userId._id || groupMembers[0].userId)
      );
    }
  }, [suggestedSettlement, groupMembers]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const numAmount = parseFloat(amount);
    if (!groupId) {
      toast.error('Group ID is required');
      return;
    }
    if (!recipientId) {
      toast.error('Please select a recipient');
      return;
    }
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Please enter a valid payment amount');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('/api/settlement/adddsettlement', {
        groupId,
        paidTo: recipientId,
        amount: numAmount,
        note: note.trim(),
      });

      toast.success(res.data.message || 'Settlement recorded');
      onOpenChange(false);
      if (onSettlementRecorded) onSettlementRecorded();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to record settlement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Record Settlement
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Mark a direct cash or transfer payment as completed to settle
            balances.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="recipient">Paid to (Recipient)</Label>
            <Select value={recipientId} onValueChange={setRecipientId}>
              <SelectTrigger id="recipient">
                <SelectValue placeholder="Select member" />
              </SelectTrigger>
              <SelectContent>
                {groupMembers.map((m: any) => {
                  const uId = String(m.userId._id || m.userId);
                  return (
                    <SelectItem key={uId} value={uId}>
                      {m.username || 'Member'}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="settle-amount">Amount ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="settle-amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                className="pl-9 text-lg font-semibold"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="note">Payment Note / Method</Label>
            <Input
              id="note"
              placeholder="e.g. Cash, Bank transfer, Venmo"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
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
              Mark as Paid
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
