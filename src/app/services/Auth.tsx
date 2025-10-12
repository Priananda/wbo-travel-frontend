"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
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
  setUser: (user: User) => void; // ✅ ditambahkan agar bisa dipakai di login Google
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

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
      const token = localStorage.getItem("token");
      if (token) {
        const res = await api.get("/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Fetch user gagal:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};


