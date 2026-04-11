'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Group } from '@/types/globalTypes';

type GroupContextType = {
  groups: Group[];
};

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export function GroupProvider({
  children,
  groupsPromise,
}: {
  children: React.ReactNode;
  groupsPromise?: Promise<Group[]>;
}) {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    if (groupsPromise) {
      groupsPromise
        .then((data) => setGroups(data || []))
        .catch((err) => console.error(err));
    }
  }, [groupsPromise]);

  return (
    <GroupContext.Provider value={{ groups }}>{children}</GroupContext.Provider>
  );
}

export function useGroupContext() {
  const context = useContext(GroupContext);
  if (!context) {
    return { groups: [] };
  }
  return context;
}
