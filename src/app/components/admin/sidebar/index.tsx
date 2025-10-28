"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  ChevronDown,
  LogOut,
  X,
} from "lucide-react";
import { hkGrotesk } from "@/app/fonts/fonts";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleMenu = (name: string) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  const handleLinkClick = () => {
    if (isMobile) onClose();
  };

  const menuItems = [
  {
    name: "Dashboard",
    href: "/features/admin/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
   {
    name: "Order User",
    icon: <FileText size={18} />,
    sub: [
      { name: "View Order", href: "/features/admin/cart/view" },
    ],
  },
  {
    name: "Paket Tour",
    icon: <FileText size={18} />,
    sub: [
      { name: "Input Paket Tour", href: "/features/admin/packages/input" },
      { name: "View Paket Tour", href: "/features/admin/packages/view" },
    ],
  },
  {
    name: "Blog",
    icon: <FileText size={18} />,
    sub: [
      { name: "Input Blog", href: "/features/admin/blogs/input" },
      { name: "View Blog", href: "/features/admin/blogs/view" },
      { name: "View Komentar User", href: "/features/admin/komentar/view" },
    ],
  },
];


  return (
    <>
      {/* Overlay untuk mobile */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : isMobile ? -300 : -250,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 h-screen w-60 bg-white shadow-md border border-slate-100 z-50`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 mt-2 ">
          <span
            className={`text-lg md:text-xl lg:text-xl font-bold drop-shadow-xs ${hkGrotesk.className}`}
          >
            <span className="bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent">
              WISATA
            </span>{" "}
            <span className="text-black">BALI OKE</span>
          </span>

          {isMobile && (
            <button onClick={onClose} className="text-gray-600 hover:text-red-600">
              <X size={22} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isExpanded = openMenu === item.name;

              if (item.sub) {
                return (
                  <li key={item.name}>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={`mt-3 flex justify-between w-full items-center px-3 py-2 rounded-lg text-sm ${
                        isExpanded ? "bg-cyan-100 text-cyan-700" : "hover:bg-gray-100 text-gray-800" 
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        {item.icon} {item.name}
                      </span>
                      <motion.span
                        animate={{ rotate: isExpanded ? 0 : -90 }}
                        transition={{ duration: 0.25 }}
                      >
                        <ChevronDown size={16} />
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="mt-3 ml-5 border-l border-cyan-700 pl-4 space-y-1"
                        >
                          {item.sub.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.href}
                                onClick={handleLinkClick}
                                className={`block px-3 py-2 text-sm rounded-md ${
                                  pathname === subItem.href
                                    ? "bg-cyan-100 text-cyan-700"
                                    : "hover:bg-gray-100 text-gray-800 "
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={item.name}>
                  <Link
                    href={item.href!}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                      pathname === item.href
                        ? "bg-cyan-700 text-white"
                        : "hover:bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.icon} {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 w-full px-6">
          <button className="flex items-center gap-3 text-gray-600 hover:text-red-600">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </motion.aside>
    </>
  );
}
