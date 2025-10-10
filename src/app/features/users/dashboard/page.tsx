"use client";

import { useAuth } from "@/app/services/Auth";
import ProtectedRoute from "@/app/middleware/ProtectedRoute";
import Navbar from "@/app/components/navbar/page";

export default function UserDashboard() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <Navbar />

      {/* Hero Section dengan video latar */}
      <section className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">
        {/* Video background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/testing.mp4"      // ganti path sesuai lokasi file videomu
          autoPlay
          loop
          muted
          playsInline
        />

       
        {/* Konten utama */}
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-3 font-[Poppins] drop-shadow-lg">
            Bali Sundaram Travel
          </h1>
          <p className="text-xl font-[Dancing Script] mb-8 drop-shadow-md">
            Your Colorful Holiday
          </p>

          {/* Search bar */}
          <div className="flex items-center bg-white text-gray-600 rounded-full w-[90%] max-w-xl mx-auto px-4 py-3 shadow-md">
            <input
              type="text"
              placeholder="Where to go?"
              className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
      </section>

      {/* Info user */}
      <div className="flex flex-col items-center justify-center py-10 bg-gray-50">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-gray-600 mb-4">Role: {user?.role}</p>

        <button
          onClick={logout}
          className="bg-gradient-to-r from-red-600 to-rose-500 text-white px-6 py-2 rounded-full hover:from-red-700 hover:to-rose-600 transition"
        >
          Logout
        </button>
      </div>
    </ProtectedRoute>
  );
}
