// context/AuthContext.tsx
"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useRef,
} from "react";
import axios from "axios";

interface User {
  username: string;
  email: string;
  avatar?: string;
  createdAt: string; // Yeh add kiya
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const userdatachache = useRef<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let userdatacache;

    axios
      .get("/api/users/me")
      .then((res) => {
        setUser(res.data.data);
        userdatacache = res.data.data;
        console.log(res);
      })
      .catch(() => setUser(null)) // Error handling add ki
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
