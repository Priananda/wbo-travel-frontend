"use client";

import { useAuth } from "@/app/services/Auth";
import ProtectedRoute from "@/app/middleware/ProtectedRoute";

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["super_admin"]}>
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
        <h1 className="text-3xl font-bold">Dashboard {user?.role}</h1>
        <p className="text-gray-600">Welcome, {user?.name}</p>
        <button
          onClick={logout}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </ProtectedRoute>
  );
}
