"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, ChevronDown, X } from "lucide-react";
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
      sub: [{ name: "View Order", href: "/features/admin/cart/view" }],
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
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      {isOpen && (
        <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-sm border-r border-slate-200 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
            <span
              className={`text-xl font-semibold tracking-tight ${hkGrotesk.className}`}
            >
              <span className="text-cyan-700">Wisata</span>{" "}
              <span className="text-gray-800">Bali Oke</span>
            </span>

            {isMobile && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="mt-5 px-4 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isExpanded = openMenu === item.name;

                if (item.sub) {
                  return (
                    <li key={item.name}>
                      {/* Button utama */}
                      <button
                        onClick={() => toggleMenu(item.name)}
                        className={`mt-2 flex justify-between items-center w-full px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                          isExpanded
                            ? "bg-cyan-50 text-cyan-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          {item.icon} {item.name}
                        </span>
                        <ChevronDown
                          size={15}
                          className={`transform transition-transform duration-300 ${
                            isExpanded ? "rotate-0" : "-rotate-90"
                          }`}
                        />
                      </button>

                      {/* Submenu dengan animasi halus */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-linear ${
                          isExpanded ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <ul className="mt-2 ml-6 pl-2 border-l border-cyan-100 space-y-1">
                          {item.sub.map((subItem) => (
                            <li key={subItem.name}>
                              <Link
                                href={subItem.href}
                                onClick={handleLinkClick}
                                className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                                  pathname === subItem.href
                                    ? "bg-cyan-100 text-cyan-700 font-medium"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                                }`}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href!}
                      onClick={handleLinkClick}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? "bg-cyan-700 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {item.icon} {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      )}
    </>
  );
}





























// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { LayoutDashboard, FileText, ChevronDown, X } from "lucide-react";
// import { hkGrotesk } from "@/app/fonts/fonts";

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function Sidebar({ isOpen, onClose }: SidebarProps) {
//   const pathname = usePathname();
//   const [openMenu, setOpenMenu] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 1024);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const toggleMenu = (name: string) => {
//     setOpenMenu((prev) => (prev === name ? null : name));
//   };

//   const handleLinkClick = () => {
//     if (isMobile) onClose();
//   };

//   const menuItems = [
//     {
//       name: "Dashboard",
//       href: "/features/admin/dashboard",
//       icon: <LayoutDashboard size={18} />,
//     },
//     {
//       name: "Order User",
//       icon: <FileText size={18} />,
//       sub: [{ name: "View Order", href: "/features/admin/cart/view" }],
//     },
//     {
//       name: "Paket Tour",
//       icon: <FileText size={18} />,
//       sub: [
//         { name: "Input Paket Tour", href: "/features/admin/packages/input" },
//         { name: "View Paket Tour", href: "/features/admin/packages/view" },
//       ],
//     },
//     {
//       name: "Blog",
//       icon: <FileText size={18} />,
//       sub: [
//         { name: "Input Blog", href: "/features/admin/blogs/input" },
//         { name: "View Blog", href: "/features/admin/blogs/view" },
//         { name: "View Komentar User", href: "/features/admin/komentar/view" },
//       ],
//     },
//   ];

//   return (
//     <>
//       {/* Overlay untuk mobile */}
//       {isMobile && isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40"
//           onClick={onClose}
//         />
//       )}

//       {/* Sidebar tanpa animasi */}
//       {isOpen && (
//         <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-sm border-r border-slate-200 z-50 flex flex-col">
//           {/* Header */}
//           <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
//             <span
//               className={`text-xl font-semibold tracking-tight ${hkGrotesk.className}`}
//             >
//               <span className="text-cyan-700">Wisata</span>{" "}
//               <span className="text-gray-800">Bali Oke</span>
//             </span>

//             {isMobile && (
//               <button
//                 onClick={onClose}
//                 className="text-gray-500 hover:text-gray-700 transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             )}
//           </div>

//           {/* Navigation */}
//           <nav className="mt-5 px-4 flex-1 overflow-y-auto">
//             <ul className="space-y-1">
//               {menuItems.map((item) => {
//                 const isExpanded = openMenu === item.name;

//                 if (item.sub) {
//                   return (
//                     <li key={item.name}>
//                       <button
//                         onClick={() => toggleMenu(item.name)}
//                         className={`flex justify-between items-center w-full px-3 py-2.5 rounded-md text-sm font-medium ${
//                           isExpanded
//                             ? "bg-cyan-50 text-cyan-700"
//                             : "text-gray-700 hover:bg-gray-50"
//                         }`}
//                       >
//                         <span className="flex items-center gap-3">
//                           {item.icon} {item.name}
//                         </span>
//                         <ChevronDown
//                           size={15}
//                           className={`transition-transform ${
//                             isExpanded ? "rotate-0" : "-rotate-90"
//                           }`}
//                         />
//                       </button>

//                       {isExpanded && (
//                         <ul className="mt-2 ml-6 pl-2 border-l border-cyan-100 space-y-1">
//                           {item.sub.map((subItem) => (
//                             <li key={subItem.name}>
//                               <Link
//                                 href={subItem.href}
//                                 onClick={handleLinkClick}
//                                 className={`block px-3 py-2 text-sm rounded-md ${
//                                   pathname === subItem.href
//                                     ? "bg-cyan-100 text-cyan-700 font-medium"
//                                     : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
//                                 }`}
//                               >
//                                 {subItem.name}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       )}
//                     </li>
//                   );
//                 }

//                 return (
//                   <li key={item.name}>
//                     <Link
//                       href={item.href!}
//                       onClick={handleLinkClick}
//                       className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium ${
//                         pathname === item.href
//                           ? "bg-cyan-700 text-white"
//                           : "text-gray-700 hover:bg-gray-50"
//                       }`}
//                     >
//                       {item.icon} {item.name}
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//           </nav>
//         </aside>
//       )}
//     </>
//   );
// }











// "use client";
// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   LayoutDashboard,
//   FileText,
//   ChevronDown,
//   // LogOut,
//   X,
// } from "lucide-react";
// import { hkGrotesk } from "@/app/fonts/fonts";

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// export default function Sidebar({ isOpen, onClose }: SidebarProps) {
//   const pathname = usePathname();
//   const [openMenu, setOpenMenu] = useState<string | null>(null);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 1024);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   const toggleMenu = (name: string) => {
//     setOpenMenu((prev) => (prev === name ? null : name));
//   };

//   const handleLinkClick = () => {
//     if (isMobile) onClose();
//   };

//   const menuItems = [
//   {
//     name: "Dashboard",
//     href: "/features/admin/dashboard",
//     icon: <LayoutDashboard size={18} />,
//   },
//    {
//     name: "Order User",
//     icon: <FileText size={18} />,
//     sub: [
//       { name: "View Order", href: "/features/admin/cart/view" },
//     ],
//   },
//   {
//     name: "Paket Tour",
//     icon: <FileText size={18} />,
//     sub: [
//       { name: "Input Paket Tour", href: "/features/admin/packages/input" },
//       { name: "View Paket Tour", href: "/features/admin/packages/view" },
//     ],
//   },
//   {
//     name: "Blog",
//     icon: <FileText size={18} />,
//     sub: [
//       { name: "Input Blog", href: "/features/admin/blogs/input" },
//       { name: "View Blog", href: "/features/admin/blogs/view" },
//       { name: "View Komentar User", href: "/features/admin/komentar/view" },
//     ],
//   },
// ];


//   return (
//     <>
//       {/* Overlay untuk mobile */}
//       <AnimatePresence>
//         {isMobile && isOpen && (
//           <motion.div
//             className="fixed inset-0 bg-black/40 z-40"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//           />
//         )}
//       </AnimatePresence>

//       {/* Sidebar */}
//       <motion.aside
//         initial={false}
//         animate={{
//           x: isOpen ? 0 : isMobile ? -300 : -250,
//         }}
//         transition={{ duration: 0.3, ease: "easeInOut" }}
//         className={`fixed top-0 left-0 h-screen w-60 bg-white shadow-md border border-slate-100 z-50`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between px-6 py-5 mt-2 ">
//           <span
//             className={`text-lg md:text-xl lg:text-xl font-bold drop-shadow-xs ${hkGrotesk.className}`}
//           >
//             <span className="bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent">
//               WISATA
//             </span>{" "}
//             <span className="text-black">BALI OKE</span>
//           </span>

//           {isMobile && (
//             <button onClick={onClose} className="text-gray-600 hover:text-red-600">
//               <X size={22} />
//             </button>
//           )}
//         </div>

//         {/* Navigation */}
//         <nav className="mt-4 px-4">
//           <ul className="space-y-1">
//             {menuItems.map((item) => {
//               const isExpanded = openMenu === item.name;

//               if (item.sub) {
//                 return (
//                   <li key={item.name}>
//                     <button
//                       onClick={() => toggleMenu(item.name)}
//                       className={`mt-3 flex justify-between w-full items-center px-3 py-2 rounded-lg text-sm ${
//                         isExpanded ? "bg-cyan-100 text-cyan-700" : "hover:bg-gray-100 text-gray-800" 
//                       }`}
//                     >
//                       <span className="flex items-center gap-3">
//                         {item.icon} {item.name}
//                       </span>
//                       <motion.span
//                         animate={{ rotate: isExpanded ? 0 : -90 }}
//                         transition={{ duration: 0.25 }}
//                       >
//                         <ChevronDown size={16} />
//                       </motion.span>
//                     </button>

//                     <AnimatePresence>
//                       {isExpanded && (
//                         <motion.ul
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: "auto", opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           transition={{ duration: 0.25 }}
//                           className="mt-3 ml-5 border-l border-cyan-700 pl-4 space-y-1"
//                         >
//                           {item.sub.map((subItem) => (
//                             <li key={subItem.name}>
//                               <Link
//                                 href={subItem.href}
//                                 onClick={handleLinkClick}
//                                 className={`block px-3 py-2 text-sm rounded-md ${
//                                   pathname === subItem.href
//                                     ? "bg-cyan-100 text-cyan-700"
//                                     : "hover:bg-gray-100 text-gray-800 "
//                                 }`}
//                               >
//                                 {subItem.name}
//                               </Link>
//                             </li>
//                           ))}
//                         </motion.ul>
//                       )}
//                     </AnimatePresence>
//                   </li>
//                 );
//               }

//               return (
//                 <li key={item.name}>
//                   <Link
//                     href={item.href!}
//                     onClick={handleLinkClick}
//                     className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
//                       pathname === item.href
//                         ? "bg-cyan-700 text-white"
//                         : "hover:bg-gray-100 text-gray-800"
//                     }`}
//                   >
//                     {item.icon} {item.name}
//                   </Link>
//                 </li>
//               );
//             })}
//           </ul>
//         </nav>

//         {/* Logout */}
//         {/* <div className="absolute bottom-4 w-full px-6">
//           <button className="flex items-center gap-3 text-gray-600 hover:text-red-600">
//             <LogOut size={18} /> Logout
//           </button>
//         </div> */}
//       </motion.aside>
//     </>
//   );
// }
