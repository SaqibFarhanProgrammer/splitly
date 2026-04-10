'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type StatesContextType = {
  stateData: any;
};

const StatesContext = createContext<StatesContextType | undefined>(undefined);

export function StateProvider({ children, statePromise }: { children: React.ReactNode, statePromise?: Promise<any> }) {
  const [stateData, setStateData] = useState<any>(0);

  useEffect(() => {
    if (statePromise) {
      statePromise.then((data) => setStateData(data || 0)).catch((err) => console.error(err));
    }
  }, [statePromise]);

  return <StatesContext.Provider value={{ stateData }}>{children}</StatesContext.Provider>;
}

export function useStatesContext() {
  const context = useContext(StatesContext);
  if (!context) {
    return { stateData: 0 };
  }
  return context;
}
