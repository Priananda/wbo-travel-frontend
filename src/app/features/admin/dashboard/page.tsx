"use client";

import Image from "next/image";
import { useAuth } from "@/app/services/Auth";
import ProtectedRoute from "@/app/middleware/ProtectedRoute";
import logoWBO from "@/app/assets/images/logo-wbo.png";

export default function AdminDashboard() {
  const {  } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="-mt-24 flex flex-col items-center justify-center bg-white h-screen">
         <Image
          src={logoWBO}
          alt="Logo WBO"
          width={210}
          height={210}
          className=""
          priority
        />
  {/* <h1 className="text-center font-semibold text-3xl drop-shadow-xs">
    Welcome {user?.role}
  </h1> */}
</div>

    </ProtectedRoute>
  );
}
