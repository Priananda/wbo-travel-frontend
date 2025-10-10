import axios from "axios";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
const API_BASE = process.env.NEXT_PUBLIC_API_URL || `${BACKEND_BASE}/api`;

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// ⬇️ Tambahkan interceptor agar token otomatis dipakai
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Optional: jika butuh ambil csrf-cookie
export const sanctum = axios.create({
  baseURL: BACKEND_BASE,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});
