"use client";

import React from "react";

interface ContactUsButtonProps {
  phone?: string; // Nomor WhatsApp tanpa tanda + (default: 6281338905757)
  message?: string; // Pesan default (akan di-encode otomatis)
  label?: string; // Teks tombol
  className?: string; // Styling tambahan opsional
}

export default function ContactUsButton({
  phone = "6281338905757",
  message = "Halo Bali Sundaram Travel",
  label = "Contact Us",
  className = "",
}: ContactUsButtonProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(waUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={`
        px-6 py-3 rounded-lg shadow-md text-white font-semibold text-base
        bg-gradient-to-r from-teal-600 to-cyan-700
        hover:from-teal-800 hover:to-cyan-600
        ${className}
      `}
    >
      {label}
    </button>
  );
}
