'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Expense } from '@/types/globalTypes';

type ExpensesContextType = {
  expenses: Expense[];
};

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export function ExpensesProvider({ children, expensePromise }: { children: React.ReactNode, expensePromise?: Promise<Expense[]> }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    if (expensePromise) {
      expensePromise.then((data) => setExpenses(data || [])).catch((err) => console.error(err));
    }
  }, [expensePromise]);

  return <ExpensesContext.Provider value={{ expenses }}>{children}</ExpensesContext.Provider>;
}

export function useExpensesContext() {
  const context = useContext(ExpensesContext);
  if (!context) {
    return { expenses: [] };
  }
  return context;
}
