'use client';

import { AppShell } from '@/components/shell/AppShell';
import { ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { AddExpenseModal } from '@/components/expenses/AddExpenseModal';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    async function fetchUserAndGroups() {
      try {
        const [meRes, groupsRes] = await Promise.all([
          axios.get('/api/auth/me').catch(() => null),
          axios.get('/api/group/getallgroups').catch(() => null),
        ]);

        if (meRes?.data?.user) {
          setUser(meRes.data.user);
        }
        if (groupsRes?.data?.data) {
          setGroups(groupsRes.data.data);
        }
      } catch (err) {
        console.error('Failed to load user session layout:', err);
      }
    }
    fetchUserAndGroups();
  }, []);

  return (
    <AppShell user={user} onOpenAddExpense={() => setAddExpenseOpen(true)}>
      {children}
      <AddExpenseModal
        open={addExpenseOpen}
        onOpenChange={setAddExpenseOpen}
        groups={groups}
        currentUser={user}
        onExpenseAdded={() => {
          setAddExpenseOpen(false);
          window.location.reload();
        }}
      />
    </AppShell>
  );
}
