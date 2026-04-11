'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type DashboardContextType = {
  dashboardstate: any;
};

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export function DashboardProvider({
  children,
  dataPromise,
}: {
  children: React.ReactNode;
  dataPromise?: Promise<any>;
}) {
  const [dashboardstate, setDashboardstate] = useState<any>({
    data: { monthlyspending: 0 },
  });

  useEffect(() => {
    if (dataPromise) {
      dataPromise
        .then((data) =>
          setDashboardstate(data || { data: { monthlyspending: 0 } })
        )
        .catch((err) => console.error(err));
    }
  }, [dataPromise]);

  return (
    <DashboardContext.Provider value={{ dashboardstate }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    return { dashboardstate: { data: { monthlyspending: 0 } } };
  }
  return context;
}
