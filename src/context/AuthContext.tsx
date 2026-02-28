"use client";

import { createContext, useContext, ReactNode } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
  createdAt: string;
}

interface AuthContextType {
  user?: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User | null;
}) => {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};