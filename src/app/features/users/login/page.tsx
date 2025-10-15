"use client";

import { useState } from "react";
import { useAuth } from "@/app/services/Auth";
import { useRouter } from "next/navigation";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "axios";

export default function UserLoginPage() {
  const { login, setUser } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(form.email, form.password);
    router.push("/features/users/dashboard");
  };

const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
  try {
    if (!credentialResponse.credential) {
      console.error("Token Google tidak ditemukan");
      return;
    }

    const res = await axios.post("http://127.0.0.1:8000/api/auth/google", {
      token: credentialResponse.credential,
    });

    console.log("Login via Google berhasil:", res.data);

    // Simpan token dan user ke localStorage atau context
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);

    router.push("/features/users/dashboard");
  } catch (err) {
    console.error("Login Google gagal:", err);
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Form Login Manual */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-80 mb-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">User Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>

      {/* Separator */}
      <div className="flex items-center justify-center w-80 my-2">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-2 text-gray-500 text-sm">atau</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Tombol Login via Google */}
      <div className="bg-white p-4 rounded-xl shadow w-80 flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => console.error("Login via Google gagal")}
        />
      </div>
    </div>
  );
}
