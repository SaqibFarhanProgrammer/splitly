"use client";

import { createContext, useContext, ReactNode } from "react";
import mongoose from "mongoose";

// -------------------- Types --------------------

interface IMember {
  userId?: string;
  username: string;
  avatar?: string;
  isAdmin?: boolean;
}

export interface Group {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  members: IMember[];
  totalAmount: number;
  isActive: boolean;
}

export interface GroupContextType {
  groups: Group[];
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);
export const GroupProvider = ({
  children,
  groups,
}: {
  children: ReactNode;
  groups: Group[];
}) => {
  return (
    <GroupContext.Provider value={{ groups }}>{children}</GroupContext.Provider>
  );
};

export const useGroupContext = () => {
  const context = useContext(GroupContext);
  if (!context)
    throw new Error("useGroupContext must be used within GroupProvider");
  return context;
};
