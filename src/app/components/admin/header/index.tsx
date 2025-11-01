'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu as MenuIcon, LogOut } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onToggleSidebar: () => void;
}

interface MeData {
  name: string;
  avatar_url?: string;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const [me, setMe] = useState<MeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found');
        const response = await axios.get('http://127.0.0.1:8000/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMe(response.data.user);
      } catch (error) {
        console.error('Gagal fetch user:', error);
        setMe(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/auth/admin/login');
  };

  return (
    <header className="w-full bg-white border-b border-slate-200  z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Sidebar Toggle */}
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MenuIcon size={20} className="text-gray-700" />
          </button>

          {/* Profile Section */}
          <div className="flex items-center space-x-5">
            <div
              ref={profileRef}
              className="relative flex items-center space-x-2 cursor-pointer select-none"
              onClick={() => setShowProfileMenu((prev) => !prev)}
            >
              {loading ? (
                <span className="text-sm text-gray-500">Loading...</span>
              ) : me ? (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-400 text-white font-semibold text-lg shadow-sm">
                      {me.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-800 font-medium">{me.name}</span>
                  </div>

                  {/* Dropdown dengan animasi */}
                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        key="profile-menu"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute right-0 top-12 w-48 bg-white border border-slate-100 rounded-lg shadow-md ring-1 ring-black/5 py-2 z-50 backdrop-blur-sm"
                      >
                        <div className="px-5 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-800">{me.name}</p>
                          <p className="text-xs text-gray-500">Administrator</p>
                        </div>

                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2 w-full font-medium text-left px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-all rounded-md"
                        >
                          <LogOut size={15} /> Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <span className="text-sm text-red-500">User not found</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}





























// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { Menu as MenuIcon, LogOut } from 'lucide-react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// interface HeaderProps {
//   onToggleSidebar: () => void;
// }

// interface MeData {
//   name: string;
//   avatar_url?: string;
// }

// export default function Header({ onToggleSidebar }: HeaderProps) {
//   const [me, setMe] = useState<MeData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const profileRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchMe = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error('Token not found');
//         const response = await axios.get('http://127.0.0.1:8000/api/me', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setMe(response.data.user);
//       } catch (error) {
//         console.error('Gagal fetch user:', error);
//         setMe(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMe();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
//         setShowProfileMenu(false);
//       }
//     };

//     if (showProfileMenu) document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [showProfileMenu]);

//   const handleSignOut = () => {
//     localStorage.removeItem('token');
//     router.push('/auth/admin/login');
//   };

//   return (
//     <header className="w-full bg-white border-b border-slate-200 shadow-sm shadow-slate-200 z-40">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between h-16">
//           {/* Sidebar Toggle */}
//           <button
//             onClick={onToggleSidebar}
//             className="p-2 rounded-lg hover:bg-gray-50"
//           >
//             <MenuIcon size={20} className="text-gray-700" />
//           </button>

//           {/* Profile Section */}
//           <div className="flex items-center space-x-5">
//             <div
//               ref={profileRef}
//               className="relative flex items-center space-x-2 cursor-pointer select-none"
//               onClick={() => setShowProfileMenu((prev) => !prev)}
//             >
//               {loading ? (
//                 <span className="text-sm text-gray-500">Loading...</span>
//               ) : me ? (
//                 <>
//                   {/* Avatar + Name */}
//                   <div className="flex items-center space-x-3">
//                     <div className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-400 text-white font-semibold text-xl shadow-sm">
//                       {me.name.charAt(0).toUpperCase()}
//                     </div>
//                     <span className="text-gray-800 font-medium">
//                       {me.name}
//                     </span>
//                   </div>

//                   {/* Dropdown Menu (no animation) */}
//                   {showProfileMenu && (
//                     <div className="absolute right-0 top-12 w-48 bg-white border border-slate-100 rounded-lg shadow-md ring-1 ring-black/5 py-2 z-50">
//                       <div className="px-5 py-2 border-b border-gray-100">
//                         <p className="text-sm font-medium text-gray-800">{me.name}</p>
//                         <p className="text-xs text-gray-500">Administrator</p>
//                       </div>

//                       <button
//                         onClick={handleSignOut}
//                         className="flex items-center gap-2 w-full font-medium text-left px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 rounded-md"
//                       >
//                         <LogOut size={15} /> Logout
//                       </button>
//                     </div>
//                   )}
//                 </>
//               ) : (
//                 <span className="text-sm text-red-500">User not found</span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }

















// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { Menu as MenuIcon, LogOut } from 'lucide-react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';

// interface HeaderProps {
//   onToggleSidebar: () => void;
// }

// interface MeData {
//   name: string;
//   avatar_url?: string;
// }

// export default function Header({ onToggleSidebar }: HeaderProps) {
//   const [me, setMe] = useState<MeData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const profileRef = useRef<HTMLDivElement>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchMe = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) throw new Error('Token not found');
//         const response = await axios.get('http://127.0.0.1:8000/api/me', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setMe(response.data.user);
//       } catch (error) {
//         console.error('Gagal fetch user:', error);
//         setMe(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMe();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
//         setShowProfileMenu(false);
//       }
//     };

//     if (showProfileMenu) document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [showProfileMenu]);

//   const handleSignOut = () => {
//     localStorage.removeItem('token');
//     router.push('/auth/admin/login');
//   };

//   return (
//     <header className="w-full bg-white border-b border-slate-200 shadow-sm shadow-slate-200 z-40">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex items-center justify-between h-16">
//           {/* Sidebar Toggle */}
//           <button
//             onClick={onToggleSidebar}
//             className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
//           >
//             <MenuIcon size={20} className="text-gray-700" />
//           </button>

//           {/* Profile Section */}
//           <div className="flex items-center space-x-5">
//             <div
//               ref={profileRef}
//               className="relative flex items-center space-x-2 cursor-pointer select-none"
//               onClick={() => setShowProfileMenu((prev) => !prev)}
//             >
//               {loading ? (
//                 <span className="text-sm text-gray-500">Loading...</span>
//               ) : me ? (
//                 <>
//                   {/* Avatar + Name */}
//                   <div className="flex items-center space-x-3 group">
//                     <div className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-400 text-white font-semibold text-xl shadow-sm">
//                       {me.name.charAt(0).toUpperCase()}
//                     </div>
//                     <span className="text-gray-800 font-medium group-hover:text-gray-900 transition-colors">
//                       {me.name}
//                     </span>
//                   </div>

//                   {/* Dropdown Menu */}
//                   <AnimatePresence>
//                     {showProfileMenu && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -5 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -5 }}
//                         transition={{ duration: 0.2, ease: 'easeOut' }}
//                         className="absolute right-0 top-12 w-48 bg-white border border-slate-100 rounded-lg shadow-md ring-1 ring-black/5 py-2 z-50 backdrop-blur-sm"
//                       >
//                         <div className="px-5 py-2 border-b border-gray-100">
//                           <p className="text-sm font-medium text-gray-800">{me.name}</p>
//                           <p className="text-xs text-gray-500">Administrator</p>
//                         </div>

//                         <button
//                           onClick={handleSignOut}
//                           className="flex items-center gap-2 w-full font-medium text-left px-5 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 transition-all rounded-md"
//                         >
//                           <LogOut size={15} /> Logout
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </>
//               ) : (
//                 <span className="text-sm text-red-500">User not found</span>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
