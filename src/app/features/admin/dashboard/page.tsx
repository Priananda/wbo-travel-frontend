"use client";

import { useAuth } from "@/app/services/Auth";
import ProtectedRoute from "@/app/middleware/ProtectedRoute";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="-mt-32 flex flex-col items-center justify-center bg-white h-screen">
  <h1 className="mt-7 text-center font-bold text-4xl drop-shadow-xs">
    Selamat Datang {user?.role}
  </h1>
  <div className="mt-4 w-80 h-1 rounded-full bg-gradient-to-r from-teal-600 to-cyan-700" />
</div>

    </ProtectedRoute>
  );
}
