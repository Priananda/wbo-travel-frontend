"use client";

import ReCAPTCHA from "react-google-recaptcha";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/services/Auth";
import { useRouter } from "next/navigation";
import { hkGrotesk } from "@/app/fonts/fonts";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import WhatsAppButton from "@/app/components/waButton/page";
import Loading from "@/app/components/loading/index";
import AuthButton from "@/app/components/authButton/page";
import ModalRegister from "@/app/components/userAdminModal/page";
import { Eye, EyeOff } from "lucide-react";

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
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as {
      name: keyof RegisterForm;
      value: string;
    };
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target as {
      name: keyof RegisterForm;
      value: string;
    };
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleCaptcha = (token: string | null) => {
    setRecaptchaToken(token);
        console.log("reCAPTCHA Token USER REGISTER:", token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTouched: { [K in keyof RegisterForm]: boolean } = {
      name: true,
      email: true,
      password: true,
    };
    setTouched(newTouched);

    Object.entries(form).forEach(([key, value]) =>
      validateField(key as keyof RegisterForm, value)
    );

    const hasError = Object.values(errors).some((err) => err && err.length > 0);
    if (hasError) return;

    if (!recaptchaToken) {
      setAlertMessage("Harap selesaikan reCAPTCHA terlebih dahulu.");
      setShowAlert(true);
      return;
    }

    setIsLoading(true);
    try {
      await register(form.name, form.email, form.password, recaptchaToken);
      setTimeout(() => {
        router.push("/auth/users/login");
      }, 1000);
    } catch (error) {
      console.error("Registrasi gagal:", error);
      setIsLoading(false);
    }
  };

  return (
   <div className="relative min-h-screen flex items-center justify-center bg-slate-200 px-2 py-2 md:px-4 lg:px-20 md:py-5 lg:py-5">
  {isLoading && (
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
        Bergabung Sekarang!
      </h2>
      <p className="text-sm md:text-base text-teal-50 leading-relaxed">
        Buat akun Anda untuk mulai memesan paket tour dan menikmati
        berbagai layanan terbaik dari kami.
      </p>
      <p className="mt-6 text-sm md:text-base text-teal-100">
        Sudah punya akun?{" "}
        <Link
          href="/auth/users/login"
          className="underline text-white font-semibold hover:text-teal-200"
        >
          Masuk di sini
        </Link>
      </p>
    </div>

    {/* Kanan - Form Register */}
    <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
      <div className="max-w-sm w-full mx-auto">
        <h2
          className="mt-2 mb-2 text-3xl font-bold text-center bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent"
        >
          Register
        </h2>
        <p className="text-md text-gray-500 text-center font-medium mb-5">
          Silahkan Daftar
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
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
              className={`w-full mt-2 px-4 py-2 border rounded-md outline-none transition-all
                ${
                  touched.name && errors.name
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
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
              className={`w-full mt-2 px-4 py-2 border rounded-md outline-none transition-all
                ${
                  touched.email && errors.email
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                }`}
            />
            {touched.email && errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* reCAPTCHA */}
          <div className="flex justify-center mt-4 mb-4">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              onChange={handleCaptcha}
            />
          </div>

          {/* Tombol Submit */}
          <AuthButton text="Daftar" type="submit" isLoading={isLoading} />
        </form>
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
// import { hkGrotesk } from "@/app/fonts/fonts";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Link from "next/link";
// import WhatsAppButton from "@/app/components/waButton/page";
// import Loading from "@/app/components/loading/index"; // Spinner
// import AuthButton from "@/app/components/authButton/page";

// interface RegisterForm {
//   name: string;
//   email: string;
//   password: string;
// }

// export default function RegisterPage() {
//   const { register } = useAuth();
//   const router = useRouter();

//   const [form, setForm] = useState<RegisterForm>({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState<Partial<RegisterForm>>({});
//   const [touched, setTouched] = useState<{ [K in keyof RegisterForm]?: boolean }>(
//     {}
//   );
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     AOS.init({ duration: 600, once: true });
//   }, []);

//   // Validasi tiap field
//   const validateField = (name: keyof RegisterForm, value: string) => {
//     let message = "";

//     if (name === "name") {
//       if (!value.trim()) message = "Nama wajib diisi.";
//       else if (value.length < 3) message = "Nama minimal 3 karakter.";
//     }

//     if (name === "email") {
//       if (!value.trim()) message = "Email wajib diisi.";
//       else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
//         message = "Masukkan email yang valid.";
//     }

//     if (name === "password") {
//       if (!value.trim()) message = "Password wajib diisi.";
//       else if (value.length < 6) message = "Password minimal 6 karakter.";
//     }

//     setErrors((prev) => ({ ...prev, [name]: message }));
//   };

//   // Saat input berubah
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target as {
//       name: keyof RegisterForm;
//       value: string;
//     };
//     setForm((prev) => ({ ...prev, [name]: value }));
//     if (touched[name]) validateField(name, value); // validasi real-time hanya jika sudah disentuh
//   };

//   // Saat input disentuh (blur)
//   const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
//     const { name, value } = e.target as {
//       name: keyof RegisterForm;
//       value: string;
//     };
//     setTouched((prev) => ({ ...prev, [name]: true }));
//     validateField(name, value);
//   };

//   // Saat submit form
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Trigger validasi semua field
//     const newTouched: { [K in keyof RegisterForm]: boolean } = {
//       name: true,
//       email: true,
//       password: true,
//     };
//     setTouched(newTouched);

//     // Validasi ulang semua field
//     Object.entries(form).forEach(([key, value]) =>
//       validateField(key as keyof RegisterForm, value)
//     );

//     // Jika masih ada error → stop
//     const hasError = Object.values(errors).some((err) => err && err.length > 0);
//     if (hasError) return;

//     // Submit form
//     setIsLoading(true);
//     try {
//       await register(form.name, form.email, form.password);
//       setTimeout(() => {
//         router.push("/auth/users/login");
//       }, 1000);
//     } catch (error) {
//       console.error("Registrasi gagal:", error);
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-gray-100 px-2 md:-px-0 lg:px-0">
//       {isLoading && (
//         <div className="absolute inset-0 z-50 flex items-center justify-center bg-black opacity-60">
//           <Loading />
//         </div>
//       )}

//       <div
//         data-aos="zoom-in"
//         className="relative z-10 bg-white p-7 rounded-xl shadow-md w-full max-w-sm"
//       >
//         <h2
//           className={`mt-4 mb-2 text-3xl font-bold text-center bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent ${hkGrotesk.className}`}
//         >
//           Register
//         </h2>
//         <p
//           className={`text-md text-gray-500 text-center font-medium ${hkGrotesk.className}`}
//         >
//           Silahkan Daftar
//         </p>

//         <form onSubmit={handleSubmit} className="mt-5 space-y-3">
//           {/* Nama */}
//           <div>
//             <label className="text-md font-medium text-gray-700">Nama</label>
//             <input
//               name="name"
//               type="text"
//               placeholder="Masukkan nama lengkap"
//               value={form.name}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className={`w-full mt-2 px-4 py-2 border rounded-md outline-none ${
//                 touched.name && errors.name
//                   ? "border-red-500"
//                   : "border-gray-300 focus:ring-cyan-700"
//               }`}
//             />
//             {touched.name && errors.name && (
//               <p className="text-red-600 text-sm mt-1">{errors.name}</p>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-md font-medium text-gray-700">Email</label>
//             <input
//               name="email"
//               type="email"
//               placeholder="Masukkan email"
//               value={form.email}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className={`w-full mt-2 px-4 py-2 border rounded-md outline-none ${
//                 touched.email && errors.email
//                   ? "border-red-500"
//                   : "border-gray-300 focus:ring-cyan-700"
//               }`}
//             />
//             {touched.email && errors.email && (
//               <p className="text-red-600 text-sm mt-1">{errors.email}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-md font-medium text-gray-700">Password</label>
//             <input
//               name="password"
//               type="password"
//               placeholder="Masukkan password"
//               value={form.password}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               className={`w-full mt-2 px-4 py-2 border rounded-md outline-none ${
//                 touched.password && errors.password
//                   ? "border-red-500"
//                   : "border-gray-300 focus:ring-cyan-700"
//               }`}
//             />
//             {touched.password && errors.password && (
//               <p className="text-red-600 text-sm mt-1">{errors.password}</p>
//             )}
//           </div>

//           {/* Tombol Submit */}
//           {/* <button
//             type="submit"
//             disabled={isLoading}
//             className="mt-5 w-full text-md text-white py-2 rounded-md transition font-semibold bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-800 hover:to-cyan-600 shadow-md cursor-pointer"
//           >
//             {isLoading ? "Menunggu..." : "Daftar"}
//           </button> */}
//           <AuthButton
//             text="Daftar"
//             type="submit"
//             isLoading={isLoading}
//           />


//           <p className="text-sm text-black text-center mt-3">
//             Sudah punya akun?{" "}
//             <Link

//               href="/auth/users/login"
//               className="text-cyan-700 hover:underline"
//             >
//               Masuk
//             </Link>
//           </p>
//         </form>
//       </div>
//       <WhatsAppButton />
//     </div>
//   );
// }