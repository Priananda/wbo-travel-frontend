"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import LogoSundaram from "@/app/assets/images/logo-sundaram.png";

export default function Navbar() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

// Saat komponen muncul
useEffect(() => {
  setIsVisible(true);

  const handleScroll = () => {
    // hanya aktif jika layar lebih dari 1024px (ukuran 'lg' di Tailwind)
    if (window.innerWidth >= 1024) {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    } else {
      // jika mobile/tablet, selalu false
      setIsScrolled(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  // jalankan sekali saat load untuk inisialisasi
  handleScroll();

  // bersihkan listener
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const menus = [
    { name: "Home", href: "/" },
    {
      name: "Paket Tour",
      href: "/paket-tour",
      dropdown: [
        { name: "Tour Grid", href: "/paket-tour/grid" },
        { name: "Tour List", href: "/paket-tour/list" },
        { name: "Tour Full Width", href: "/paket-tour/full-width" },
        { name: "Tour Details", href: "/paket-tour/details" },
        { name: "Tour Booking", href: "/paket-tour/booking" },
        { name: "Tour Search Result", href: "/paket-tour/search" },
        { name: "Add Tour", href: "/paket-tour/add" },
      ],
    },
    { name: "Activitas", href: "/activitas" },
    { name: "Blog", href: "/blog" },
    { name: "Galeri", href: "/galeri" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Kontak Kami", href: "/kontak-kami" },
    { name: "Tim Kami", href: "/tim-kami" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transform transition-all duration-700 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"
      } ${
        isScrolled
          ? "bg-white rounded-full px-10"
          : "bg-white rounded-none shadow-none px-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src={LogoSundaram} alt="LogoSundaram" className="w-24 h-auto rounded-full" />
        </div>

        {/* Menu Desktop */}
        <nav className="hidden lg:flex space-x-8 text-md font-normal relative">
          {menus.map((menu) => (
            <div
              key={menu.href}
              className="group relative"
              onMouseEnter={() => menu.dropdown && setOpenDropdown(menu.name)}
              onMouseLeave={() => menu.dropdown && setOpenDropdown(null)}
            >
              <Link
                href={menu.href}
                className={`inline-block transition-all duration-300 ease-in-out ${
                  pathname === menu.href
                    ? "text-red-600"
                    : "text-gray-700 group-hover:text-red-700"
                }`}
              >
                {menu.name}
              </Link>

              {/* Dropdown Desktop */}
              {menu.dropdown && (
                <div
                  className={`absolute left-0 mt-6 w-56 rounded-xl bg-white shadow-md py-3 transition-all duration-500 ease-out transform origin-top
                    ${
                      openDropdown === menu.name
                        ? "opacity-100 translate-y-0 scale-y-100 visible"
                        : "opacity-0 -translate-y-2 scale-y-95 invisible"
                    }`}
                >
                  {menu.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group/item flex items-center gap-2 px-5 py-2 text-[15px] text-gray-700 transition-all duration-300 ease-in-out hover:text-red-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 opacity-0 transform -translate-x-2 transition-all duration-300 group-hover/item:opacity-100 group-hover/item:translate-x-0"></span>
                      <span className="transition-all duration-300 transform group-hover/item:translate-x-1">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              {/* underline hover effect */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
            </div>
          ))}
        </nav>

        {/* Tombol Login + Hamburger */}
        <div className="flex items-center gap-5">
          <button
            className="bg-red-600 text-white font-semibold text-md shadow-md px-9 py-2 rounded-full hover:bg-red-700 transition cursor-pointer"
          >
            Login
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden focus:outline-none cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="url(#gradient)"
                strokeWidth="2.5"
              >
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="url(#gradient)"
                strokeWidth="2.5"
              >
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#f43f5e" />
                  </linearGradient>
                </defs>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-white shadow-inner transition-all duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 pb-5 space-y-2">
          {menus.map((menu) => (
            <div key={menu.href} className="relative">
              <div
                className="flex justify-between items-center py-2 cursor-pointer"
                onClick={() =>
                  menu.dropdown
                    ? setMobileDropdown(mobileDropdown === menu.name ? null : menu.name)
                    : setIsMobileMenuOpen(false)
                }
              >
                <Link
                  href={menu.href}
                  className={`transition-all duration-300 ${
                    pathname === menu.href
                      ? "text-red-700"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                >
                  {menu.name}
                </Link>

                {/* Panah dropdown */}
                {menu.dropdown && (
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-300 ${
                      mobileDropdown === menu.name ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                )}
              </div>

              {/* Dropdown Mobile */}
              {menu.dropdown && (
                <div
                  className={`pl-5 overflow-hidden transition-all duration-500 ease-in-out ${
                    mobileDropdown === menu.name
                      ? "max-h-96 opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-2"
                  }`}
                >
                  {menu.dropdown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 py-1 transition-all duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
