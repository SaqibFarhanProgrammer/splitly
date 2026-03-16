'use client'

import { createContext, ReactNode, useContext } from 'react'

interface dailyExpensesT {
  date: string | Date
  total: number | string
}

interface DashboardData {
  monthlyspending: number
  youOwe: number
  youGet: number
  dailyExpenses: dailyExpensesT[]
}

interface DashboardContextType {
  data: DashboardData
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined,
)

interface DashboardProviderProps {
  children: ReactNode
  data: DashboardData
}

export const DashboardProvider = ({
  children,
  data,
}: DashboardProviderProps) => {
  return (
    <DashboardContext.Provider value={{ data }}>
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboardContext = () => {
  const context = useContext(DashboardContext)
  if (!context)
    throw new Error('useDashboardContext must be used within DashboardProvider')
  return context
}
