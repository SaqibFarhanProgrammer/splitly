"use client";
import React, { createContext, useContext, useState } from "react";
  
export interface Expense {
  _id: string
  title: string
  totalAmount: number
  groupId: string
  paidBy: string
  type:string
  paidmemberUsername: string
  paidmemberAvatar: string
  createdAt: string
  updatedAt: string
}

interface ExpensesContextType {
  expenses: Expense[];
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined,
);

export const ExpensesProvider: React.FC<{
  children: React.ReactNode;
  expense: Expense[];
}> = ({ children, expense }) => {
  return (
    <ExpensesContext.Provider value={{ expenses: expense }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpensesContext);
  if (!context) {
    throw new Error("useExpenses must be used within ExpensesProvider");
  }
  return context;
};
