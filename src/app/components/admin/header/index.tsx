'use client';

import { useEffect, useRef, useState } from 'react';
import { Moon, Sun, Bell, Menu as MenuIcon } from 'lucide-react';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onToggleSidebar: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

interface MeData {
  name: string;
  avatar_url?: string;
}

export default function Header({ onToggleSidebar, isDarkMode, onToggleDarkMode }: HeaderProps) {
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/auth/admin/login');
  };

  return (
    <header className="w-full bg-white border-b border-slate-200 z-40">
      <div className="max-w-7xl mx-auto px-4  ">
        <div className="flex items-center justify-between h-16">
          {/* Hamburger */}
          <div className="flex items-center">
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MenuIcon size={20} className="text-gray-700 dark:text-gray-200" />
            </button>
          </div>

          {/* Right: darkmode + user */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <Sun size={20} className="text-gray-700 dark:text-gray-200" />
              ) : (
                <Moon size={20} className="text-gray-700 dark:text-gray-200" />
              )}
            </button>

            <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 relative">
              <Bell size={20} className="text-gray-700 dark:text-gray-200" />
              <span className="absolute top-1 right-1 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div
              className="flex items-center space-x-2 relative cursor-pointer"
              onClick={() => setShowProfileMenu((prev) => !prev)}
              ref={profileRef}
            >
              {loading ? (
                <span className="text-sm text-gray-500">Loading...</span>
              ) : me ? (
                <>
                  {me.avatar_url ? (
                    <Image
                      src={me.avatar_url}
                      alt="Avatar"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600" />
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {me.name}
                  </span>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-28 w-40 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50">
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-700 rounded-md"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
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
