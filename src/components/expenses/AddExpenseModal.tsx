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
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import axios from 'axios';
import { Loader2, DollarSign, Tag, Users, Check } from 'lucide-react';
import { roundCurrency } from '@/lib/financial-engine';

interface AddExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: any[];
  defaultGroupId?: string;
  currentUser?: any;
  onExpenseAdded?: () => void;
}

const CATEGORIES = [
  { label: 'General', value: 'General' },
  { label: 'Food & Dining', value: 'Food' },
  { label: 'Transport', value: 'Transport' },
  { label: 'Accommodation', value: 'Accommodation' },
  { label: 'Utilities & Bills', value: 'Utilities' },
  { label: 'Shopping', value: 'Shopping' },
  { label: 'Entertainment', value: 'Entertainment' },
];

export function AddExpenseModal({
  open,
  onOpenChange,
  groups = [],
  defaultGroupId,
  currentUser,
  onExpenseAdded,
}: AddExpenseModalProps) {
  const [selectedGroupId, setSelectedGroupId] = useState(defaultGroupId || '');
  const [title, setTitle] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [category, setCategory] = useState('General');
  const [splitType, setSplitType] = useState<'EQUAL' | 'EXACT' | 'PERCENTAGE'>(
    'EQUAL'
  );
  const [loading, setLoading] = useState(false);
  const [groupMembers, setGroupMembers] = useState<any[]>([]);

  // Track custom split values: record of userId -> amount or percentage string
  const [customSplits, setCustomSplits] = useState<Record<string, string>>({});
  // Selected participant userIds for equal split
  const [selectedParticipantIds, setSelectedParticipantIds] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (defaultGroupId) {
      setSelectedGroupId(defaultGroupId);
    } else if (groups.length > 0 && !selectedGroupId) {
      setSelectedGroupId(groups[0]._id);
    }
  }, [defaultGroupId, groups]);

  useEffect(() => {
    if (selectedGroupId && groups.length > 0) {
      const selectedG = groups.find((g) => g._id === selectedGroupId);
      if (selectedG && selectedG.members) {
        setGroupMembers(selectedG.members);
        const allIds = selectedG.members.map((m: any) =>
          String(m.userId._id || m.userId)
        );
        setSelectedParticipantIds(allIds);

        // Reset custom splits
        const initialCustom: Record<string, string> = {};
        for (const id of allIds) {
          initialCustom[id] = '';
        }
        setCustomSplits(initialCustom);
      }
    }
  }, [selectedGroupId, groups]);

  const numAmount = parseFloat(totalAmount) || 0;

  const toggleParticipant = (id: string) => {
    if (selectedParticipantIds.includes(id)) {
      if (selectedParticipantIds.length > 1) {
        setSelectedParticipantIds(
          selectedParticipantIds.filter((p) => p !== id)
        );
      } else {
        toast.error('At least one participant must be included');
      }
    } else {
      setSelectedParticipantIds([...selectedParticipantIds, id]);
    }
  };

  const handleCustomSplitChange = (userId: string, val: string) => {
    setCustomSplits((prev) => ({ ...prev, [userId]: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedGroupId) {
      toast.error('Please select a group');
      return;
    }
    if (!title.trim()) {
      toast.error('Please enter an expense title');
      return;
    }
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error('Please enter a valid total amount greater than zero');
      return;
    }

    let computedSplits: Array<{
      userId: string;
      amount: number;
      percentage?: number;
    }> = [];

    if (splitType === 'EQUAL') {
      const count = selectedParticipantIds.length || 1;
      const share = roundCurrency(numAmount / count);
      computedSplits = selectedParticipantIds.map((id) => ({
        userId: id,
        amount: share,
        percentage: roundCurrency(100 / count),
      }));
    } else if (splitType === 'EXACT') {
      let sum = 0;
      for (const m of groupMembers) {
        const uId = String(m.userId._id || m.userId);
        const val = parseFloat(customSplits[uId] || '0') || 0;
        sum += val;
        computedSplits.push({ userId: uId, amount: roundCurrency(val) });
      }
      if (Math.abs(sum - numAmount) > 0.05) {
        toast.error(
          `Split amounts sum to $${sum.toFixed(2)}, which does not match total $${numAmount.toFixed(2)}`
        );
        return;
      }
    } else if (splitType === 'PERCENTAGE') {
      let pctSum = 0;
      for (const m of groupMembers) {
        const uId = String(m.userId._id || m.userId);
        const pct = parseFloat(customSplits[uId] || '0') || 0;
        pctSum += pct;
        const calculatedAmount = roundCurrency((numAmount * pct) / 100);
        computedSplits.push({
          userId: uId,
          amount: calculatedAmount,
          percentage: pct,
        });
      }
      if (Math.abs(pctSum - 100) > 0.5) {
        toast.error(
          `Split percentages sum to ${pctSum.toFixed(1)}%, which must equal 100%`
        );
        return;
      }
    }

    try {
      setLoading(true);
      const res = await axios.post('/api/expense/addexpense', {
        groupId: selectedGroupId,
        title: title.trim(),
        totalAmount: numAmount,
        category,
        splitType,
        splits: computedSplits,
      });

      toast.success(res.data.message || 'Expense added successfully');
      setTitle('');
      setTotalAmount('');
      onOpenChange(false);
      if (onExpenseAdded) onExpenseAdded();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Failed to add expense');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Add Expense</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Record a shared expense and split costs across group members.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          {/* Group Select */}
          <div className="space-y-1.5">
            <Label htmlFor="group-select">Select Group</Label>
            <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
              <SelectTrigger id="group-select">
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                {groups.map((g) => (
                  <SelectItem key={g._id} value={g._id}>
                    {g.name} ({g.members?.length || 0} members)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title and Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="title">Description / Title</Label>
              <Input
                id="title"
                placeholder="e.g. Dinner, Groceries, Hotel"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-1.5">
            <Label htmlFor="total-amount">Total Amount ($)</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="total-amount"
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0.00"
                className="pl-9 text-lg font-semibold"
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Split Type Selector */}
          <div className="space-y-2 pt-1">
            <Label>Split Method</Label>
            <Tabs
              value={splitType}
              onValueChange={(val) => setSplitType(val as any)}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="EQUAL">Split Equally</TabsTrigger>
                <TabsTrigger value="EXACT">Exact Amounts</TabsTrigger>
                <TabsTrigger value="PERCENTAGE">Percentages</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Participant Split Breakdown */}
          {groupMembers.length > 0 && (
            <div className="space-y-2 border border-border rounded-lg p-3 bg-muted/30">
              <div className="flex items-center justify-between text-xs font-medium text-muted-foreground mb-1">
                <span>Split details</span>
                {splitType === 'EQUAL' && (
                  <span>
                    $
                    {numAmount > 0 && selectedParticipantIds.length > 0
                      ? roundCurrency(
                          numAmount / selectedParticipantIds.length
                        ).toFixed(2)
                      : '0.00'}{' '}
                    / person
                  </span>
                )}
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {groupMembers.map((m: any) => {
                  const uId = String(m.userId._id || m.userId);
                  const isChecked = selectedParticipantIds.includes(uId);

                  return (
                    <div
                      key={uId}
                      className="flex items-center justify-between gap-2 p-2 rounded-md bg-background border border-border"
                    >
                      <div
                        className="flex items-center gap-2 cursor-pointer flex-1"
                        onClick={() =>
                          splitType === 'EQUAL' && toggleParticipant(uId)
                        }
                      >
                        {splitType === 'EQUAL' && (
                          <div
                            className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'bg-primary border-primary text-primary-foreground'
                                : 'border-input'
                            }`}
                          >
                            {isChecked && <Check className="h-3 w-3" />}
                          </div>
                        )}
                        <span className="text-sm font-medium text-foreground">
                          {m.username || 'Member'}
                        </span>
                      </div>

                      {splitType === 'EXACT' && (
                        <div className="w-28 relative">
                          <span className="absolute left-2.5 top-2 text-xs text-muted-foreground">
                            $
                          </span>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="h-8 pl-6 text-xs"
                            value={customSplits[uId] || ''}
                            onChange={(e) =>
                              handleCustomSplitChange(uId, e.target.value)
                            }
                          />
                        </div>
                      )}

                      {splitType === 'PERCENTAGE' && (
                        <div className="w-28 relative">
                          <span className="absolute right-2.5 top-2 text-xs text-muted-foreground">
                            %
                          </span>
                          <Input
                            type="number"
                            step="1"
                            placeholder="0"
                            className="h-8 pr-6 text-xs"
                            value={customSplits[uId] || ''}
                            onChange={(e) =>
                              handleCustomSplitChange(uId, e.target.value)
                            }
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
              Save Expense
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
