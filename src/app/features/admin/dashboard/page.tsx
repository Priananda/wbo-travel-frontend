"use client";

import Image from "next/image";
import { useAuth } from "@/app/services/Auth";
import ProtectedRoute from "@/app/middleware/ProtectedRoute";
import logoWBO from "@/app/assets/images/logo-wbo.png";

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="-mt-28 flex flex-col items-center justify-center bg-white h-screen">
         <Image
          src={logoWBO}
          alt="Logo WBO"
          width={190}
          height={180}
          className="mb-4"
          priority
        />
  <h1 className="text-center font-bold text-4xl drop-shadow-xs">
    Selamat Datang {user?.role}
  </h1>
  <div className="mt-4 w-80 h-1 rounded-full bg-gradient-to-r from-teal-600 to-cyan-700" />
</div>

    </ProtectedRoute>
  );
}
