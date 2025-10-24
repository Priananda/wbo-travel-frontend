"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/services/Auth";
import { useRouter } from "next/navigation";
import { hkGrotesk } from "@/app/fonts/fonts";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import WhatsAppButton from "@/app/components/waButton/page";
import Loading from "@/app/components/loading/index"; // Spinner

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<RegisterForm>>({});
  const [touched, setTouched] = useState<{ [K in keyof RegisterForm]?: boolean }>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  // ✅ Validasi tiap field
  const validateField = (name: keyof RegisterForm, value: string) => {
    let message = "";

    if (name === "name") {
      if (!value.trim()) message = "Nama wajib diisi.";
      else if (value.length < 3) message = "Nama minimal 3 karakter.";
    }

    if (name === "email") {
      if (!value.trim()) message = "Email wajib diisi.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        message = "Masukkan email yang valid.";
    }

    if (name === "password") {
      if (!value.trim()) message = "Password wajib diisi.";
      else if (value.length < 6) message = "Password minimal 6 karakter.";
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  // ✅ Saat input berubah
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as {
      name: keyof RegisterForm;
      value: string;
    };
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value); // validasi real-time hanya jika sudah disentuh
  };

  // ✅ Saat input disentuh (blur)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target as {
      name: keyof RegisterForm;
      value: string;
    };
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  // ✅ Saat submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger validasi semua field
    const newTouched: { [K in keyof RegisterForm]: boolean } = {
      name: true,
      email: true,
      password: true,
    };
    setTouched(newTouched);

    // Validasi ulang semua field
    Object.entries(form).forEach(([key, value]) =>
      validateField(key as keyof RegisterForm, value)
    );

    // Jika masih ada error → stop
    const hasError = Object.values(errors).some((err) => err && err.length > 0);
    if (hasError) return;

    // Submit form
    setIsLoading(true);
    try {
      await register(form.name, form.email, form.password);
      setTimeout(() => {
        router.push("/auth/users/login");
      }, 1000);
    } catch (error) {
      console.error("Registrasi gagal:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-100">
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black opacity-60">
          <Loading />
        </div>
      )}

      <div
        data-aos="zoom-in"
        className="relative z-10 bg-white p-7 rounded-xl shadow-md w-full max-w-sm"
      >
        <h2
          className={`mt-4 mb-2 text-3xl font-bold text-center bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent ${hkGrotesk.className}`}
        >
          Register
        </h2>
        <p
          className={`text-md text-gray-500 text-center font-medium ${hkGrotesk.className}`}
        >
          Silahkan Daftar
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          {/* Nama */}
          <div>
            <label className="text-md font-medium text-gray-700">Nama</label>
            <input
              name="name"
              type="text"
              placeholder="Masukkan nama lengkap"
              value={form.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full mt-2 px-4 py-2 border rounded-md outline-none ${
                touched.name && errors.name
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-cyan-700"
              }`}
            />
            {touched.name && errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-md font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Masukkan email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full mt-2 px-4 py-2 border rounded-md outline-none ${
                touched.email && errors.email
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-cyan-700"
              }`}
            />
            {touched.email && errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-md font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Masukkan password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full mt-2 px-4 py-2 border rounded-md outline-none ${
                touched.password && errors.password
                  ? "border-red-500"
                  : "border-gray-300 focus:ring-cyan-700"
              }`}
            />
            {touched.password && errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-5 w-full text-md text-white py-2 rounded-md transition font-semibold bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-800 hover:to-cyan-600 shadow-md cursor-pointer"
          >
            {isLoading ? "Menunggu..." : "Daftar"}
          </button>

          <p className="text-sm text-black text-center mt-3">
            Sudah punya akun?{" "}
            <Link

              href="/auth/users/login"
              className="text-cyan-700 hover:underline"
            >
              Masuk
            </Link>
          </p>
        </form>
      </div>
      <WhatsAppButton />
    </div>
  );
}
