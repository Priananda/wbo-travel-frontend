// app/admin/layout.tsx
"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/app/components/admin/sidebar";
import Header from "@/app/components/admin/header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
    else setSidebarOpen(true);
  }, [isMobile]);

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={`flex-1 min-h-screen bg-gray-50 transition-all ${
          !isMobile && sidebarOpen ? "ml-60" : "ml-0"
        }`}
      >
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          isDarkMode={false}
          onToggleDarkMode={() => {}}
        />

        <main className="p-3">{children}</main>
      </div>
    </div>
  );
}
