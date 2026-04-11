'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextType = {
  user: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  userPromise,
}: {
  children: React.ReactNode;
  userPromise?: Promise<any>;
}) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (userPromise) {
      userPromise
        .then((data) => setUser(data))
        .catch((err) => console.error(err));
    }
  }, [userPromise]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    return { user: { username: 'Guest', email: 'guest@example.com' } }; // Safe default
  }
  return context;
}
