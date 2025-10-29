"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/services/Auth";

type Props = {
  children: React.ReactNode;
  allowedRoles: string[];
};

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    // Kalau belum login, redirect ke login page sesuai role yang dibutuhkan
    if (!user) {
      if (pathname.startsWith("/features/admin")) {
        router.replace("/auth/admin/login");
      } else if (pathname.startsWith("/features/super_admin")) {
        router.replace("/features/super_admin/login");
      } else {
        router.replace("/auth/users/login");
      }
      return;
    }

    // Kalau sudah login, tapi role tidak cocok, redirect ke dashboard sesuai role mereka
    if (!allowedRoles.includes(user.role)) {
      if (user.role === "user") {
        router.replace("/users/dashboard");
      } else if (user.role === "admin") {
        router.replace("/features/admin/dashboard");
      } else if (user.role === "super_admin") {
        router.replace("/features/super_admin/dashboard");
      } else {
        router.replace("/"); // fallback
      }
    }
  }, [user, loading, pathname, router, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading authentication...</p>
      </div>
    );
  }

  // Tidak tampilkan apa pun kalau user tidak cocok
  if (!user || !allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
}
