"use client";

import Image from "next/image";
import Link from "next/link";
import { hkGrotesk } from "@/app/fonts/fonts";
import FavoriteButton from "@/app/components/FavoriteButton";

interface PaketTour {
  id: number;
  title: string;
  slug: string;
  description?: string;
  price: string | number;
  duration_days?: number;
  duration_nights?: number;
  image: string;
  created_at: string;
}

interface PaketCardProps {
  paket: PaketTour;
}

export default function PaketCard({ paket }: PaketCardProps) {
  return (
    <div
      className={`flex flex-col md:flex-row p-2 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ${hkGrotesk.className}`}
    >
      {/* Gambar */}
      <div className="relative w-full md:w-1/2 h-56 flex-shrink-0">
        <Image
          src={`http://127.0.0.1:8000/storage/${paket.image}`}
          alt={paket.title}
          fill
          className="object-cover rounded-sm"
        />

        {/* Icon Favorite */}
        <div className="absolute top-2 right-2">
          <FavoriteButton paketId={paket.id} />
        </div>
      </div>

      {/* Konten */}
      <div className="flex flex-col justify-between p-4 w-full md:w-1/2">
        {/* Durasi */}
        <div className="flex items-center -mt-1 mb-2">
          <div className="flex items-center text-md bg-teal-50 border border-teal-700 text-teal-700 px-3 py-1 rounded-md font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {paket.duration_days ?? 1} day
          </div>
        </div>

        {/* Judul */}
        <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-4 line-clamp-2 drop-shadow-xs">
          {paket.title}
        </h3>

        {/* Harga + Tombol */}
        <div className="flex items-center justify-between">
          <p className="font-bold text-gray-900 text-lg drop-shadow-xs">
            Rp{Number(paket.price).toLocaleString("id-ID")}
          </p>
          <Link
            href={`/packages/${paket.slug}`}
            className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-lg shadow-sm transition-all duration-300 font-medium"
          >
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
}
