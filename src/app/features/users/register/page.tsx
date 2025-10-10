"use client";
import { useState } from "react";
import { useAuth } from "@/app/services/Auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(form.name, form.email, form.password);
    router.push("/features/users/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">User Register</h2>
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-2 p-2 border rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
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
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Register</button>
      </form>
    </div>
  );
}
