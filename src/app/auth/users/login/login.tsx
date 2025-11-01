"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/services/Auth";
import { useRouter, useSearchParams } from "next/navigation";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import { hkGrotesk } from "@/app/fonts/fonts";
import AOS from "aos";
import "aos/dist/aos.css";
import Loading from "@/app/components/loading/index";
import Link from "next/link";
import WhatsAppButton from "@/app/components/waButton/page";
import AuthButton from "@/app/components/authButton/page";
import ModalRegister from "@/app/components/userAdminModal/page";
import { Eye, EyeOff } from "lucide-react";

export default function UserLoginPage() {
  const { login, setUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/home";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = useState({ email: false, password: false });
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const validateField = (name: string, value: string) => {
    let message = "";
    if (name === "email") {
      if (!value) message = "Email wajib diisi.";
      else if (!/\S+@\S+\.\S+/.test(value)) message = "Masukkan email valid.";
    }
    if (name === "password") {
      if (!value) message = "Password wajib diisi.";
      else if (value.length < 6) message = "Password minimal 6 karakter.";
    }
    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as "email" | "password"]) validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleCaptcha = (token: string | null) => {
    setRecaptchaToken(token);
    console.log("reCAPTCHA Token USER LOGIN:", token);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoadingUsers(true);

    if (!recaptchaToken) {
      setAlertMessage("Harap selesaikan reCAPTCHA terlebih dahulu.");
      setShowAlert(true);
      setIsLoadingUsers(false);
      return;
    }

    validateField("email", form.email);
    validateField("password", form.password);
    setTouched({ email: true, password: true });

    if (errors.email || errors.password) {
      setIsLoadingUsers(false);
      return;
    }

    try {
      await login(form.email, form.password, recaptchaToken);
      setTimeout(() => router.push(redirectUrl), 800);
    } catch (error) {
      console.error("Login gagal:", error);
      setErrors((prev) => ({
        ...prev,
        password: "Email atau password salah. Hubungi admin jika lupa password.",
      }));
      setIsLoadingUsers(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) return;
    setIsLoadingUsers(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/auth/google", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      setTimeout(() => router.push(redirectUrl), 800);
    } catch (err) {
      console.error("Login Google gagal:", err);
      setIsLoadingUsers(false);
    }
  };

  return (
      <div className="relative min-h-screen flex items-center justify-center bg-slate-200 px-2 py-2 md:px-4 lg:px-20 md:py-5 lg:py-5">
  {isLoadingUsers && (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black opacity-60">
      <Loading />
    </div>
  )}

  <div
    data-aos="zoom-in"
    className={`relative z-10 bg-white rounded-xl shadow-lg w-full max-w-5xl flex flex-col md:flex-row overflow-hidden ${hkGrotesk.className}`}
  >
    {/* Kiri - Informasi */}
    <div className="flex-1 bg-gradient-to-r from-teal-700 to-cyan-800 text-white p-8 md:p-10 flex flex-col justify-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg leading-snug">
        Selamat Datang Kembali!
      </h2>
      <p className="text-sm md:text-base text-teal-50 leading-relaxed">
        Silakan login ke akun Anda untuk memilih paket tour, melihat pesanan, dan
        menikmati layanan kami.
      </p>
      <p className="mt-6 text-sm md:text-base text-teal-100">
        Belum punya akun?{" "}
        <Link
          href="/auth/users/register"
          className="underline text-white font-semibold hover:text-teal-200"
        >
          Daftar Sekarang
        </Link>
      </p>
    </div>

    {/* Kanan - Form */}
    <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
      <div className="max-w-sm w-full mx-auto">
        <h2 className="text-3xl font-bold text-center text-cyan-700 mb-1 drop-shadow-xs">
          Login
        </h2>
        <p className="text-sm md:text-md text-gray-500 text-center mb-6">
          Silakan masuk ke akun Anda
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Email */}
          <div>
            <label className="text-md font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Masukkan email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full mt-2 px-4 py-2 border rounded-md outline-none transition-all
                ${
                  touched.email && errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                }`}
            />
            {touched.email && errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-md font-medium text-gray-700">Password</label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Masukkan password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border rounded-md outline-none transition-all pr-10
                  ${
                    touched.password && errors.password
                      ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-slate-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                  }`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-sm text-red-600 mt-1">{errors.password}</p>
            )}
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center mt-4 mb-4">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={handleCaptcha}
            />
          </div>

          {/* Tombol Login */}
          <AuthButton text="Masuk" type="submit" isLoading={isLoadingUsers} />
        </form>

        {/* Garis Pemisah */}
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-cyan-700/80" />
          <span className="px-2 text-gray-500 text-sm">atau</span>
          <div className="flex-grow h-px bg-cyan-700/80" />
        </div>

        {/* Login Google */}
        <div className="flex justify-center drop-shadow-sm">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.error("Login via Google gagal")}
            width="100%"
          />
        </div>
      </div>
    </div>
  </div>

  <WhatsAppButton />
  <ModalRegister
    show={showAlert}
    onClose={() => setShowAlert(false)}
    title="Verifikasi Gagal"
    message={alertMessage}
  />
</div>

  );
}














// TESTING NON RE CAPTCHA
// "use client";

// import { useEffect, useState } from "react";
// import { useAuth } from "@/app/services/Auth";
// import { useRouter } from "next/navigation";
// import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
// import axios from "axios";
// import { hkGrotesk } from "@/app/fonts/fonts";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Loading from "@/app/components/loading/index";
// import Link from "next/link";
// import WhatsAppButton from "@/app/components/waButton/page";
// import { useSearchParams } from "next/navigation";
// import AuthButton from "@/app/components/authButton/page";

// export default function UserLoginPage() {
//   const { login, setUser } = useAuth();
//   const router = useRouter();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
//   const [touched, setTouched] = useState({ email: false, password: false });
//   const [isLoadingUsers, setIsLoadingUsers] = useState(false);
//   const searchParams = useSearchParams();
//   const redirectUrl = searchParams.get("redirect") || "/users/dashboard";

//   useEffect(() => {
//     AOS.init({ duration: 600, once: true });
//   }, []);

//   // Validasi field
//   const validateField = (name: string, value: string) => {
//     let message = "";

//     if (name === "email") {
//       if (!value) message = "Email wajib diisi.";
//       else if (!/\S+@\S+\.\S+/.test(value))
//         message = "Masukkan email dengan format yang benar.";
//     }

//     if (name === "password") {
//       if (!value) message = "Password wajib diisi.";
//       else if (value.length < 6)
//         message = "Password minimal 6 karakter.";
//     }

//     setErrors((prev) => ({ ...prev, [name]: message }));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));

//     if (touched[name as "email" | "password"]) {
//       validateField(name, value);
//     }
//   };

//   const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setTouched((prev) => ({ ...prev, [name]: true }));
//     validateField(name, value);
//   };

//   // Submit login
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoadingUsers(true);
//     setErrors({}); // reset error sebelumnya

//     // Validasi input
//     validateField("email", form.email);
//     validateField("password", form.password);
//     setTouched({ email: true, password: true });

//     if (errors.email || errors.password) {
//       setIsLoadingUsers(false);
//       return;
//     }

//     try {
//       await login(form.email, form.password);
//       // setTimeout(() => router.push("/users/dashboard"), 800);
//       setTimeout(() => router.push(redirectUrl), 800);
//     } catch (error) {
//       console.error("Login gagal:", error);
//       setErrors((prev) => ({
//         ...prev,
//         password:
//           "Email atau password salah. Hubungi admin jika lupa password.",
//       }));
//       setIsLoadingUsers(false);
//     }
//   };

//   // Login dengan Google
//   const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
//     if (!credentialResponse.credential) return;
//     setIsLoadingUsers(true);

//     try {
//       const res = await axios.post("http://127.0.0.1:8000/api/auth/google", {
//         token: credentialResponse.credential,
//       });

//       localStorage.setItem("token", res.data.token);
//       setUser(res.data.user);

//       // setTimeout(() => router.push("/users/dashboard"), 800);
//        setTimeout(() => router.push(redirectUrl), 800);
//     } catch (err) {
//       console.error("Login Google gagal:", err);
//       setIsLoadingUsers(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-gray-100 px-2 md:-px-0 lg:px-0">
//       {/* Overlay dan Spinner */}
//       {isLoadingUsers && (
//         <div className="absolute inset-0 z-50 flex items-center justify-center bg-black opacity-60">
//           <Loading />
//         </div>
//       )}

//       {/* Konten Login */}
//       <div
//         data-aos="zoom-in"
//         className="relative z-10 bg-white p-7 rounded-xl shadow-md w-full max-w-sm"
//       >
//         <h2
//           className={`mt-2 mb-2 text-3xl font-bold text-center bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent drop-shadow-xs ${hkGrotesk.className}`}
//         >
//           Login
//         </h2>
//         <p
//           className={`text-md text-gray-500 text-center font-medium drop-shadow-xs ${hkGrotesk.className}`}
//         >
//           Silahkan Login
//         </p>

//         <form onSubmit={handleSubmit} className="mt-5">
//           {/* Email */}
//           <label className=" text-md font-medium text-gray-700">Email</label>
//           <input
//             type="email"
//             name="email"
//             placeholder="Masukkan email"
//             value={form.email}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className={`w-full mb-5 mt-2 px-4 py-2 border rounded-md outline-none placeholder:text-gray-500 ${
//               touched.email && errors.email
//                 ? "border-red-500"
//                 : "border-gray-300 focus:ring-1 focus:ring-cyan-700"
//             }`}
//           />
//           {touched.email && errors.email && (
//             <p className="text-sm text-red-600 mb-3">{errors.email}</p>
//           )}

//           {/* Password */}
//           <label className="text-md font-medium text-gray-700">Password</label>
//           <input
//             type="password"
//             name="password"
//             placeholder="Masukkan password"
//             value={form.password}
//             onChange={handleChange}
//             onBlur={handleBlur}
//             className={`w-full mb-3 mt-2 px-4 py-2 border rounded-md outline-none placeholder:text-gray-500 ${
//               touched.password && errors.password
//                 ? "border-red-500"
//                 : "border-gray-300 focus:ring-1 focus:ring-cyan-700"
//             }`}
//           />
//           {touched.password && errors.password && (
//             <p className="text-sm text-red-600 mb-3">{errors.password}</p>
//           )}

//           {/* Tombol */}
//           {/* <button
//             type="submit"
//             className="mt-5 w-full text-md text-white py-2 rounded-md shadow-md transition font-semibold bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-800 hover:to-cyan-600 cursor-pointer"
//             disabled={isLoadingUsers}
//           >
//             {isLoadingUsers ? "Menunggu..." : "Masuk"}
//           </button> */}
//           <AuthButton
//           text="Masuk"
//           type="submit"
//           isLoading={isLoadingUsers}
//           />

//           <p className="text-sm text-black text-center mt-3">
//             Belum punya akun?{" "}
//             <Link
//               href="/auth/users/register"
//               className="text-cyan-700 hover:underline drop-shadow-xs"
//             >
//               Daftar
//            </Link>
//           </p>
//         </form>

//         {/* Pembatas */}
//         <div className="flex items-center my-5">
//           <div className="flex-grow h-px bg-cyan-700/80" />
//           <span className="px-2 text-gray-500 text-sm">atau</span>
//           <div className="flex-grow h-px bg-cyan-700/80" />
//         </div>

//         {/* Login Google */}
//         <div className="flex justify-center drop-shadow-sm">
//           <GoogleLogin
//             onSuccess={handleGoogleLogin}
//             onError={() => console.error("Login via Google gagal")}
//             width="100%"
//           />
//         </div>
//       </div>
//       <WhatsAppButton />
//     </div>
//   );
// }


















