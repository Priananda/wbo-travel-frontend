"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import GalleryCarousel from '@/app/components/GalleryCarousel/index';

interface PaketTourDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string | number;
  duration_days?: number;
  duration_nights?: number;
  maximum_participants?: number;
  minimum_age?: number;
  pickup_location?: string;
  image: string;
  created_at: string;
}

export default function PaketTourDetailPage() {
  const { slug } = useParams();
  const [paket, setPaket] = useState<PaketTourDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchDetail = async () => {
      if (!token) return setLoading(false);
      try {
        const res = await axios.get<PaketTourDetail>(
          `http://127.0.0.1:8000/api/paket-tours/${slug}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPaket(res.data);
      } catch {
        setPaket(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug, token]);

  if (loading) return <Loader2 className="animate-spin text-cyan-700 w-8 h-8 mx-auto mt-24" />;
  if (!paket) return <p className="text-center mt-24 text-gray-500">Paket tidak ditemukan</p>;

  return (
    
    <div className="max-w-6xl mx-auto px-4 py-10">
        <GalleryCarousel />
      <div className="relative w-full h-64 md:h-96 mb-6">
        <Image src={`http://127.0.0.1:8000/storage/${paket.image}`} alt={paket.title} fill className="object-cover rounded-lg" />
      </div>

      <h1 className="text-3xl font-bold mb-4">{paket.title}</h1>

      <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-700">
        <span>⏱️ {paket.duration_days ?? 5} Hari {paket.duration_nights ?? 4} Malam</span>
        {paket.maximum_participants && <span>👥 Maks. {paket.maximum_participants} Peserta</span>}
        {paket.minimum_age && <span>🎂 Usia min. {paket.minimum_age} Tahun</span>}
        {paket.pickup_location && <span>🚗 Penjemputan: {paket.pickup_location}</span>}
      </div>

      <p className="text-gray-800 mb-6">{paket.description}</p>

      <p className="text-2xl font-bold mb-4">Rp{Number(paket.price).toLocaleString("id-ID")}</p>
    </div>
  );
}
