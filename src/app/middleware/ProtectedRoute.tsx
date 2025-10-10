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

    console.log("User role:", user?.role);
  console.log("Allowed roles:", allowedRoles);
  console.log("Current pathname:", pathname);

    if (!user) {
      router.replace("/features/users/login");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      if (user.role === "user" && !pathname.startsWith("/features/users")) {
        router.replace("/features/users/dashboard");
      } else if (user.role === "admin" && !pathname.startsWith("/features/admin")) {
        router.replace("/features/admin/dashboard");
      } else if (user.role === "super_admin" && !pathname.startsWith("/features/super_admin")) {
        router.replace("/features/super_admin/dashboard");
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

  if (!user) return null;

  return <>{children}</>;
}
