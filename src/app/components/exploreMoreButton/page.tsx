"use client";

import Link from "next/link";
import React from "react";
import { hkGrotesk } from "@/app/fonts/fonts";

interface ExploreButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export default function ExploreButton({
  href,
  label = "Explore More",
  className = "",
}: ExploreButtonProps) {
  return (
    <Link
      href={href}
      className={`
        inline-block px-6 py-2 text-white rounded-lg shadow-md
        font-semibold text-base transition duration-300 transform hover:scale-105
        bg-gradient-to-r from-teal-600 to-cyan-700
        hover:from-teal-800 hover:to-cyan-600
        active:scale-95
        ${hkGrotesk.className}
        ${className}
      `}
    >
      {label}
    </Link>
  );
}
