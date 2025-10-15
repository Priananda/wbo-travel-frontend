"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/services/Auth";
import bgBrokenBeach from "@/app/assets/images/broken-beach.jpg";
import LoadingAdminSuperAdmin from "@/app/components/loading/index";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     setLoading(true);
    await login(form.email, form.password);
    router.push("/features/admin/dashboard");
  };

  return (
    <div
      className="min-h-screen px-4 flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgBrokenBeach.src})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
        {loading && <LoadingAdminSuperAdmin />}

      {/* Form Container */}
      <div className="relative w-full max-w-sm bg-white rounded-lg shadow-md overflow-hidden z-10 mb-2">
         
        {/* Header Image */}
        <div
          className="h-40 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgBrokenBeach.src})` }}
        ></div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 mt-2">
          <h2 className="text-2xl text-black font-semibold mb-2">Login</h2>
          <p className="text-sm text-gray-600 mb-3">Silakan login untuk melanjutkan</p>

        
          {/* Email Field */}
          <label className="block text-md font-medium text-gray-800 mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Masukkan email"
            className="w-full mb-4 px-3 py-2 border border-gray-300 placeholder:text-gray-500 rounded-md shadow focus:ring-1 focus:ring-teal-700 outline-none "
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          {/* Password Field */}
          <label className="block text-md font-medium text-gray-800 mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Masukkan password"
            className="w-full mb-4 px-3 py-2 border border-gray-300 placeholder:text-gray-500 rounded-md shadow focus:ring-1 focus:ring-teal-700 outline-none"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

           <button
            type="submit"
            disabled={loading} 
            className={`w-full mt-4 py-2 text-md ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-teal-700 hover:bg-teal-800"
            } text-white rounded-md shadow-md`}
          >
            {loading ? "Menunggu..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
