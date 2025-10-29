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

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string, recaptchaToken: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string, recaptchaToken: string) => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getCsrf = async () => {
    await api.get("/sanctum/csrf-cookie");
  };

  const login = async (email: string, password: string, recaptchaToken: string) => {
    await getCsrf();
    const res = await api.post("/login", { email, password, recaptcha_token: recaptchaToken });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const register = async (name: string, email: string, password: string, recaptchaToken: string) => {
    await getCsrf();
    const res = await api.post("/register", { name, email, password, recaptcha_token: recaptchaToken });
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
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
    setToken(null);
    setUser(null);
    window.location.href =
      currentRole === "admin" || currentRole === "super_admin"
        ? "/auth/admin/login"
        : "/auth/users/login";
  };

  const fetchUser = async () => {
    const tokenFromStorage = localStorage.getItem("token");
    if (!tokenFromStorage) {
      setLoading(false);
      return;
    }
    try {
      const res = await api.get("/me", {
        headers: { Authorization: `Bearer ${tokenFromStorage}` },
      });
      setUser(res.data.user);
      setToken(tokenFromStorage);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, register, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};










// TESTING NON RE CAPTCHA
// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import { api } from "@/app/api/api";

// type Role = "user" | "admin" | "super_admin";

// type User = {
//   id: number;
//   name: string;
//   email: string;
//   role: Role;
// } | null;

// type AuthContextType = {
//   user: User;
//   token: string | null;
//   loading: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
//   setUser: (user: User) => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   const getCsrf = async () => {
//     await api.get("/sanctum/csrf-cookie");
//   };

//   const login = async (email: string, password: string) => {
//     await getCsrf();
//     const res = await api.post("/login", { email, password });
//     localStorage.setItem("token", res.data.token);
//     setToken(res.data.token);
//     setUser(res.data.user);
//   };

//   const register = async (name: string, email: string, password: string) => {
//     await getCsrf();
//     const res = await api.post("/register", { name, email, password });
//     localStorage.setItem("token", res.data.token);
//     setToken(res.data.token);
//     setUser(res.data.user);
//   };

// const logout = async () => {
//   const currentRole = user?.role; // ✅ Simpan role sebelum setUser(null)

//   try {
//     await api.post("/logout");
//   } catch (e) {
//     console.error("Logout failed:", e);
//   }

//   localStorage.removeItem("token");
//   setToken(null);
//   setUser(null);

//   // ✅ Redirect sesuai role terakhir
//   if (currentRole === "admin" || currentRole === "super_admin") {
//     window.location.href = "/auth/admin/login";
//   } else {
//     window.location.href = "/auth/users/login";
//   }
// };


//   const fetchUser = async () => {
//     const tokenFromStorage = localStorage.getItem("token");
//     if (!tokenFromStorage) {
//       setLoading(false);
//       return;
//     }
//     setToken(tokenFromStorage);

//     try {
//       const res = await api.get("/me", {
//         headers: { Authorization: `Bearer ${tokenFromStorage}` },
//       });
//       setUser(res.data.user);
//     } catch (err) {
//       console.error("Fetch user gagal:", err);
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{ user, token, loading, login, logout, register, setUser }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };


















