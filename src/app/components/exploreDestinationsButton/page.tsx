"use client";

import Link from "next/link";
import React from "react";

interface GradientButtonProps {
  href?: string; // opsional → bisa pakai Link atau button biasa
  label: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function GradientButton({
  href,
  label,
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: GradientButtonProps) {
  const baseClasses =
    "px-6 py-3 text-lg font-semibold rounded-lg text-white transition duration-300 transform hover:scale-110 shadow-md " +
    // Gradient aman di semua device (iOS, Android, Desktop)
    "bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-800 hover:to-cyan-600 " +
    "ios:bg-gradient-to-r ios:from-teal-600 ios:to-cyan-700 android:bg-gradient-to-r android:from-teal-600 android:to-cyan-700 " +
    className;

  // Jika ada `href`, render <Link>; kalau tidak, render <button>
  return href ? (
    <Link href={href} className={baseClasses}>
      {label}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${
        disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {label}
    </button>
  );
}
