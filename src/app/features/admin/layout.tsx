"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/app/components/admin/sidebar";
import Header from "@/app/components/admin/header";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="flex relative overflow-y-hidden">
      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: -260, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -260, opacity: 0 }}
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 0.25,
            }}
            className="fixed lg:static z-40"
          >
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Konten utama */}
      <motion.div
        layout
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.25,
        }}
        className="flex-1 min-h-screen bg-gray-50 transition-all"
        style={{
          marginLeft: !isMobile && sidebarOpen ? 240 : 0,
        }}
      >
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="p-3">{children}</main>
      </motion.div>
    </div>
  );
}













// "use client";

// import { useState, useEffect } from "react";
// import Sidebar from "@/app/components/admin/sidebar";
// import Header from "@/app/components/admin/header";
// import { motion, AnimatePresence } from "framer-motion";

// export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 1024);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   useEffect(() => {
//     if (isMobile) setSidebarOpen(false);
//     else setSidebarOpen(true);
//   }, [isMobile]);

//   return (
//     <div className="flex relative  overflow-y-hidden">
//       {/* Animasi Sidebar */}
//       <AnimatePresence initial={false}>
//         {sidebarOpen && (
//           <motion.div
//             key="sidebar"
//             initial={{ x: -260, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: -260, opacity: 0 }}
//             transition={{ type: "tween", duration: 0.3 }}
//             className="fixed lg:static z-40"
//           >
//             <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Konten utama dengan transisi halus */}
//       <motion.div
//         layout
//         transition={{ type: "spring", stiffness: 120, damping: 15 }}
//         className={`flex-1 min-h-screen bg-gray-50`}
//         style={{
//           marginLeft: !isMobile && sidebarOpen ? 240 : 0,
//         }}
//       >
//         <Header
//           onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
//           isDarkMode={false}
//           onToggleDarkMode={() => {}}
//         />

//         <main className="p-3 transition-all duration-300 ease-in-out">
//           {children}
//         </main>
//       </motion.div>
//     </div>
//   );
// }
