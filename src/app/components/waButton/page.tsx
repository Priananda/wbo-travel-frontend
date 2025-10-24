"use client";

import Image from "next/image";
import Link from "next/link";
import whatsappIcon from "@/app/assets/images/whatsapp.png";

export default function WhatsAppButton() {
  const whatsappNumber = "6281338905757";
  const message = encodeURIComponent("Halo, saya ingin bertanya...");

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="hover:scale-110 transition-transform">
        <Image
          src={whatsappIcon}
          alt="WhatsApp"
          width={65}
          height={60}
          priority
        />
      </div>
    </Link>
  );
}
