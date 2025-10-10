"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "@/app/api/api";

type Role = "user" | "admin" | "super_admin";

type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true); // ⬅️ Loading state

  const getCsrf = async () => {
    await api.get("/sanctum/csrf-cookie");
  };

  const login = async (email: string, password: string) => {
    await getCsrf();
    const res = await api.post("/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    await getCsrf();
    const res = await api.post("/register", { name, email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  const logout = async () => {
    const currentRole = user?.role;

    try {
      await api.post("/logout");
    } catch (e) {
      console.error("Logout failed:", e);
    }

    localStorage.removeItem("token");
    setUser(null);

    if (currentRole === "admin" || currentRole === "super_admin") {
      window.location.href = "/features/admin/login";
    } else {
      window.location.href = "/features/users/login";
    }
  };

  const fetchUser = async () => {
    try {
      const res = await api.get("/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false); // ✅ selesai loading
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
