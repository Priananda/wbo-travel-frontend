"use client";

import Link from "next/link";
import Image from "next/image";
import { hkGrotesk } from "@/app/fonts/fonts";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/services/Auth";
import { motion, AnimatePresence } from "framer-motion";
import LogoWBO from "@/app/assets/images/logo-wbo.png";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuSidebar, setMenuSidebar] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // List menu
  const menuItems = [
    { href: "/dashboard", label: "Home" },
    { href: "/packages", label: "Paket Bali Tour" },
    { href: "/about", label: "Gallery" },
    { href: "/c", label: "Kontak" },
    { href: "/a", label: "Tentang Kami" },
    { href: "/t", label: "Blog" },
  ];

  return (
    <>
      {/* 🔹 TOP BAR (desktop only) */}
      <div
        className={`hidden lg:block fixed left-1/2 -translate-x-1/2 z-50 w-[96%] rounded-full overflow-hidden transition-all duration-500 shadow-md ${
          scrolled
            ? "top-0 opacity-0 -translate-y-10 pointer-events-none"
            : "top-[10px] opacity-100 translate-y-0"
        }`}
      >
        <div className="py-2 px-6 bg-gradient-to-r from-teal-600 to-cyan-700 text-white text-[15px] font-medium flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span>📧</span>
              <span>idbalisundaram@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📞</span>
              <span>+62 853 3775 517</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📍</span>
              <span>Jl. Pudak No 3A Batubulan</span>
            </div>
          </div>

          {/* Sosial kanan */}
          <div className="flex items-center space-x-4">
            <Link
              href="https://facebook.com/balisundaramtravel"
              target="_blank"
              className="hover:opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.5a3.4 3.4 0 0 1 3.7-3.8 15.1 15.1 0 0 1 2.2.2v2.5h-1.2c-1.2 0-1.5.8-1.5 1.5V12H18l-.5 3h-3v7A10 10 0 0 0 22 12z" />
              </svg>
            </Link>
            <Link
              href="https://instagram.com/balisundaramtravel"
              target="_blank"
              className="hover:opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 2a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm4.5-2.75a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 16.5 6.25z" />
              </svg>
            </Link>
            <Link
              href="https://www.tiktok.com/@balisundaramtravel"
              target="_blank"
              className="hover:opacity-80"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.3 2h3a5.3 5.3 0 0 0 5.2 5.2v3A8.3 8.3 0 0 1 13.2 7v7.1a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2V2z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* 🔹 NAVBAR UTAMA */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-500 shadow-md rounded-2xl w-[99%] max-w-6xl ${
          scrolled ? "top-2 bg-white" : "top-[60px] bg-white"
        }`}
      >
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-5">
            <Image
              src={LogoWBO}
              alt="Logo Bali Wisata Oke"
              width={45}
              height={45}
            />
            <span
              className={`text-lg font-semibold ${hkGrotesk.className}`}
            >
              <span className="bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent">
                WISATA
              </span>{" "}
              <span className="text-black">BALI OKE</span>
            </span>
          </Link>

          {/* 🔹 MENU NAVIGASI DESKTOP */}
          <nav
            className={`hidden lg:flex text-md space-x-8 text-gray-800 font-semibold ${hkGrotesk.className}`}
          >
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative transition group ${
                  pathname === item.href ? "text-teal-600" : "hover:text-teal-800"
                }`}
              >
                {item.label}
                {/* 🔹 Underline Gradient */}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-teal-600 to-cyan-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* 🔹 Tombol kanan */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span
                  className={`hidden lg:block text-md text-gray-800 font-semibold ${hkGrotesk.className}`}
                >
                  Hi, {user.name}
                </span>
                <button
                  onClick={logout}
                  className={`hidden lg:block px-5 py-2 cursor-pointer bg-gradient-to-r from-teal-600 to-cyan-700 text-white text-md rounded-lg shadow-sm hover:from-teal-800 hover:to-cyan-600 font-medium ${hkGrotesk.className}`}
                >
                  Logout
                </button>
              </>
            )}

            {/* 🔸 Hamburger untuk HP & tablet */}
            <button
              onClick={() => setMenuSidebar(true)}
              className="block lg:hidden text-gray-800 hover:text-teal-600 focus:outline-none cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 🔹 SIDEBAR + OVERLAY */}
      <AnimatePresence>
        {menuSidebar && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-30"
              onClick={() => setMenuSidebar(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="text-lg font-semibold text-gray-800">
                  {user ? `Hi, ${user.name}` : "Selamat Datang"}
                </div>
                <button
                  onClick={() => setMenuSidebar(false)}
                  className="text-gray-800 text-2xl hover:text-teal-600 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* 🔹 MENU SIDEBAR */}
              <nav className="flex flex-col space-y-4 text-gray-800 font-semibold cursor-pointer">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuSidebar(false)}
                    className={`relative transition group ${
                      pathname === item.href
                        ? "text-teal-700"
                        : "hover:text-teal-800"
                    }`}
                  >
                    {item.label}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-teal-600 to-cyan-700 transition-all duration-300 group-hover:w-30"></span>
                  </Link>
                ))}

                {user && (
                  <button
                    onClick={() => {
                      logout();
                      setMenuSidebar(false);
                    }}
                    className="mt-6 px-4 py-2 cursor-pointer bg-gradient-to-r from-teal-600 to-cyan-700 text-white text-md rounded-lg shadow-sm hover:from-teal-800 hover:to-cyan-600"
                  >
                    Logout
                  </button>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


