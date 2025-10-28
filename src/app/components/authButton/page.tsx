"use client";

import React from "react";
import { cn } from "@/app/lib/utils"; 

interface AuthButtonProps {
  text: string;
  isLoading?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

export default function AuthButton({
  text,
  isLoading = false,
  onClick,
  type = "button",
  className,
}: AuthButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={cn(
        "w-full py-3 text-white text-base font-semibold rounded-md shadow-md transition-all duration-300",
        "bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-800 hover:to-cyan-600",
        "disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]",
        "ios:bg-gradient-to-r ios:from-teal-600 ios:to-cyan-700 android:bg-gradient-to-r android:from-teal-600 android:to-cyan-700",
        className
      )}
    >
      {isLoading ? "Menunggu..." : text}
    </button>
  );
}
