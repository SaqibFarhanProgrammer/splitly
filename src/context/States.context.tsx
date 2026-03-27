'use client';
import { createContext, ReactNode, useContext, useState } from 'react';

interface StateContextType {
  stateData: number;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateProvider = ({
  children,
  stateData,
}: {
  children: ReactNode;
  stateData: StateContextType;
}) => {
  return (
    <StateContext.Provider value={stateData}>{children}</StateContext.Provider>
  );
};

export const useStateContext = <T,>() => {
  const context = useContext(StateContext);
  if (!context) throw new Error('Must be used within StateProvider');
  return context as StateContextType;
};
