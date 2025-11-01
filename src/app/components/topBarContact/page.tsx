"use client";

import Link from "next/link";
import React from "react";

interface TopContactBarProps {
  scrolled: boolean;
}

export default function TopContactBar({ scrolled }: TopContactBarProps) {
  return (
    <div
      className={`hidden lg:block fixed left-1/2 -translate-x-1/2 z-50 w-[96%] rounded-full overflow-hidden transition-all duration-500 shadow-md ${
        scrolled
          ? "top-0 opacity-0 -translate-y-10 pointer-events-none"
          : "top-[10px] opacity-100 translate-y-0"
      }`}
    >
      {/* Wrapper dengan gradient cross-platform */}
      <div className="py-2 px-6 text-white text-[15px] font-medium flex items-center justify-between bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-600 ios:bg-gradient-to-r ios:from-teal-600 ios:to-cyan-700 android:bg-gradient-to-r android:from-teal-600 android:to-cyan-700">
        
        {/* Kontak utama */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-white">
          {/* Email */}
          <Link
            href="mailto:idbalisundaram@gmail.com?subject=Halo&body=Halo,%20ada%20yang%20bisa%20kami%20bantu?"
            className="flex items-center space-x-2 hover:text-slate-200 transition-colors"
          >
            <span>📧</span>
            <span>idbalisundaram@gmail.com</span>
          </Link>

          {/* WhatsApp */}
          <Link
            href="https://wa.me/6281338905757?text=Halo%20Bali%20Sundaram%20Travel!"
            className="flex items-center space-x-2 hover:text-slate-200 transition-colors"
          >
            <span>📞</span>
            <span>+62 853-3377-5517</span>
          </Link>

          {/* Alamat (Maps) */}
          <Link
            href="https://maps.app.goo.gl/UuxM9DRKkz91c5Ry9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 hover:text-slate-200 transition-colors"
          >
            <span>📍</span>
            <span>JL. Pudak No 3A Batubulan, Kec. Sukawati, Gianyar</span>
          </Link>
        </div>

        {/* Sosial Media */}
        <div className="flex items-center space-x-4">
          {/* Facebook */}
          <Link
            href="https://www.facebook.com/groups/travelagent.indonesia/posts/2742958632557148/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.5a3.4 3.4 0 0 1 3.7-3.8 15.1 15.1 0 0 1 2.2.2v2.5h-1.2c-1.2 0-1.5.8-1.5 1.5V12H18l-.5 3h-3v7A10 10 0 0 0 22 12z" />
            </svg>
          </Link>

          {/* Instagram */}
          <Link
            href="https://www.instagram.com/wisatabalioke/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 2a3 3 0 1 1-3 3 3 3 0 0 1 3-3zm4.5-2.75a1.25 1.25 0 1 0 1.25 1.25A1.25 1.25 0 0 0 16.5 6.25z" />
            </svg>
          </Link>

          {/* TikTok */}
          <Link
            href="https://www.tiktok.com/@wisatabalioke"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.3 2h3a5.3 5.3 0 0 0 5.2 5.2v3A8.3 8.3 0 0 1 13.2 7v7.1a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2V2z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
