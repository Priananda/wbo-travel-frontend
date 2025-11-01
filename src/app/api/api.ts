import axios, { AxiosInstance } from "axios";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
const API_BASE = `${BACKEND_BASE}/api`;

// publik endpoint
export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

// Interceptor untuk menambahkan token
const attachAuthInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });
};
attachAuthInterceptor(api);

// API User
export const userApi = axios.create({
  baseURL: `${API_BASE}/user`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});
attachAuthInterceptor(userApi);

// API Admin
export const adminApi = axios.create({
  baseURL: `${API_BASE}/admin`,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});
attachAuthInterceptor(adminApi);

// Optional: untuk Sanctum
export const sanctum = axios.create({
  baseURL: BACKEND_BASE,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});


// import axios from "axios";

// const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
// const API_BASE = process.env.NEXT_PUBLIC_API_URL || `${BACKEND_BASE}/api`;

// export const api = axios.create({
//   baseURL: API_BASE,
//   withCredentials: true,
//   headers: {
//     Accept: "application/json",
//   },
// });

// // ⬇️ Tambahkan interceptor agar token otomatis dipakai
// api.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }
//   return config;
// });

// // Optional: jika butuh ambil csrf-cookie
// export const sanctum = axios.create({
//   baseURL: BACKEND_BASE,
//   withCredentials: true,
//   headers: {
//     Accept: "application/json",
//   },
// });
