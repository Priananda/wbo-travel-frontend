"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/services/Auth";
import bgBrokenBeach from "@/app/assets/images/brokenbeach.jpg";
import LoadingAdminSuperAdmin from "@/app/components/loading/index";
import { hkGrotesk } from "@/app/fonts/fonts";
import AOS from "aos";
import "aos/dist/aos.css";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const [errorAuth, setErrorAuth] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  // 🧠 Validasi field tertentu
  const validateField = (name: string, value: string) => {
    let message = "";

    if (name === "email") {
      if (!value) message = "Email wajib diisi.";
      else if (!/\S+@\S+\.\S+/.test(value))
        message = "Masukkan email dengan format yang benar.";
    }

    if (name === "password") {
      if (!value) message = "Password wajib diisi.";
      else if (value.length < 6)
        message = "Password minimal 6 karakter.";
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  // ✏️ Saat mengetik
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Validasi hanya jika input sudah pernah disentuh
    if (touched[name as "email" | "password"]) {
      validateField(name, value);
    }
  };

  // 🖱️ Saat input pertama kali disentuh
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  // 🚀 Saat submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorAuth("");
    setLoading(true);

    // Validasi semua field
    validateField("email", form.email);
    validateField("password", form.password);
    setTouched({ email: true, password: true });

    // Jika masih ada error, hentikan
    if (errors.email || errors.password) {
      setLoading(false);
      return;
    }

    try {
      await login(form.email, form.password);
      router.push("/features/admin/dashboard");
    } catch (err) {
      if (err instanceof Error) console.error("Login error:", err.message);
      setErrorAuth(
        "Email atau password salah. Hubungi developer atau super admin jika lupa email dan password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen px-4 flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${bgBrokenBeach.src})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      {loading && <LoadingAdminSuperAdmin />}

      <div
        data-aos="zoom-in"
        className="relative w-full max-w-sm bg-white rounded-xl shadow-md overflow-hidden z-10 mb-2"
      >
        <form onSubmit={handleSubmit} className={`p-7 ${hkGrotesk.className}`}>
          <h2 className="mt-4 mb-8 text-3xl font-bold text-center text-black drop-shadow-xs">
            Login
          </h2>

          {/* Email */}
          <label className="block text-md font-medium text-gray-800 mb-2">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="Masukkan email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full mb-1 px-4 py-2 border rounded-md outline-none placeholder:text-gray-500 ${
              touched.email && errors.email
                ? "border-red-500"
                : "border-gray-300 focus:ring-cyan-700"
            }`}
          />
          {touched.email && errors.email && (
            <p className="text-sm text-red-600 mb-3">{errors.email}</p>
          )}

          {/* Password */}
          <label className="block text-md font-medium text-gray-800 mb-2">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="Masukkan password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full mb-1 px-4 py-2 border rounded-md outline-none placeholder:text-gray-500 ${
              touched.password && errors.password
                ? "border-red-600"
                : "border-gray-300 focus:ring-cyan-700"
            }`}
          />
          {touched.password && errors.password && (
            <p className="text-sm text-red-600 mb-3">{errors.password}</p>
          )}

          {/* Error dari server */}
          {errorAuth && (
            <p className="text-sm text-red-600 mt-2 text-center">
              {errorAuth}
            </p>
          )}

          {/* Tombol */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-5 py-2 text-md text-white rounded-md shadow-md transition font-semibold cursor-pointer ${
              loading
                ? "bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-800 hover:to-cyan-600"
            }`}
          >
            {loading ? "Menunggu..." : "Masuk"}
          </button>

          <div className="flex items-center mx-auto w-30 mt-4">
            <div className="flex-grow h-px bg-cyan-700/80" />
          </div>
        </form>
      </div>
    </div>
  );
}
