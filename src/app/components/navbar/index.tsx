"use client";

import Link from "next/link";
import Image from "next/image";
import { hkGrotesk } from "@/app/fonts/fonts";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/services/Auth";
import { motion, AnimatePresence } from "framer-motion";
import LogoWBO from "@/app/assets/images/logo-wbo.png";
import Loading from "@/app/components/loading/index";
import TopBarContact from "@/app/components/topBarContact/page";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [menuSidebar, setMenuSidebar] = useState(false);
  const [isLoadingNav, setIsLoadingNav] = useState(false);
  const [targetHref, setTargetHref] = useState<string | null>(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Detect route change selesai
  useEffect(() => {
    if (isLoadingNav && targetHref && pathname === targetHref) {
      setIsLoadingNav(false);
      setTargetHref(null);
    }
  }, [pathname, isLoadingNav, targetHref]);

  // Navigasi
  const handleNavClick = async (href: string) => {
    if (pathname === href) return;
    setIsLoadingNav(true);
    setTargetHref(href);
    router.push(href);
  };

  // Login
  const handleLoginClick = async () => {
    setIsLoadingNav(true);
    setTargetHref("/auth/users/login");
    router.push("/auth/users/login");
  };

  // Logout
  const handleLogoutClick = async () => {
    setIsLoadingNav(true);
    try {
      await logout();
      setTargetHref("/auth/users/login");
      router.push("/auth/users/login");
    } catch (err) {
      console.error("Logout gagal:", err);
      setIsLoadingNav(false);
    }
  };

  // Menu list
  const menuItems = [
    { href: "/home", label: "Home" },
    { href: "/packages", label: "Paket Bali Tour" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Kontak" },
    { href: "/about-us", label: "Tentang Kami" },
    { href: "/blogs", label: "Blog" },
  ];

  return (
    <>
      {/* Overlay loading */}
      {isLoadingNav && (
        <div>
          <Loading />
        </div>
      )}

      {/* Top Bar */}
      <TopBarContact scrolled={scrolled} />

      {/* Main Navbar */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-500 shadow-md rounded-2xl w-[96%] md:w-[98%] lg:w-[99%] max-w-6xl ${
          scrolled ? "top-2 bg-white" : "top-[60px] bg-white"
        }`}
      >
        <div className="px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-5">
            <Image src={LogoWBO} alt="Logo Bali Wisata Oke" width={45} height={45} />
            <span className={`text-lg font-semibold ${hkGrotesk.className}`}>
              <span className="bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent">WISATA</span>{" "}
              <span className="text-black">BALI OKE</span>
            </span>
          </Link>

          {/* Menu Desktop */}
          <nav className={`hidden lg:flex text-md space-x-8 text-gray-800 font-semibold  ${hkGrotesk.className}`}>
            {menuItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`relative transition group cursor-pointer ${
                  pathname === item.href ? "text-teal-700" : "hover:text-teal-800"
                }`}
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-teal-600 to-cyan-700 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className={`hidden cursor-pointer lg:block text-md text-gray-800 font-semibold ${hkGrotesk.className}`}>
                  Hi, {user.name}
                </span>
                <button
                  onClick={handleLogoutClick}
                  className={`hidden lg:block px-5 py-2 bg-cyan-700 text-white rounded-lg shadow-sm hover:bg-cyan-800 font-medium ${hkGrotesk.className}`}
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLoginClick}
                className={`hidden lg:block px-5 py-2 bg-cyan-700 text-white rounded-lg shadow-sm hover:bg-cyan-800 font-medium ${hkGrotesk.className}`}
              >
                Login
              </button>
            )}

            {/* Hamburger Icon */}
            <button
              onClick={() => setMenuSidebar(true)}
              className="block lg:hidden text-gray-800 hover:text-cyan-700 cursor-pointer"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar Mobile */}
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
              className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-40 p-6 flex flex-col items-start"
            >
              <div className="w-full flex justify-between items-center mb-6">
                <div className="text-lg font-semibold text-gray-800">
                  {user ? `Hi, ${user.name}` : "Selamat Datang"}
                </div>
                <button
                  onClick={() => setMenuSidebar(false)}
                  className="text-gray-800 text-2xl hover:text-cyan-700"
                >
                  ✕
                </button>
              </div>

              <nav className="flex flex-col space-y-4 text-gray-800 font-semibold w-full">
                {menuItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => {
                      setMenuSidebar(false);
                      handleNavClick(item.href);
                    }}
                    className={`text-left cursor-pointer ${
                      pathname === item.href ? "text-teal-700" : "hover:text-teal-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

                {user ? (
                  <button
                    onClick={() => {
                      setMenuSidebar(false);
                      handleLogoutClick();
                    }}
                       className="mt-6 w-full px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg shadow-sm"
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setMenuSidebar(false);
                      handleLoginClick();
                    }}
                    className="mt-6 w-full px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg shadow-sm"
                  >
                    Login
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


