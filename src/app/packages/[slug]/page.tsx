"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import { hkGrotesk } from "@/app/fonts/fonts";
import GalleryCarousel from "@/app/components/galleryCarousel/index";

import {
  Calendar,
  Users,
  User,
  MapPin,
  Info,
  CreditCard,
  XCircle,
  CheckCircle,
  Building2,
   Tag,
   Plane,
  Map as MapIcon, 
} from "lucide-react";

import TourPlanAccordion from "@/app/components/tourPlanAccordion";
import AddToCart from "@/app/components/addToCart/index";
import Loading from "@/app/components/loading/index";

interface PaketTourDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string | number;
  stock: string | number;
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

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get<PaketTourDetail>(
          `http://127.0.0.1:8000/api/paket-tours/${slug}`
        );
        setPaket(res.data);
      } catch {
        setPaket(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  if (loading) return <Loading />; 

  if (!paket)
    return (
      <p className="text-center mt-24 text-gray-500">
        Paket tidak ditemukan
      </p>
    );

// 🔹 Deskripsi khusus berdasarkan slug
const deskripsiKhusus =
  slug === "bali-paket-tour-3-hari-2-malam-adventure" ? (
    <DeskripsiA paket={paket} />
  ) : slug === "bali-paket-tour-3-hari-2-malam-kintamani-tanah-lot-ubud" ? (
    <DeskripsiB paket={paket} />
  ) : slug === "bali-paket-tour-3-hari-2-malam-kintamani-tanah-lot-benoa" ? (
    <DeskripsiC paket={paket} />
  ) : slug === "bali-paket-tour-4-hari-3-malam-adventure" ? (
    <DeskripsiD paket={paket} />
  ) : slug === "bali-paket-tour-4-hari-3-malam-kintamani-bedugul-tanah-lot" ? (
    <DeskripsiE paket={paket} />
  ) : slug === "bali-paket-tour-4-hari-3-malam-kintamani-tanah-lot-bedugul" ? (
    <DeskripsiF paket={paket} />
  ) : slug === "bali-paket-tour-5-hari-4-malam" ? (
    <DeskripsiG paket={paket} />
  ) : slug === "bali-paket-tour-5-hari-4-malam-adventure" ? (
    <DeskripsiH paket={paket} />
  ) : slug ===
    "bali-paket-tour-5-hari-4-malam-kopi-luwak-pantai-melasti-uluwatu" ? (
    <DeskripsiI paket={paket} />
  ) : slug === "bali-paket-tour-liburan-1-hari-nusa-penida-bagian-barat" ? (
    <DeskripsiJ paket={paket} />
  ) : slug === "bali-paket-tour-liburan-1-hari-nusa-penida-bagian-timur" ? (
    <DeskripsiK paket={paket} />
  ) : slug === "bali-paket-tour-eksplorasi-4-hari-3-malam-keajaiban-wisata" ? (
    <DeskripsiL paket={paket} />
  ) : slug ===
    "bali-paket-tour-eksplorasi-4-hari-3-malam-keajaiban-wisata-bali" ? (
    <DeskripsiM paket={paket} />
  ) : slug === "bali-paket-tour-3-hari-2-malam-tanah-lot-dan-kintamani" ? (
    <DeskripsiN paket={paket} />
  ) : slug === "paket-bulan-madu-3-hari-2-malam" ? (
    <DeskripsiO paket={paket} />
  ) : slug ===
    "paket-spesial-4-hari-3-malam-dengan-pesona-keindahan-alam-bali" ? (
    <DeskripsiP paket={paket} />
  ) : slug === "paket-wisata-bali-fullday-uluwatu-tour" ? (
    <DeskripsiQ paket={paket} />
  ) : slug === "paket-wisata-bali-fullday-bedugul-tour" ? (
    <DeskripsiR paket={paket} />
  ) : slug === "paket-wisata-bali-fullday-kintamani-tour" ? (
    <DeskripsiS paket={paket} />
  ) : slug === "paket-wisata-bali-fullday-ubud-tour" ? (
    <DeskripsiT paket={paket} />
  )  : slug === "paket-wisata-bali-dan-nusa-penida-barat-liburan-4-hari-3-malam" ? (
    <DeskripsiU paket={paket} />
  ) 
  : null;


  return (
    
    <div className="min-h-screen bg-white py-10">
      <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
      </div>

      {/* Grid dua kolom */}
      <div className="mt-32 px-4 lg:px-0 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kiri - Gambar */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative w-full h-[370px]">
            <Image
              src={`http://127.0.0.1:8000/storage/${paket.image}`}
              alt={paket.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Kanan - Detail + AddToCart */}
     
<div
  className={`bg-white rounded-xl shadow-md border border-gray-300 p-6 flex flex-col justify-between ${hkGrotesk.className}`}
>
  {/* 🔹 Judul & Harga */}
  <div>
    <h1 className="text-3xl font-semibold text-gray-900 mb-3">
      {paket.title}
    </h1>

    {/* 🔹 Label "From" + Harga */}
    <div className="text-start mb-6">
      <div className="flex text-lg gap-2 mb-2">
        <Tag className="w-6 h-6 text-red-500" />
        <span className="font-semibold">From</span>
      </div>

      <p className="text-2xl font-semibold text-cyan-700 mb-6">
        Rp{Number(paket.price).toLocaleString("id-ID")}
      </p>

      {/* 🔹 Garis putus-putus + pesawat */}
      <div className="relative flex items-center justify-center">
        <div className="w-full border-t-2 border-dashed border-cyan-700"></div>
        <Plane className="absolute  text-cyan-700 w-8 h-8 bg-white px-1" />
      </div>
    </div>

    {/* 🔹 Deskripsi */}
    <p className="text-gray-800 text-md leading-relaxed font-medium mb-4">
      {paket.description}
    </p>
  </div>

  {/* 🔹 Tombol AddToCart */}
  <AddToCart
    paketId={paket.id}
    title={paket.title}
    price={Number(paket.price)}
    image={`http://127.0.0.1:8000/storage/${paket.image}`}
    description={paket.description}
  />
</div>
      </div>
      <GalleryCarousel />  
      {deskripsiKhusus}
    </div>
  );
}


/* === COMPONENT DESKRIPSI TAMBAHAN === */

// SLUG 1
function DeskripsiA({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">

  {/* 🔹 Info Ringkas */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
  <InfoItem
    icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
    title="Durasi"
    value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
  />
  <InfoItem
    icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
    title="Maksimal Peserta"
    value={paket.maximum_participants ?? 40}
  />
  <InfoItem
    icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
    title="Usia Minimum"
    value={`${paket.minimum_age ?? 3}+`}
  />
  <InfoItem
    icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
    title="Penjemputan"
    value={paket.pickup_location ?? "Bus/Mobil"}
  />
</div>

  {/* 🔹 Deskripsi */}
  <section className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" />
      Deskripsi Paket
    </h2>
    <p className="text-gray-700 leading-8 text-justify">
      Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman
      tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani,
      Tirtam Empul, dan tentu saja petualangan ATV serta Watersport. Dengan
      pemandangan alam yang memukau, budaya yang kaya, dan pengalaman kuliner
      yang lezat, paket ini dirancang untuk memenuhi berbagai selera wisatawan.
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-8 shadow-sm border border-cyan-100">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga akan mendapat extra bed sesuai ketersediaan.</li>
      <li>Anak 0–4 tahun gratis (tanpa fasilitas tambahan).</li>
      <li>Anak 5–9 tahun 50% harga dewasa (sharing room).</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% deposit wajib ditransfer saat pemesanan.</li>
      <li>Transfer dilakukan setelah menerima invoice melalui WhatsApp/email.</li>
      <li>Bukti transfer dikirim melalui WhatsApp atau email kami.</li>
      <li>Detail invoice dikirim sebagai bukti konfirmasi reservasi.</li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Deposit akan dikembalikan sesuai kebijakan vendor (hotel, restoran, dll).</li>
      <li>Sisa pembayaran dikembalikan mengikuti ketentuan masing-masing vendor.</li>
    </ul>
  </section>

  {/* 🔹 Pilihan Hotel */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <Building2 className="text-cyan-700 w-6 h-6" /> Pilihan Hotel
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {[
        { name: "Grand Livio Hotel Kuta (3*)", type: "Superior Room", nights: "2 malam" },
        { name: "Solaris Hotel Kuta (3*)", type: "Deluxe Room", nights: "2 malam" },
      ].map((hotel, i) => (
        <div
          key={i}
          className="border border-cyan-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-cyan-500 transition-all duration-200 bg-white"
        >
          <h3 className="font-semibold text-lg text-cyan-800 mb-2">{hotel.name}</h3>
          <div className="space-y-1 text-gray-700">
            <p>Tipe Kamar: {hotel.type}</p>
            <p>Jumlah Malam: {hotel.nights}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      {/* Included */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Menginap 2 malam di hotel bintang 3 di Kuta",
            "Kalungan bunga di bandara",
            "Private transport dengan driver sebagai guide",
            "Tiket wisata & makan siang sesuai program",
            "Air mineral 1 botol setiap hari",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excluded */}
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Tiket pesawat",
            "Makan malam",
            "Keperluan pribadi & belanja",
            "Tipping driver",
            "Shuttle Pantai Tanah Barak",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="KEDATANGAN – ULUWATU TOUR"
      items={[
        "Penjemputan di Bandara Ngurah Rai",
        "Kalungan bunga",
        "Pantai Pandawa & Tanah Barak",
        "Pantai Melasti & Pura Uluwatu",
        "Makan Siang di Mak Jo (Include)",
        "Check-in Hotel",
      ]}
    />
    <TourPlanAccordion
      day="Day 2"
      title="FULL DAY KINTAMANI TOUR"
      items={[
        "Sarapan di hotel",
        "ATV (tandem 1 jam)",
        "Kintamani Mount Batur View",
        "Makan Siang di Grand Puncak Sari (buffet)",
        "Desa Penglipuran",
        "Shopping di Krisna Oleh-Oleh",
      ]}
    />
    <TourPlanAccordion
      day="Day 3"
      title="DAY OUT"
      items={["Sarapan di hotel", "Check out hotel", "Pengantaran ke Bandara Ngurah Rai"]}
    />
  </section>
</div>

  );
}

/* SLUG 2 */
function DeskripsiB({ paket }: { paket: PaketTourDetail }) {
  return (
   <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">
  {/* 🔹 Info Ringkas */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi Paket */}
  <section className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" />
      Deskripsi Paket
    </h2>
    <p className="text-gray-700 leading-8 text-justify">
      Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman
      tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani,
      Tirtam Empul, dan tentu saja petualangan ATV serta Watersport. Dengan
      pemandangan alam yang memukau, budaya yang kaya, dan pengalaman kuliner
      yang lezat, paket ini dirancang untuk memenuhi berbagai selera wisatawan.
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-8 shadow-sm border border-cyan-100">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga akan mendapat extra bed sesuai ketersediaan.</li>
      <li>Anak 0–4 tahun gratis (tanpa fasilitas tambahan).</li>
      <li>Anak 5–9 tahun 50% harga dewasa (sharing room).</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% deposit wajib ditransfer saat pemesanan.</li>
      <li>Transfer dilakukan setelah menerima invoice melalui WhatsApp/email.</li>
      <li>Bukti transfer dikirim melalui WhatsApp atau email kami.</li>
      <li>Detail invoice dikirim sebagai bukti konfirmasi reservasi.</li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Deposit akan dikembalikan sesuai kebijakan vendor (hotel, restoran, dll).</li>
      <li>Sisa pembayaran dikembalikan mengikuti ketentuan masing-masing vendor.</li>
    </ul>
  </section>

  {/* 🔹 Pilihan Hotel */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <Building2 className="text-cyan-700 w-6 h-6" /> Pilihan Hotel
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {[
        { name: "Grand Livio Hotel Kuta (3*)", type: "Superior Room", nights: "2 malam" },
        { name: "Solaris Hotel Kuta (3*)", type: "Deluxe Room", nights: "2 malam" },
      ].map((hotel, i) => (
        <div
          key={i}
          className="border border-cyan-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-cyan-500 transition-all duration-200 bg-white"
        >
          <h3 className="font-semibold text-lg text-cyan-800 mb-2">{hotel.name}</h3>
          <div className="space-y-1 text-gray-700">
            <p>Tipe Kamar: {hotel.type}</p>
            <p>Jumlah Malam: {hotel.nights}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      {/* Included */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Menginap 2 malam di hotel bintang 3 di Kuta",
            "Kalungan bunga di bandara",
            "Private transport dengan driver sebagai guide",
            "Tiket wisata & makan siang sesuai program",
            "Air mineral 1 botol setiap hari",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excluded */}
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Tiket pesawat",
            "Makan malam",
            "Keperluan pribadi & belanja",
            "Tipping driver",
            "Shuttle Pantai Tanah Barak",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="KEDATANGAN – ULUWATU TOUR"
      items={[
        "Penjemputan di Bandara Ngurah Rai",
        "Kalungan bunga",
        "Pantai Pandawa & Tanah Barak",
        "Pantai Melasti & Pura Uluwatu",
        "Makan Siang di Mak Jo (Include)",
        "Check-in Hotel",
      ]}
    />
    <TourPlanAccordion
      day="Day 2"
      title="FULL DAY KINTAMANI TOUR"
      items={[
        "Sarapan di hotel",
        "ATV (tandem 1 jam)",
        "Kintamani Mount Batur View",
        "Makan Siang di Grand Puncak Sari (buffet)",
        "Desa Penglipuran",
        "Shopping di Krisna Oleh-Oleh",
      ]}
    />
    <TourPlanAccordion
      day="Day 3"
      title="DAY OUT"
      items={["Sarapan di hotel", "Check out hotel", "Pengantaran ke Bandara Ngurah Rai"]}
    />
  </section>
</div>

  );
}

/* SLUG 3 */
function DeskripsiC({ paket }: { paket: PaketTourDetail }) {
  return (
   <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">

  {/* 🔹 Info Ringkas */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi */}
  <section className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-gray-700 leading-8 text-justify">
      Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, serta beberapa tempat wisata populer lainnya. 
      Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-8 shadow-sm border border-cyan-100">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.</li>
      <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
      <li>Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% deposit wajib ditransfer saat pemesanan.</li>
      <li>Transfer dilakukan setelah menerima invoice melalui WhatsApp/email.</li>
      <li>Bukti transfer dikirim melalui WhatsApp atau email kami.</li>
      <li>Detail invoice dikirim sebagai bukti konfirmasi reservasi.</li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Deposit akan dikembalikan sesuai kebijakan vendor seperti hotel atau aktivitas lainnya.</li>
      <li>Deposit yang sudah dibayarkan ke vendor akan mengikuti ketentuan pihak hotel/restoran terkait.</li>
    </ul>
  </section>

  {/* 🔹 Pilihan Hotel */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <Building2 className="text-cyan-700 w-6 h-6" /> Pilihan Hotel
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {[
        { name: "Zia Hotel Kuta (3*)", type: "1 Superior Room", nights: "2 malam" },
        { name: "Grand Livio Hotel Kuta (3*)", type: "Superior Room", nights: "2 malam" },
      ].map((hotel, i) => (
        <div
          key={i}
          className="border border-cyan-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-cyan-500 transition-all duration-200 bg-white"
        >
          <h3 className="font-semibold text-lg text-cyan-800 mb-2">{hotel.name}</h3>
          <div className="space-y-1 text-gray-700">
            <p>Tipe Kamar: {hotel.type}</p>
            <p>Jumlah Malam: {hotel.nights}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Menginap 2 malam di hotel bintang 3 di Kuta",
            "Kalungan bunga di bandara",
            "Private transport dengan driver sebagai guide (6-seater)",
            "Tiket wisata & makan siang sesuai program",
            "Air mineral setiap full tour",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Tiket pesawat",
            "Makan malam",
            "Shopping & keperluan pribadi lainnya",
            "Tipping untuk driver",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="KEDATANGAN – TANAH LOT TOUR"
      items={[
        "Penjemputan di Bandara Ngurah Rai",
        "Pengalungan bunga",
        "Watersport di Tanjung Benoa (Gratis 1x Banana Boat)",
        "Makan Siang di Kekeb Nusa Dua",
        "Pura Uluwatu",
        "Makan Malam di New Furama Seafood Jimbaran",
        "Check-in Hotel",
      ]}
    />
    <TourPlanAccordion
      day="Day 2"
      title="FULL DAY KINTAMANI – UBUD TOUR"
      items={[
        "Sarapan di hotel",
        "Desa Seni Batubulan",
        "Desa Penglipuran",
        "Kintamani Mount Batur View",
        "Makan Siang (buffet) di Resto Batur Sari",
        "Tirta Empul",
        "Makan Malam di Ayam Betutu Bu Mira",
      ]}
    />
    <TourPlanAccordion
      day="Day 3"
      title="DAY OUT"
      items={[
        "Sarapan di hotel",
        "Check out hotel",
        "Tanah Lot",
        "Shopping di Krisna Oleh-Oleh",
        "Pengantaran ke Bandara",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG 4 */
function DeskripsiD({ paket }: { paket: PaketTourDetail }) {
  return (
   <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">

  {/* 🔹 Info Ringkas */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi */}
  <section className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-gray-700 leading-8 text-justify">
      Selamat datang dalam paket tour 4 hari 3 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-8 shadow-sm border border-cyan-100">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.</li>
      <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
      <li>Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami melalui WhatsApp/email.</li>
      <li>Bukti transfer bisa dikirimkan melalui WhatsApp atau email kami.</li>
      <li>Setelah pembayaran, kami akan kirimkan Detail Invoice sebagai bukti konfirmasi reservasi.</li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Jika terjadi pembatalan setelah transfer, deposit akan dikembalikan sesuai ketentuan vendor seperti hotel dan aktivitas lainnya.</li>
      <li>Deposit yang sudah dibayarkan akan mengikuti kebijakan dari vendor seperti hotel, restoran, dan pihak ketiga.</li>
    </ul>
  </section>

  {/* 🔹 Pilihan Hotel */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <Building2 className="text-cyan-700 w-6 h-6" /> Pilihan Hotel
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {[
        { name: "Solaris Kuta (3*)", type: "Superior Room", nights: "3 malam" },
        { name: "Grand Livio Hotel Kuta (3*)", type: "Superior Room", nights: "3 malam" },
      ].map((hotel, i) => (
        <div
          key={i}
          className="border border-cyan-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-cyan-500 transition-all duration-200 bg-white"
        >
          <h3 className="font-semibold text-lg text-cyan-800 mb-2">{hotel.name}</h3>
          <div className="space-y-1 text-gray-700">
            <p>Tipe Kamar: {hotel.type}</p>
            <p>Jumlah Malam: {hotel.nights}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      {/* Included */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Menginap 3 malam di hotel bintang 3 di Kuta",
            "Pengalungan bunga di Bandara",
            "Transportasi pribadi dengan driver/guide",
            "Semua tiket masuk dan aktivitas sesuai program",
            "Makan (Sarapan, Siang & Malam) sesuai jadwal",
            "1 botol air mineral setiap full tour",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excluded */}
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Tiket pesawat",
            "Makan malam tambahan",
            "Belanja pribadi & keperluan lainnya",
            "Tipping untuk driver",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="KEDATANGAN – ULUWATU TOUR"
      items={[
        "Penjemputan di Bandara Ngurah Rai",
        "Pengalungan Bunga di Bandara",
        "Makan Siang di Mak Jo Restaurant",
        "Pantai Melasti",
        "Pura Uluwatu",
        "Makan Malam di Jimbaran (Seafood lengkap dengan kelapa muda utuh)",
        "Check in hotel",
      ]}
    />
    <TourPlanAccordion
      day="Day 2"
      title="FULL DAY ATV RIDE & RAFTING SUNGAI AYUNG"
      items={[
        "Sarapan di hotel",
        "ATV Tandem 1 Jam",
        "Makan siang di Finis ATV",
        "Ayung River Rafting",
        "Makan malam di Ayam Betutu Bu Mira",
      ]}
    />
    <TourPlanAccordion
      day="Day 3"
      title="FULL DAY BEDUGUL – TANAH LOT"
      items={[
        "Sarapan di hotel",
        "The Bloom Garden",
        "Ulundanu Temple & Beratan Lake",
        "Makan siang di Resto Ulundanu",
        "Pod Chocolate Factory",
        "Sunset Tanah Lot",
        "Makan Malam di Resto Seribu Rempah",
      ]}
    />
    <TourPlanAccordion
      day="Day 4"
      title="DAY OUT"
      items={[
        "Sarapan di hotel",
        "Check out hotel",
        "Pantai Kuta",
        "Belanja di Krisna Oleh-oleh",
        "Pengantaran ke Bandara",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG 5 */
function DeskripsiE({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">

  {/* 🔹 Info Ringkas */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi */}
  <section className="bg-white shadow-md rounded-2xl p-8 border border-gray-100">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-gray-700 leading-8 mb-4">
      Selamat datang dalam paket tour 4 hari 3 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
    </p>
    <p className="text-gray-700 leading-8">
      Mulai dari Desa Penglipuran dan Desa Seni Batubulan yang kaya akan budaya, hingga pemandangan spektakuler dari Gunung Batur View. Kamu juga akan menikmati keindahan alam di Coffee Plantation dan Alas Harum Rice Terrace, serta sunset memukau di Tanah Lot.
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl p-8 shadow-sm border border-cyan-100">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.</li>
      <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
      <li>Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami melalui WhatsApp/email.</li>
      <li>Bukti transfer bisa dikirimkan melalui WhatsApp atau email kami.</li>
      <li>Setelah pembayaran, kami akan kirimkan Detail Invoice sebagai bukti konfirmasi reservasi.</li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Jika terjadi pembatalan setelah transfer, deposit akan dikembalikan sesuai ketentuan vendor seperti hotel dan aktivitas lainnya.</li>
      <li>Deposit yang sudah dibayarkan akan mengikuti kebijakan dari vendor seperti hotel, restoran, dan pihak ketiga.</li>
    </ul>
  </section>

  {/* 🔹 Pilihan Hotel */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <Building2 className="text-cyan-700 w-6 h-6" /> Pilihan Hotel
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {[
        { name: "Zia Hotel Kuta (3*)", type: "Superior Room", nights: "3 malam" },
        { name: "Grand Livio Hotel Kuta (3*)", type: "Superior Room", nights: "3 malam" },
      ].map((hotel, i) => (
        <div
          key={i}
          className="border border-cyan-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-cyan-500 transition-all duration-200 bg-white"
        >
          <h3 className="font-semibold text-lg text-cyan-800 mb-2">{hotel.name}</h3>
          <div className="space-y-1 text-gray-700">
            <p>Tipe Kamar: {hotel.type}</p>
            <p>Jumlah Malam: {hotel.nights}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Menginap 3 malam di hotel bintang 3 di Kuta",
            "Transport sesuai program di atas",
            "Kalungan bunga di bandara",
            "Private transport dengan driver sebagai guide",
            "Tiket masuk wisata & makan siang sesuai program",
            "1 botol air mineral setiap full tour",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Tiket pesawat",
            "Shopping / keperluan pribadi",
            "Tipping untuk driver",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="KEDATANGAN"
      items={[
        "Penjemputan di Bandara Ngurah Rai",
        "Pengalungan bunga",
        "Makan Siang di Bali Timbungan",
        "Check in hotel",
      ]}
    />
    <TourPlanAccordion
      day="Day 2"
      title="FULL DAY KINTAMANI TOUR"
      items={[
        "Sarapan di hotel",
        "Desa Seni Batubulan",
        "Desa Penglipuran",
        "Kintamani Mount Batur View",
        "Makan Siang (buffet) di Resto Batur Sari",
        "Bali Coffee Plantation",
        "Alas Harum Rice Terrace",
        "Makan Malam (biaya sendiri)",
      ]}
    />
    <TourPlanAccordion
      day="Day 3"
      title="FULL DAY BEDUGUL - TANAH LOT TOUR"
      items={[
        "Sarapan di hotel",
        "Pura Ulundanu Beratan",
        "Makan Siang (buffet) di Resto Mentari",
        "Junglegold Chocolate Factory",
        "Tanah Lot",
        "Shopping di Krisna Oleh-Oleh",
        "Makan Malam (biaya sendiri)",
      ]}
    />
    <TourPlanAccordion
      day="Day 4"
      title="DAY OUT"
      items={[
        "Sarapan di hotel",
        "Check out hotel",
        "Pengantaran ke Bandara",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG 6 */
function DeskripsiF({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">

  {/* 🔹 Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi */}
  <section className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-gray-700 leading-8">
      Selamat datang dalam paket tour <strong>4 Hari 3 Malam</strong> yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali.
      Nikmati pemandangan alam yang memukau, keindahan budaya Bali yang kaya, dan pengalaman kuliner lezat — semua dirancang untuk memenuhi berbagai selera wisatawan.
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl border border-cyan-100 shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.</li>
      <li>Anak umur 0–4 tahun free (kebutuhan anak ditanggung orang tua).</li>
      <li>Anak umur 5–9 tahun 50% dari harga dewasa tanpa extra bed.</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Deposit 50% wajib ditransfer pada saat pemesanan.</li>
      <li>Transfer dilakukan setelah menerima invoice dari kami via WhatsApp/email.</li>
      <li>Bukti transfer bisa dikirimkan melalui WhatsApp atau email kami.</li>
      <li>Setelah pembayaran diterima, kami akan kirimkan Detail Invoice sebagai bukti reservasi.</li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Jika terjadi pembatalan setelah transfer, deposit akan dikembalikan sesuai ketentuan vendor (hotel & aktivitas).</li>
      <li>Deposit yang sudah dibayarkan mengikuti kebijakan dari pihak ketiga terkait.</li>
    </ul>
  </section>

  {/* 🔹 Pilihan Hotel */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <Building2 className="text-cyan-700 w-6 h-6" /> Pilihan Hotel
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {[
        { name: "Zia Hotel Kuta (3*)", type: "Superior Room", nights: "3 malam" },
        { name: "Grand Livio Hotel Kuta (3*)", type: "Superior Room", nights: "3 malam" },
      ].map((hotel, i) => (
        <div
          key={i}
          className="border border-cyan-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md hover:border-cyan-500 transition-all duration-200"
        >
          <h3 className="font-semibold text-lg text-cyan-800 mb-2">{hotel.name}</h3>
          <div className="space-y-1 text-gray-700">
            <p>Tipe Kamar: {hotel.type}</p>
            <p>Jumlah Malam: {hotel.nights}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      {/* Included */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Menginap 3 malam di hotel bintang 3 di Kuta",
            "Pengalungan bunga di Bandara",
            "Transportasi pribadi (6-Seater) dengan driver guide",
            "Tiket masuk & aktivitas sesuai program",
            "Makan sesuai program",
            "Air mineral 600ml/hari/orang",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excluded */}
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Tiket pesawat",
            "Makan malam",
            "Shopping & keperluan pribadi",
            "Tipping untuk driver",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="KEDATANGAN - FREE"
      items={[
        "Penjemputan dan penyambutan dengan bunga di Bandara Internasional Ngurah Rai.",
        "Check-in hotel",
        "Free Program",
      ]}
    />
    <TourPlanAccordion
      day="Day 2"
      title="FULL DAY KINTAMANI TOUR"
      items={[
        "Sarapan di hotel",
        "Desa Penglipuran",
        "Kintamani Mount Batur View",
        "Makan Siang di Resto Batur Sari",
        "Alas Harum Rice Terrace",
        "Makan Malam (biaya sendiri)",
      ]}
    />
    <TourPlanAccordion
      day="Day 3"
      title="FULL DAY BEDUGUL - TANAH LOT TOUR"
      items={[
        "Sarapan di hotel",
        "Pura Ulundanu Beratan",
        "Makan Siang di The Ulundanu Restaurant",
        "Junglegold Chocolate Factory",
        "Sunset Tanah Lot",
        "Belanja di Khrisna Oleh-oleh",
      ]}
    />
    <TourPlanAccordion
      day="Day 4"
      title="DAY OUT"
      items={[
        "Sarapan di hotel",
        "Check out hotel",
        "Pengantaran ke Bandara Internasional Ngurah Rai",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG 7 */
function DeskripsiG({ paket }: { paket: PaketTourDetail }) {
  return (
   <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">

  {/* 🔹 Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 5} Hari ${paket.duration_nights ?? 4} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi */}
  <section className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-gray-700 leading-8">
      Bali Paket Tour <strong>5 Hari 4 Malam</strong> ini menawarkan pengalaman liburan yang beragam dan seru.
      Kamu akan menikmati sunset yang indah di La Plancha Seminyak, mengunjungi Desa Penglipuran dan Desa Seni Batubulan
      yang kaya akan budaya Bali. Selain itu, kamu juga bisa menikmati pemandangan spektakuler dari Gunung Batur View,
      mengelilingi Coffee Plantation, dan berkunjung ke Pura Tirta Empul yang menenangkan. 
      Cobalah water sports di Pantai Melasti, nikmati keindahan Pura Uluwatu, 
      dan akhiri perjalananmu dengan bersantai di Pantai Kuta.
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl border border-cyan-100 shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.</li>
      <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
      <li>Anak umur 5–9 tahun 50% dari harga dewasa tanpa extra bed.</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>Transfer pembayaran dilakukan setelah menerima invoice resmi dari kami via WhatsApp/email.</li>
      <li>Bukti transfer dapat dikirim melalui WhatsApp atau email kami.</li>
      <li>Setelah pembayaran diterima, kami akan kirimkan Detail Invoice sebagai bukti reservasi telah dikonfirmasi.</li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Jika terjadi pembatalan setelah transfer, deposit akan dikembalikan sesuai kebijakan vendor (hotel, aktivitas, dll).</li>
      <li>Deposit yang sudah dibayarkan akan mengikuti ketentuan dari pihak ketiga pendukung wisata.</li>
    </ul>
  </section>

  {/* 🔹 Pilihan Hotel */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <Building2 className="text-cyan-700 w-6 h-6" /> Pilihan Hotel
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {[
        { name: "Grand Livio Hotel (3*)", type: "Superior Room", nights: "4 malam" },
        { name: "Solaris Hotel Kuta (3*)", type: "Superior Room", nights: "4 malam" },
      ].map((hotel, i) => (
        <div
          key={i}
          className="border border-cyan-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md hover:border-cyan-500 transition-all duration-200"
        >
          <h3 className="font-semibold text-lg text-cyan-800 mb-2">{hotel.name}</h3>
          <div className="space-y-1 text-gray-700">
            <p>Tipe Kamar: {hotel.type}</p>
            <p>Jumlah Malam: {hotel.nights}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      {/* Included */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Menginap 4 malam di hotel bintang 3 di Kuta",
            "Kalungan bunga di bandara",
            "Private transport dengan driver guide (6-seater)",
            "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
            "1 botol air mineral setiap full tour",
            "Asuransi wisata",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excluded */}
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Tiket pesawat",
            "Shopping & keperluan pribadi lainnya",
            "Tipping untuk driver",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>

    <TourPlanAccordion
      day="Day 1"
      title="KEDATANGAN - SEMINYAK"
      items={[
        "Penjemputan di Bandara Ngurah Rai",
        "Pengalungan bunga",
        "Check in hotel",
        "Sunset La Plancha Seminyak",
      ]}
    />

    <TourPlanAccordion
      day="Day 2"
      title="FULL DAY KINTAMANI TOUR"
      items={[
        "Sarapan di hotel",
        "Desa Seni Batubulan (Batik, Lukisan, Perhiasan Silver Bali)",
        "Desa Penglipuran",
        "Kintamani Mount Batur Volcano View",
        "Makan Siang (buffet) di Restaurant Grand Puncak Sari",
        "Bali Coffee Plantation",
        "Tirta Empul",
        "Makan Malam di Restaurant Ayam Betutu Bu Mira",
      ]}
    />

    <TourPlanAccordion
      day="Day 3"
      title="FULL DAY ULUWATU TOUR"
      items={[
        "Sarapan di hotel",
        "Watersport di Tanjung Benoa (Gratis 1x Banana Boat)",
        "Makan Siang di Restaurant Kekeb Nusa Dua",
        "Pantai Melasti",
        "Pura Uluwatu",
        "Makan Malam di Jimbaran (Paket seafood + kelapa muda)",
      ]}
    />

    <TourPlanAccordion
      day="Day 4"
      title="FULL DAY BEDUGUL - TANAH LOT"
      items={[
        "Sarapan di hotel",
        "The Blooms Garden",
        "Ulundanu Temple & Beratan Lake",
        "Makan siang di Restaurant The Ulundanu",
        "Pod Chocolate Factory",
        "Sunset Tanah Lot",
        "Makan Malam di Restaurant Seribu Rempah",
      ]}
    />

    <TourPlanAccordion
      day="Day 5"
      title="KUTA TOUR - DAY OUT"
      items={[
        "Sarapan di hotel",
        "Check out hotel",
        "Kuta Beach",
        "Shopping di Krisna Oleh-Oleh",
        "Pengantaran ke Bandara Ngurah Rai Bali",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG 8 */
function DeskripsiH({ paket }: { paket: PaketTourDetail }) {
  return (
   <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">

  {/* 🔹 Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 5} Hari ${paket.duration_nights ?? 4} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi */}
  <section className="bg-white shadow-sm border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-gray-700 leading-8">
      Bali Paket Tour <strong>5 Hari 4 Malam</strong> ini menawarkan pengalaman liburan yang beragam dan seru.
      Kamu akan menikmati sunset yang indah di La Plancha Seminyak, mengunjungi Desa Penglipuran dan Desa Seni Batubulan
      yang kaya akan budaya Bali. Selain itu, kamu juga bisa menikmati pemandangan spektakuler dari Gunung Batur View,
      mengelilingi Coffee Plantation, dan berkunjung ke Pura Tirta Empul yang menenangkan. 
      Cobalah water sports di Pantai Melasti, nikmati keindahan Pura Uluwatu, 
      dan akhiri perjalananmu dengan bersantai di Pantai Kuta.
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl border border-cyan-100 shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.</li>
      <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
      <li>Anak umur 5–9 tahun 50% dari harga dewasa tanpa extra bed.</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>Transfer pembayaran dilakukan setelah menerima invoice resmi dari kami via WhatsApp/email.</li>
      <li>Bukti transfer dapat dikirim melalui WhatsApp atau email kami.</li>
      <li>Setelah pembayaran diterima, kami akan kirimkan Detail Invoice sebagai bukti reservasi telah dikonfirmasi.</li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Jika terjadi pembatalan setelah transfer, deposit akan dikembalikan sesuai kebijakan vendor (hotel, aktivitas, dll).</li>
      <li>Deposit yang sudah dibayarkan akan mengikuti ketentuan dari pihak ketiga pendukung wisata.</li>
    </ul>
  </section>

  {/* 🔹 Pilihan Hotel */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <Building2 className="text-cyan-700 w-6 h-6" /> Pilihan Hotel
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      {[
        { name: "Grand Livio Hotel (3*)", type: "Superior Room", nights: "4 malam" },
        { name: "Solaris Hotel Kuta (3*)", type: "Superior Room", nights: "4 malam" },
      ].map((hotel, i) => (
        <div
          key={i}
          className="border border-cyan-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md hover:border-cyan-500 transition-all duration-200"
        >
          <h3 className="font-semibold text-lg text-cyan-800 mb-2">{hotel.name}</h3>
          <div className="space-y-1 text-gray-700">
            <p>Tipe Kamar: {hotel.type}</p>
            <p>Jumlah Malam: {hotel.nights}</p>
          </div>
        </div>
      ))}
    </div>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      {/* Included */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Menginap 4 malam di hotel bintang 3 di Kuta",
            "Kalungan bunga di bandara",
            "Private transport dengan driver guide (6-seater)",
            "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
            "1 botol air mineral setiap full tour",
            "Asuransi wisata",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excluded */}
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Tiket pesawat",
            "Shopping & keperluan pribadi lainnya",
            "Tipping untuk driver",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>

    <TourPlanAccordion
      day="Day 1"
      title="KEDATANGAN - SEMINYAK"
      items={[
        "Penjemputan di Bandara Ngurah Rai",
        "Pengalungan bunga",
        "Check in hotel",
        "Sunset La Plancha Seminyak",
      ]}
    />

    <TourPlanAccordion
      day="Day 2"
      title="FULL DAY KINTAMANI TOUR"
      items={[
        "Sarapan di hotel",
        "Desa Seni Batubulan (Batik, Lukisan, Perhiasan Silver Bali)",
        "Desa Penglipuran",
        "Kintamani Mount Batur Volcano View",
        "Makan Siang (buffet) di Restaurant Grand Puncak Sari",
        "Bali Coffee Plantation",
        "Tirta Empul",
        "Makan Malam di Restaurant Ayam Betutu Bu Mira",
      ]}
    />

    <TourPlanAccordion
      day="Day 3"
      title="FULL DAY ULUWATU TOUR"
      items={[
        "Sarapan di hotel",
        "Watersport di Tanjung Benoa (Gratis 1x Banana Boat)",
        "Makan Siang di Restaurant Kekeb Nusa Dua",
        "Pantai Melasti",
        "Pura Uluwatu",
        "Makan Malam di Jimbaran (Paket seafood + kelapa muda)",
      ]}
    />

    <TourPlanAccordion
      day="Day 4"
      title="FULL DAY BEDUGUL - TANAH LOT"
      items={[
        "Sarapan di hotel",
        "The Blooms Garden",
        "Ulundanu Temple & Beratan Lake",
        "Makan siang di Restaurant The Ulundanu",
        "Pod Chocolate Factory",
        "Sunset Tanah Lot",
        "Makan Malam di Restaurant Seribu Rempah",
      ]}
    />

    <TourPlanAccordion
      day="Day 5"
      title="KUTA TOUR - DAY OUT"
      items={[
        "Sarapan di hotel",
        "Check out hotel",
        "Kuta Beach",
        "Shopping di Krisna Oleh-Oleh",
        "Pengantaran ke Bandara Ngurah Rai Bali",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG 9 */
function DeskripsiI({ paket }: { paket: PaketTourDetail }) {
  return (
   <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">

  {/* 🔹 Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 5} Hari ${paket.duration_nights ?? 4} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi Umum */}
  <section className="bg-white shadow-md border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-md leading-8">
      Selamat datang dalam paket tour 5 hari 4 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali. 
      Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl border border-cyan-100 shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.</li>
      <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
      <li>Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/email.</li>
      <li>Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami.</li>
      <li>Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan reservasi sudah confirmed.</li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.</li>
      <li>Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.</li>
    </ul>
  </section>

  {/* 🔹 Pilihan Hotel */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <Building2 className="text-cyan-700 w-6 h-6" /> Pilihan Hotel
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border border-cyan-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md hover:border-cyan-500 transition-all duration-200">
        <h3 className="font-semibold text-lg text-cyan-800 mb-2">Zia Hotel Kuta (3*)</h3>
        <div className="space-y-1 text-gray-700">
          <p>Tipe Kamar: 1 Superior Room</p>
          <p>Jumlah Malam: 2 malam</p>
        </div>
      </div>
      <div className="border border-cyan-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md hover:border-cyan-500 transition-all duration-200">
        <h3 className="font-semibold text-lg text-cyan-800 mb-2">Grand Livio Hotel Kuta (3*)</h3>
        <div className="space-y-1 text-gray-700">
          <p>Tipe Kamar: Superior Room</p>
          <p>Jumlah Malam: 4 malam</p>
        </div>
      </div>
    </div>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Menginap 4 malam di hotel bintang 3 di Kuta",
            "Pengalungan bunga di Bandara",
            "Transportasi pribadi dengan driver merangkap guide (Mobil 6-Seater)",
            "Semua tiket masuk dan aktivitas sesuai program",
            "Makan sesuai program",
            "1 Botol Air Mineral 600ml/hari/orang",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Tiket pesawat",
            "Shopping & keperluan pribadi lainnya",
            "Tipping untuk driver",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>

    <TourPlanAccordion
      day="Day 1"
      title="KEDATANGAN - FREE PROGRAM"
      items={[
        "Penjemputan dan penyambutan dengan bunga di Bandara Internasional Ngurah Rai.",
        "Check-in hotel",
        "Free Program",
      ]}
    />
    <TourPlanAccordion
      day="Day 2"
      title="FULL DAY KINTAMANI TOUR"
      items={[
        "Sarapan di hotel",
        "Desa Penglipuran",
        "Kintamani Mount Batur View",
        "Makan Siang (buffet) di Resto Batur Sari",
        "Tirta Empul",
        "Alas Harum Rice Terrace (tidak include masuk Cretya Pool & main swing)",
        "Makan Malam (biaya sendiri)",
      ]}
    />
    <TourPlanAccordion
      day="Day 3"
      title="FULL DAY ULUWATU TOUR"
      items={[
        "Sarapan di hotel",
        "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
        "Makan Siang di Restaurant Kekeb Nusa Dua",
        "Garuda Wisnu Kencana (GWK)",
        "Sunset Pura Uluwatu",
        "Tari Kecak Uluwatu",
        "Makan Malam (biaya sendiri)",
      ]}
    />
    <TourPlanAccordion
      day="Day 4"
      title="FULL DAY BEDUGUL - TANAH LOT TOUR"
      items={[
        "Sarapan di hotel",
        "Pura Ulundanu Beratan",
        "Makan Siang (buffet) di Restaurant The Ulundanu",
        "Junglegold Chocolate Factory",
        "Sunset Tanah Lot",
        "Makan Malam (biaya sendiri)",
        "Belanja di Khrisna Oleh-oleh",
      ]}
    />
    <TourPlanAccordion
      day="Day 5"
      title="DAY OUT"
      items={[
        "Sarapan di hotel",
        "Check out Hotel",
        "Pengantaran ke Bandara Internasional Ngurah Rai",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG 10 */
function DeskripsiJ({ paket }: { paket: PaketTourDetail }) {
  return (
   <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">

  {/* 🔹 Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi Umum */}
   <section className="bg-white shadow-md border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-md leading-8">
      Selamat datang di petualangan ajaib kami! Selama 1 hari penuh, kita akan menjelajahi keindahan yang memukau di Nusa Penida. 
      Perjalanan ini akan memimpin kita melalui pengalaman tak terlupakan. Bersiaplah untuk meresapi keindahan alam, mengeksplorasi tradisi lokal, 
      dan menciptakan kenangan yang akan terukir dalam hati selamanya. Selamat bergabung dalam perjalanan spektakuler ini!
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl border border-cyan-100 shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.</li>
      <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
      <li>Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan melalui WhatsApp messenger/email.</li>
      <li>Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami.</li>
      <li>Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice sebagai bukti bahwa kami sudah menerima pembayaran dan reservasi sudah confirmed.</li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.</li>
      <li>Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.</li>
    </ul>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      {/* ✅ Included */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Transport pribadi beserta driver (Mobil 6 Seater)",
            "Semua tiket masuk dan aktivitas sesuai dengan program",
            "Makan siang di restaurant lokal",
            "Retribusi dan parkir",
            "Tiket PP Fast Boat",
            "Asuransi Wisata",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ❌ Excluded */}
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Keperluan pribadi",
            "Tipping (Sukarela)",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>

    <TourPlanAccordion
      day="Day 1"
      title="NUSA PENIDA BARAT TRIP"
      items={[
        "Penjemputan di Hotel",
        "Berangkat ke Pelabuhan Sanur jam 6.30 pagi (on time)",
        "Penyebrangan ke Nusa Penida dengan fastboat",
        "Nusa Penida West Trip: 1. Angel's Billabong 2. Broken Beach (Pasih Uug) 3. Kelingking Beach 4. Crystal Bay Beach",
        "Makan Siang di Restaurant Lokal",
        "Balik ke Pelabuhan Sanur - Bali dengan fastboat",
        "Makan Malam (Biaya Sendiri)",
        "Transfer Out",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG  */
function DeskripsiK({ paket }: { paket: PaketTourDetail }) {
  return (
   <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">

  {/* 🔹 Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi Umum */}
  <section className="bg-white shadow-md border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-md leading-8 text-gray-700">
      Selamat datang di petualangan ajaib kami! Selama 1 hari penuh, kita akan menjelajahi keindahan yang memukau di Nusa Penida.
      Perjalanan ini akan memimpin kita melalui pengalaman tak terlupakan. Bersiaplah untuk meresapi keindahan alam, mengeksplorasi tradisi lokal,
      dan menciptakan kenangan yang akan terukir dalam hati selamanya. Selamat bergabung dalam perjalanan spektakuler ini!
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl border border-cyan-100 shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.</li>
      <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
      <li>Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan melalui WhatsApp messenger/email.</li>
      <li>Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami.</li>
      <li>Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice sebagai bukti bahwa kami sudah menerima pembayaran dan reservasi sudah confirmed.</li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.</li>
      <li>Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.</li>
    </ul>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      {/* ✅ Included */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Transport pribadi beserta driver (Mobil 6 Seater)",
            "Semua tiket masuk dan aktivitas sesuai dengan program",
            "Makan siang di restaurant lokal",
            "Retribusi dan parkir",
            "Tiket PP Fast Boat",
            "Asuransi Wisata",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ❌ Excluded */}
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3">
          {[
            "Keperluan pribadi dan lain-lain",
            "Tipping (Sukarela)",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="NUSA PENIDA TIMUR TRIP"
      items={[
        "Penjemputan di Hotel",
        "Berangkat ke Pelabuhan Sanur jam 6.30 pagi (on time)",
        "Penyebrangan ke Nusa Penida dengan fastboat",
        "Nusa Penida East Trip: 1. Bukit Teletubis 2. Pantai Atuh 3. Pulau Seribu/Rumah Pohon 4. Pantai Diamond dan Goa Giri Putri",
        "Makan Siang di Restaurant Lokal",
        "Balik ke Pelabuhan Sanur - Bali dengan fastboat",
        "Makan Malam (Biaya Sendiri)",
        "Transfer Out",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG  */
function DeskripsiL({ paket }: { paket: PaketTourDetail }) {
  return (
   <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">

  {/* 🔹 Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi Umum */}
  <section className="bg-white shadow-md border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-md leading-8">
      Selamat datang di petualangan eksklusif 4 hari 3 malam di Bali! Jelajahi keindahan Uluwatu, dengan pura yang menghadap Samudra Hindia, dan saksikan matahari terbenam yang memukau. Nikmati pemandangan spektakuler di Kintamani, dengan Gunung Batur dan Danau Batur yang mempesona. Lanjutkan perjalanan ke Bedugul, rumah bagi Pura Ulun Danu Beratan, dan nikmati juga wisata menarik lainnya yang akan membuat pengalaman Anda semakin tak terlupakan!
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl border border-cyan-100 shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.</li>
      <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
      <li>Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan melalui WhatsApp messenger/email.</li>
      <li>Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami.</li>
      <li>Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice sebagai bukti bahwa kami sudah menerima pembayaran dan reservasi sudah confirmed.</li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.</li>
      <li>Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.</li>
    </ul>
  </section>

  {/* 🔹 Pilihan Hotel */}
  <section className="bg-white  border border-gray-100 rounded-2xl p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-6 flex items-center gap-2">
      <Building2 className="text-cyan-700 w-6 h-6" /> Pilihan Hotel
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border border-cyan-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <h3 className="font-semibold text-lg mb-2 text-cyan-800">Solaris Hotel Kuta</h3>
        <div className="space-y-1 text-gray-700">
          <p>Tipe Kamar: 1 Deluxe Room</p>
          <p>Jumlah Malam: 3 malam</p>
        </div>
      </div>
      <div className="border border-cyan-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <h3 className="font-semibold text-lg mb-2 text-cyan-800">Grand Livio Hotel Kuta</h3>
        <div className="space-y-1 text-gray-700">
          <p>Tipe Kamar: 1 Superior Room</p>
          <p>Jumlah Malam: 3 malam</p>
        </div>
      </div>
    </div>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Menginap 3 malam di hotel bintang 3 di Kuta",
            "Pengalungan bunga di Bandara",
            "Transportasi pribadi dengan driver merangkap guide (Mobil 6-Seater)",
            "Semua tiket masuk dan aktivitas sesuai program",
            "Makan (Sarapan, Makan Siang) sesuai program",
            "1 Botol Air Mineral 600ml/hari/orang",
            "Asuransi Wisata",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {["Tiket pesawat", "Shopping & keperluan pribadi lainnya", "Tipping untuk driver"].map(
            (item, i) => (
              <li key={i} className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <span>{item}</span>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="KEDATANGAN – ULUWATU TOUR"
      items={[
        "Penjemputan di Bandara Internasional Ngurah Rai",
        "Pengalungan Bunga di Bandara",
        "Makan Siang di Restaurant Kekeb Nusa Dua",
        "Pantai Pandawa/Tanah Barak",
        "Pura Uluwatu",
        "Makan Malam (biaya sendiri)",
        "Check in Hotel",
      ]}
    />
    <TourPlanAccordion
      day="Day 2"
      title="FULL DAY KINTAMANI TOUR"
      items={[
        "Sarapan di hotel",
        "Lava Jeep Sunrise di Gunung Batur, Kintamani",
        "Bali Coffee Plantation",
        "Makan Siang di Layana Warung Restaurant, Ubud",
        "Air Terjun Tegenungan",
        "Batubulan Art Village (Batik, Lukisan, UC Silver, Desa Seni)",
        "Makan Malam di Bali Timbungan Restaurant, Kuta",
      ]}
    />
    <TourPlanAccordion
      day="Day 3"
      title="FULL DAY BEDUGUL - TANAH LOT TOUR"
      items={[
        "Sarapan di hotel",
        "Pura Ulundanu Beratan",
        "Makan Siang (buffet) di Restaurant The Ulundanu",
        "Junglegold Chocolate Factory",
        "Sunset Tanah Lot",
        "Makan Malam di Restaurant Bale Udang Mang Engking Kuta",
      ]}
    />
    <TourPlanAccordion
      day="Day 4"
      title="DAY OUT"
      items={[
        "Sarapan di hotel",
        "Check-out hotel.",
        "Pengantaran ke Bandara Internasional Ngurah Rai",
      ]}
    />
  </section>
</div>

  );
}


/* SLUG */
function DeskripsiM({ paket }: { paket: PaketTourDetail }) {
  return (
   <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">

  {/* 🔹 Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi Umum */}
  <section className="bg-white shadow-md border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <div className="space-y-5 text-gray-800">
      <p className="text-md leading-8">
        Selamat datang dalam perjalanan liburan luar biasa bersama kami di Bali!{" "}
        <span className="font-semibold">Selama 4 hari 3 malam</span>, Anda akan diajak mengeksplorasi
        keindahan Bali dengan destinasi-destinasi ikonik yang memukau. Mulai dari pantai eksotis di
        Nusa Dua dan Pandawa Beach, menikmati pemandangan matahari terbenam di Uluwatu dan Tanah
        Lot, hingga menyaksikan sunrise spektakuler di Gunung Batur dan menjelajahi budaya khas
        Ubud.
      </p>
      <p className="text-md leading-8">
        Nikmati kenyamanan akomodasi bintang 3, sajian kuliner lezat, dan pengalaman perjalanan yang
        dirancang khusus untuk menciptakan kenangan tak terlupakan. Bersiaplah untuk petualangan
        spektakuler yang akan menghidupkan semangat eksplorasi Anda di Pulau Dewata!
      </p>
    </div>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl border border-cyan-100 shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.</li>
      <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
      <li>Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>
        Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami
        kirimkan, melalui WhatsApp messenger/email.
      </li>
      <li>
        Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga
        melalui email kami.
      </li>
      <li>
        Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa
        kami sudah menerima pembayaran dan reservasi sudah confirmed.
      </li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>
        Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari
        vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
      </li>
      <li>
        Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan
        untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti;
        hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
      </li>
    </ul>
  </section>

  {/* 🔹 Pilihan Hotel */}
  <section className="bg-white border border-gray-100 rounded-2xl p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-6 flex items-center gap-2">
      <Building2 className="text-cyan-700 w-6 h-6" /> Pilihan Hotel
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border border-cyan-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <h3 className="font-semibold text-lg mb-2 text-cyan-800">
          Solaris Hotel Kuta (3*)
        </h3>
        <div className="space-y-1 text-gray-700">
          <p>Tipe Kamar: 1 Deluxe Room</p>
          <p>Jumlah Malam: 3 malam</p>
        </div>
      </div>
      <div className="border border-cyan-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <h3 className="font-semibold text-lg mb-2 text-cyan-800">
          Grand Livio Hotel Kuta (3*)
        </h3>
        <div className="space-y-1 text-gray-700">
          <p>Tipe Kamar: 1 Superior Room</p>
          <p>Jumlah Malam: 3 malam</p>
        </div>
      </div>
    </div>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Menginap 3 malam di hotel bintang 3 di Kuta",
            "Pengalungan bunga di Bandara",
            "Transportasi pribadi dengan driver merangkap guide (Mobil 6-Seater)",
            "Semua tiket masuk dan aktivitas sesuai program",
            "Makan sesuai program",
            "1 Botol Air Mineral 600ml/hari/orang",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Tiket pesawat",
            "Makan malam",
            "Shopping & keperluan pribadi lainnya",
            "Tipping untuk driver",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="KEDATANGAN BEACH - ULUWATU TOUR"
      items={[
        "Penjemputan dan penyambutan dengan bunga di Bandara Internasional Ngurah Rai.",
        "Makan siang di Kekeb Restaurant.",
        "Nusa Dua Beach,",
        "Pandawa Beach, dan Tanah Barak",
        "Uluwatu Temple.",
        "Makan malam di Jimbaran Beach.",
        "Check-in hotel untuk istirahat",
      ]}
    />
    <TourPlanAccordion
      day="Day 2"
      title="FULL DAY BATUR - UBUD TOUR"
      items={[
        "Sarapan box dari hotel, berangkat pukul 02.30 pagi tepat waktu.",
        "Lava Jeep Sunrise di Gunung Batur, Kintamani",
        "Bali Coffee Plantation",
        "Makan siang di Layana Warung Restaurant, Ubud",
        "Air Terjun Tegenungan",
        "Batubulan Art Village (Batik, Lukisan, UC Silver, Desa Seni).",
        "Desa Penglipuran",
        "Makan malam di Bali Timbungan Restaurant, Kuta",
      ]}
    />
    <TourPlanAccordion
      day="Day 3"
      title="FULL DAY BEDUGUL - TANAH LOT TOUR"
      items={[
        "Sarapan di hotel",
        "Pura Ulundanu Beratan",
        "Makan Siang (buffet) di Restaurant The Ulundanu",
        "Junglegold Chocolate Factory",
        "Sunset Tanah Lot",
        "Makan Malam di Restaurant Bale Udang Mang Engking Kuta",
      ]}
    />
    <TourPlanAccordion
      day="Day 4"
      title="DAY OUT"
      items={[
        "Sarapan di hotel",
        "Check out Hotel",
        "Pengantaran ke Bandara Internasional Ngurah Rai",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG */
function DeskripsiN({ paket }: { paket: PaketTourDetail }) {
  return (
   <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">
  {/* 🔹 Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi Umum */}
  <section className="bg-white shadow-md border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-md leading-8 text-gray-800">
      Jelajahi keindahan Tanah Lot dengan pura ikoniknya, saksikan matahari terbenam di Tanah Lot, dan nikmati pemandangan spektakuler Gunung Batur di Kintamani. 
      Kunjungi Desa Penglipuran yang memukau dan Tirta Empul dengan air sucinya. Nikmati juga Tegenungan Waterfall yang menakjubkan. 
      Dengan akomodasi nyaman dan pengalaman tak terlupakan, petualangan ini akan mengungkap pesona Bali dari sudut yang berbeda.
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl border border-cyan-100 shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.</li>
      <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
      <li>Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami melalui WhatsApp/email.</li>
      <li>Bukti transfer dikirim via WhatsApp atau email kami.</li>
      <li>Setelah pembayaran diterima, kami kirimkan Detail Invoice sebagai bukti reservasi telah dikonfirmasi.</li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>
        Jika terjadi pembatalan setelah transfer, deposit akan dikembalikan sesuai ketentuan vendor seperti hotel dan aktivitas lainnya.
      </li>
      <li>
        Deposit yang sudah dibayarkan akan mengikuti kebijakan dari vendor terkait, seperti hotel dan restoran.
      </li>
    </ul>
  </section>

  {/* 🔹 Pilihan Hotel */}
  <section className="bg-white border border-gray-100 rounded-2xl p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-6 flex items-center gap-2">
      <Building2 className="text-cyan-700 w-6 h-6" /> Pilihan Hotel
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border border-cyan-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <h3 className="font-semibold text-lg mb-2 text-cyan-800">Grand Livio Hotel Kuta (3*)</h3>
        <p className="text-gray-700">Tipe Kamar: 1 Superior Room</p>
        <p className="text-gray-700">Jumlah Malam: 2 malam</p>
      </div>
      <div className="border border-cyan-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <h3 className="font-semibold text-lg mb-2 text-cyan-800">Solaris Hotel Kuta (3*)</h3>
        <p className="text-gray-700">Tipe Kamar: 1 Deluxe Room</p>
        <p className="text-gray-700">Jumlah Malam: 2 malam</p>
      </div>
    </div>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Menginap 2 malam di hotel bintang 3 di Kuta",
            "Pengalungan bunga di Bandara",
            "Private transport dengan driver sebagai guide (6-seater)",
            "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
            "1 botol air mineral setiap full tour",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Tiket pesawat",
            "Makan malam",
            "Shopping & keperluan pribadi lainnya",
            "Tipping untuk driver",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="KEDATANGAN – TANAH LOT TOUR"
      items={[
        "Penjemputan di Bandara Ngurah Rai",
        "Pengalungan bunga",
        "Makan Siang di Ayam Betutu Bu Mira",
        "Tanah Lot",
        "La Plancha Seminyak",
        "Makan Malam (biaya sendiri)",
        "Check in hotel",
      ]}
    />
    <TourPlanAccordion
      day="Day 2"
      title="FULL DAY KINTAMANI TOUR"
      items={[
        "Sarapan di hotel",
        "Desa Seni Batubulan",
        "Desa Penglipuran",
        "Kintamani Mount Batur View",
        "Makan Siang (buffet) di Resto Batur Sari",
        "Tirta Empul",
        "Tegenungan Waterfall",
        "Shopping di Krisna Oleh-Oleh",
        "Makan Malam (biaya sendiri)",
      ]}
    />
    <TourPlanAccordion
      day="Day 3"
      title="DAY OUT"
      items={[
        "Sarapan di hotel",
        "Check out hotel",
        "Pengantaran ke Bandara Internasional Ngurah Rai",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG  */
function DeskripsiO({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">
  {/* 🔹 Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi Umum */}
  <section className="bg-white shadow-md border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-md leading-8 text-gray-800">
      Selamat datang di petualangan ajaib kami bersama pasangan anda, kita akan menjelajahi keindahan yang memukau di Bali, perjalanan ini akan memimpin kita melalui pengalaman tak terlupakan. Bersiaplah untuk meresapi keindahan alam, mengeksplorasi tradisi lokal, dan menciptakan kenangan yang akan terukir dalam hati selamanya. Selamat bergabung dalam perjalanan spektakuler ini!
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl border border-cyan-100 shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Hanya berlaku untuk wisatawan domestik.</li>
      <li>Berlaku untuk Pre-Honeymoon.</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>
        Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
      </li>
      <li>
        Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
      </li>
      <li>
        Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
      </li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>
        Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
      </li>
      <li>
        Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
      </li>
    </ul>
  </section>

  {/* 🔹 Pilihan Hotel */}
  <section className="bg-white border border-gray-100 rounded-2xl p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-6 flex items-center gap-2">
      <Building2 className="text-cyan-700 w-6 h-6" /> Pilihan Hotel
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border border-cyan-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <h3 className="font-semibold text-lg mb-2 text-cyan-800">Zia Hotel Kuta (3*)</h3>
        <p className="text-gray-700">Tipe Kamar: 1 Superior Room</p>
        <p className="text-gray-700">Jumlah Malam: 2 malam</p>
      </div>
      <div className="border border-cyan-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <h3 className="font-semibold text-lg mb-2 text-cyan-800">Grand Livio (3*)</h3>
        <p className="text-gray-700">Tipe Kamar: Superior Room</p>
        <p className="text-gray-700">Jumlah Malam: 2 malam</p>
      </div>
    </div>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Menginap 2 malam di hotel bintang 3 di Kuta",
            "Kalungan bunga di bandara",
            "Transportasi pribadi beserta driver (Mobil 6-Seater)",
            "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
            "1 botol air mineral setiap full tour",
            "Driver sekaligus menjadi guide",
            "Asuransi Wisata",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Tiket pesawat",
            "Shopping & keperluan pribadi lainnya",
            "Tipping untuk driver",
            "Shuttle di pantai tanah barak Rp25.000",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="AIRPORT - PANTAI PANDAWA/MELASTI - JIMBARAN SEAFOOD DINNER"
      items={[
        "Penjemputan di Bandara Ngurah Rai",
        "Pengalungan bunga",
        "Pantai Pandawa & Pantai Tanah Barak",
        "Pura Uluwatu",
        "Tari Kecak Uluwatu",
        "Makan Malam di Pantai Jimbaran (Paket seafood lengkap dengan kelapa muda utuh)",
        "Check in hotel",
      ]}
    />
    <TourPlanAccordion
      day="Day 2"
      title="FOTO ADAT BALI - BEDUGUL - TANAH LOT"
      items={[
        "Sarapan di hotel",
        "Berfoto Tata Rias Pengantin Bali (Biaya Sendiri)",
        "Pura Ulundanu Beratan",
        "Makan Siang (buffet) di Restaurant The Ulundanu",
        "Handara Gate",
        "Sunset Tanah Lot",
        "Makan Malam di Ayam Betutu Bu Mira",
      ]}
    />
    <TourPlanAccordion
      day="Day 3"
      title="KUTA TOUR - OUT"
      items={[
        "Sarapan di hotel",
        "Check out hotel",
        "Pantai Kuta",
        "Shopping di Krisna Oleh-Oleh",
        "Pengantaran ke Bandara Internasional Ngurah Rai",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG */
function DeskripsiP({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">
  {/* 🔹 Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 4} Hari ${paket.duration_nights ?? 3} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi Umum */}
  <section className="bg-white shadow-md border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-md leading-8 text-gray-800">
      Selamat datang di petualangan tak terlupakan! Dalam 4 hari 3 malam, nikmati keindahan alam Bali yang memukau di musim terbaik. Temukan pesona alamnya yang menakjubkan, budaya lokal yang memikat, dan pengalaman spesial yang akan selalu dikenang. Bersiaplah untuk perjalanan penuh keajaiban bersama kami!
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl border border-cyan-100 shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.</li>
      <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
      <li>Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan melalui WhatsApp/email.</li>
      <li>Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia di website, atau melalui email kami.</li>
      <li>Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice sebagai bukti bahwa reservasi sudah dikonfirmasi.</li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Jika terjadi pembatalan setelah transfer, deposit akan dikembalikan sesuai ketentuan dari vendor kami (hotel, aktivitas, dan lainnya).</li>
      <li>Deposit yang masih ada pada kami (sisa pembayaran hotel dll) akan dikembalikan, sedangkan yang sudah kami bayarkan akan mengikuti kebijakan vendor terkait.</li>
    </ul>
  </section>

  {/* 🔹 Pilihan Hotel */}
  <section className="bg-white border border-gray-100 rounded-2xl p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-6 flex items-center gap-2">
      <Building2 className="text-cyan-700 w-6 h-6" /> Pilihan Hotel
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border border-cyan-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <h3 className="font-semibold text-lg mb-2 text-cyan-800">Zia Hotel Kuta (3*)</h3>
        <p className="text-gray-700">Tipe Kamar: 1 Deluxe Room</p>
        <p className="text-gray-700">Jumlah Malam: 3 malam</p>
      </div>
      <div className="border border-cyan-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <h3 className="font-semibold text-lg mb-2 text-cyan-800">Grand Livio Hotel Kuta (3*)</h3>
        <p className="text-gray-700">Tipe Kamar: 1 Superior Room</p>
        <p className="text-gray-700">Jumlah Malam: 3 malam</p>
      </div>
    </div>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Menginap 3 malam di hotel bintang 3 di Kuta",
            "Pengalungan bunga di Bandara",
            "Tiket masuk objek wisata sesuai program",
            "Transportasi pribadi dengan driver merangkap guide (Mobil 6-Seater)",
            "Semua tiket masuk dan aktivitas sesuai program",
            "Makan sesuai program",
            "1 Botol Air Mineral 600ml/hari/orang",
            "Asuransi Wisata",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Tiket pesawat",
            "Shopping & keperluan pribadi lainnya",
            "Tipping untuk driver",
            "Shuttle di pantai tanah barak Rp.25.000",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="KEDATANGAN – NUSA DUA TOUR"
      items={[
        "Penjemputan di Bandara Ngurah Rai",
        "Pengalungan Bunga di Bandara",
        "Makan Siang di Restaurant Kekeb Nusa Dua",
        "Pantai Nusa Dua",
        "Pantai Pandawa & Pantai Tanah Barak",
        "Pantai Suluban",
        "Makan Malam di Pantai Jimbaran (Paket seafood lengkap dengan kelapa muda utuh)",
        "Check in hotel",
      ]}
    />
    <TourPlanAccordion
      day="Day 2"
      title="FULL DAY SUNRISE JEEP – UBUD TOUR"
      items={[
        "Sarapan box dari hotel",
        "Berangkat dari hotel pukul 03.00 pagi (on time)",
        "Sunrise Jeep di Kintamani",
        "Bali Coffee Plantation",
        "Makan Siang di Layana Warung Ubud",
        "Air Terjun Tegenungan",
        "Desa Seni Batubulan (Batik, Lukisan, Perhiasan Silver Bali)",
        "Makan Malam di Bali Timbungan Restaurant Kuta",
      ]}
    />
    <TourPlanAccordion
      day="Day 3"
      title="FULL DAY SWING - SUNSET TOUR"
      items={[
        "Sarapan di hotel",
        "Bali Heaven Swing",
        "Makan Siang di Swing Heaven",
        "Menikmati Sunset di La Plancha Seminyak",
        "Makan Malam di Bale Udang Mang Engking Bamboo Kuta Restaurant",
      ]}
    />
    <TourPlanAccordion
      day="Day 4"
      title="SHOPPING - OUT"
      items={[
        "Sarapan di hotel",
        "Check-out dari hotel",
        "Belanja di Krisna Oleh-oleh",
        "Pengantaran ke Bandara Internasional Ngurah Rai",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG */
function DeskripsiQ({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">
  {/* Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* Deskripsi Umum */}
  <section className="bg-white shadow-md border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-md leading-8 text-gray-800">
      Jelajahi keindahan Bali Selatan dengan pengalaman tur sehari penuh yang menghadirkan kombinasi antara{" "}
      <span className="font-semibold">petualangan seru, keindahan alam, dan kekayaan budaya Bali</span>. Dengan layanan{" "}
      <span className="font-semibold">private car & driver (6-seater)</span>, Anda bisa menikmati perjalanan dengan nyaman bersama keluarga atau sahabat.
    </p>
  </section>

  {/* Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>
        Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email.
      </li>
      <li>
        Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami.
      </li>
      <li>
        Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan reservasi sudah confirmed.
      </li>
    </ul>
  </section>

  {/* Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>
        Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
      </li>
      <li>
        Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
      </li>
    </ul>
  </section>

  {/* Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      {/* Included */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Private Tour Dengan Private Mobil dan Driver (6-seater)",
            "Bahan Bakar Minyak (BBM)",
            "Penjemputan di Hotel (area Denpasar–Kuta–Seminyak)",
            "Durasi 12 Jam",
            "1 botol air mineral setiap full tour",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excluded */}
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Makan",
            "Tiket Masuk Destinasi",
            "Retribusi / Parkir",
            "Hotel",
            "Tipping untuk driver",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="ULUWATU TOUR"
      items={[
        "Watersport Tanjung Benoa: Awali hari dengan aktivitas seru seperti banana boat, parasailing, jet ski, dan beragam olahraga air lainnya yang memacu adrenalin di kawasan Tanjung Benoa.",
        "Garuda Wisnu Kencana (GWK): Kunjungi salah satu ikon kebanggaan Bali dengan patung Dewa Wisnu setinggi 121 meter. Area GWK juga menawarkan teater budaya dan pemandangan menakjubkan dari ketinggian.",
        "Pantai Pandawa: Nikmati indahnya pasir putih dan tebing-tebing ikonik di Pantai Pandawa, tempat yang sempurna untuk bersantai dan berfoto.",
        "Pantai Tanah Barak: Salah satu hidden gem di Bali Selatan dengan panorama indah, jalan diapit tebing kapur yang menjulang, serta suasana pantai yang masih alami.",
        "Pura Uluwatu: Rasakan ketenangan spiritual di salah satu pura paling suci di Bali yang berdiri kokoh di atas tebing tinggi dengan pemandangan langsung ke Samudera Hindia.",
        "Tari Kecak Uluwatu: Tutup hari dengan pertunjukan Tari Kecak yang spektakuler, berlatar belakang matahari terbenam yang memukau – pengalaman yang akan selalu dikenang.",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG*/
function DeskripsiR({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">
  {/* 🔹 Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi Umum */}
  <section className="bg-white shadow-md border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-md leading-8 text-gray-800">
      Nikmati kesejukan alam pegunungan <span className="font-semibold">Bedugul</span> dengan tur sehari penuh yang memadukan keindahan danau, pura ikonik, taman bunga, serta pura laut yang legendaris. Dengan layanan{" "}
      <span className="font-semibold">private car & driver (6-seater)</span>, Anda dapat menjelajah dengan nyaman bersama keluarga atau sahabat.
    </p>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>
        Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email.
      </li>
      <li>
        Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami.
      </li>
      <li>
        Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan reservasi sudah confirmed.
      </li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>
        Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
      </li>
      <li>
        Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
      </li>
    </ul>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      {/* Included */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Private Tour Dengan Private Mobil dan Driver (6-seater)",
            "Bahan Bakar Minyak (BBM)",
            "Penjemputan di Hotel (area Denpasar–Kuta–Seminyak)",
            "Durasi 12 Jam",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excluded */}
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Makan",
            "Tiket Masuk Destinasi",
            "Retribusi / Parkir",
            "Hotel",
            "Tipping Untuk Driver",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="Bedugul"
      items={[
        "Bali Farm House: Agrowisata keluarga yang menawarkan suasana pedesaan asri dengan hamparan hijau dan hewan ternak yang bisa diajak berinteraksi. Cocok untuk spot foto dan edukasi anak-anak.",
        "Ulun Danu Beratan: Pura ikonik di tepi Danau Beratan yang dikelilingi pegunungan sejuk. Keindahannya sering menjadi ikon pariwisata Bali karena pemandangan pura yang seolah terapung di atas danau.",
        "The Bloom Garden: Taman bunga warna-warni dengan desain artistik yang instagramable. Menyuguhkan spot foto menarik dengan latar gunung dan udara segar khas Bedugul.",
        "Tanah Lot: Pura laut yang berdiri megah di atas batu karang besar, terkenal dengan panorama sunset yang menakjubkan. Salah satu destinasi wajib untuk menikmati pesona budaya dan alam Bali.",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG */
function DeskripsiS({ paket }: { paket: PaketTourDetail }) {
  return (
   <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">
  {/* Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* Deskripsi Umum */}
  <section className="bg-white shadow-md border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-md leading-8 text-gray-800">
      Nikmati pesona alam <span className="font-semibold">Kintamani</span> dalam tur sehari penuh: panorama{" "}
      <span className="font-semibold">Gunung & Danau Batur</span>, desa tradisional, serta spot-spot foto populer yang ikonik.
      Dengan <span className="font-semibold">private car & driver (6-seater)</span>, perjalananmu nyaman dan fleksibel — cocok untuk keluarga maupun rombongan kecil.
    </p>
  </section>

  {/*  Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>
        Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger / email.
      </li>
      <li>
        Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami.
      </li>
      <li>
        Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice sebagai bukti bahwa kami sudah menerima pembayaran dan reservasi telah confirmed.
      </li>
    </ul>
  </section>

  {/*  Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>
        Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti hotel dan pendukung aktivitas lainnya.
      </li>
      <li>
        Deposit yang masih ada pada kami (sisa pembayaran hotel, dll) akan kami kembalikan. Untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan vendor terkait (hotel, restoran, dan pihak ketiga pendukung wisata).
      </li>
    </ul>
  </section>

  {/* Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      {/* Included */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Private Tour Dengan Private Mobil dan Driver (6-seater)",
            "Bahan Bakar Minyak (BBM)",
            "Penjemputan di Hotel (area Denpasar–Kuta–Seminyak)",
            "Durasi 12 Jam",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excluded */}
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Makan",
            "Tiket Masuk Destinasi",
            "Retribusi / Parkir",
            "Hotel",
            "Tipping Untuk Driver",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/*  Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="Kintamani"
      items={[
        "Desa Penglipuran: Desa tradisional Bali yang terkenal dengan tata ruang rapi, arsitektur rumah adat seragam, serta suasana alami yang asri. Sering disebut sebagai salah satu desa terbersih di dunia.",
        "EL Lago Café: Spot hits dengan pemandangan spektakuler Gunung dan Danau Batur. Café ini populer untuk bersantai sambil menikmati kopi atau hidangan ringan dengan latar panorama alam yang ikonik.",
        "Tirta Empul: Pura suci yang terkenal dengan kolam pemandian air suci. Wisatawan datang untuk merasakan pengalaman melukat (pembersihan diri secara spiritual) dengan tradisi Hindu Bali.",
        "Alas Harum: Agrowisata modern di Ubud yang terkenal dengan kopi Luwak, terasering sawah hijau, serta aktivitas populer seperti swing raksasa, skybike, dan spot foto instagramable.",
      ]}
    />
  </section>
</div>

  );
}


/* SLUG */
function DeskripsiT({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">
  {/* 🔹 Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 3} Hari ${paket.duration_nights ?? 2} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi Umum */}
  <section className="bg-white shadow-md border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-md leading-8 text-gray-800">
      Jelajahi pesona budaya dan alam <span className="font-semibold">Ubud</span> dalam tur sehari penuh: kombinasi seni, spiritualitas, serta keindahan alam Bali. Dengan <span className="font-semibold">private car & driver (6-seater)</span>, perjalanan Anda lebih nyaman dan fleksibel untuk keluarga maupun sahabat.
    </p>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>
        Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email.
      </li>
      <li>
        Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami.
      </li>
      <li>
        Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice sebagai bukti bahwa kami sudah menerima pembayaran dan reservasi sudah confirmed.
      </li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>
        Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
      </li>
      <li>
        Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan. Deposit yang sudah kami bayarkan mengikuti ketentuan vendor terkait.
      </li>
    </ul>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      {/* Included */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Private Tour Dengan Private Mobil dan Driver (6-seater)",
            "Bahan Bakar Minyak (BBM)",
            "Penjemputan di Hotel (area Denpasar–Kuta–Seminyak)",
            "Durasi 12 Jam",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excluded */}
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Makan",
            "Tiket Masuk Destinasi",
            "Retribusi / Parkir",
            "Hotel",
            "Tipping Untuk Driver",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="Ubud Tour"
      items={[
        "Sari Timbul: Spot seni unik dengan patung raksasa berbentuk wajah dan mulut besar sebagai pintu masuk. Tempat ini populer untuk berfoto karena desainnya yang artistik dan instagramable.",
        "Tegenungan Waterfall: Air terjun cantik di tengah hutan tropis dengan aliran air deras dan pemandangan hijau alami. Cocok untuk bersantai, berenang, atau sekadar menikmati suasana segar.",
        "Rafting / ATV Adventure: Aktivitas seru di Ubud: arung jeram menyusuri sungai dengan pemandangan tebing hijau, atau menjajal ATV untuk petualangan off-road di pedesaan dan hutan.",
        "Taman Dedari: Taman indah dengan patung Dewi-Dewi berukuran raksasa yang megah. Selain panorama taman yang hijau, tempat ini juga jadi spot foto populer dan romantis di Ubud.",
      ]}
    />
  </section>
</div>

  );
}

/* SLUG */
function DeskripsiU({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-12 px-4 md:px-9 lg:px-9">
  {/* 🔹 Info Box Utama */}
  <div className="bg-cyan-800 shadow-[0_0_25px_rgba(34,211,238,0.4)] rounded-3xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
    <InfoItem
      icon={<Calendar className="w-10 h-10 text-amber-300 mb-2" />}
      title="Durasi"
      value={`${paket.duration_days ?? 4} Hari ${paket.duration_nights ?? 3} Malam`}
    />
    <InfoItem
      icon={<Users className="w-10 h-10 text-amber-300 mb-2" />}
      title="Maksimal Peserta"
      value={paket.maximum_participants ?? 40}
    />
    <InfoItem
      icon={<User className="w-10 h-10 text-amber-300 mb-2" />}
      title="Usia Minimum"
      value={`${paket.minimum_age ?? 3}+`}
    />
    <InfoItem
      icon={<MapPin className="w-10 h-10 text-amber-300 mb-2" />}
      title="Penjemputan"
      value={paket.pickup_location ?? "Bus/Mobil"}
    />
  </div>

  {/* 🔹 Deskripsi Umum */}
  <section className="bg-white shadow-md border border-gray-100 rounded-2xl p-8">
    <h2 className="text-2xl font-bold text-cyan-800 mb-4 flex items-center gap-2">
      <Info className="text-cyan-700 w-6 h-6" /> Deskripsi Paket
    </h2>
    <p className="text-md leading-8 text-gray-800">
      Nikmati petualangan seru dalam paket wisata <span className="font-semibold">Bali & Nusa Penida Barat</span> selama 4 hari 3 malam ini. Kamu akan menjelajahi berbagai destinasi menarik, mulai dari Pantai Nusa Dua dan Pantai Jimbaran, Desa Seni Batubulan, hingga Gunung Batur. Tak lupa, kunjungi Coffee Plantation, Alas Harum Tegalalang, dan berbagai spot menakjubkan di Nusa Penida. Liburan ini menghadirkan pengalaman tak terlupakan kombinasi petualangan, relaksasi, dan budaya.
    </p>
  </section>

  {/* 🔹 Peserta */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <Users className="text-cyan-700 w-6 h-6" /> Peserta
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Minimal peserta 2 orang dewasa.</li>
      <li>Satu kamar hotel untuk 2 orang.</li>
      <li>Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.</li>
      <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
      <li>Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.</li>
    </ul>
  </section>

  {/* 🔹 Pembayaran */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <CreditCard className="text-cyan-700 w-6 h-6" /> Pembayaran
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
      <li>Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami melalui WhatsApp/email.</li>
      <li>Bukti transfer bisa dikirimkan melalui WhatsApp atau email.</li>
      <li>Setelah pembayaran, kami kirimkan Detail Invoice sebagai bukti reservasi confirmed.</li>
    </ul>
  </section>

  {/* 🔹 Pembatalan */}
  <section className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-red-600 mb-4 flex items-center gap-2">
      <XCircle className="text-red-500 w-6 h-6" /> Pembatalan
    </h2>
    <ul className="pl-4 list-disc list-inside space-y-2 text-gray-700">
      <li>Jika terjadi pembatalan setelah transfer, deposit dikembalikan sesuai ketentuan vendor (hotel/aktivitas).</li>
      <li>Deposit yang sudah dibayarkan mengikuti ketentuan vendor terkait.</li>
    </ul>
  </section>

  {/* 🔹 Pilihan Hotel */}
  <section className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
    <h2 className="text-xl font-semibold text-cyan-800 mb-4 flex items-center gap-2">
      <MapPin className="text-cyan-700 w-6 h-6" /> Pilihan Hotel
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <h3 className="font-semibold text-lg mb-2">Solaris Hotel Kuta (3)</h3>
        <p>Tipe Kamar: 1 Deluxe Room</p>
        <p>Jumlah Malam: 3 malam</p>
      </div>
      <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
        <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3)</h3>
        <p>Tipe Kamar: 1 Superior Room</p>
        <p>Jumlah Malam: 3 malam</p>
      </div>
    </div>
  </section>

  {/* 🔹 Included / Excluded */}
  <section>
    <h2 className="text-2xl font-bold text-cyan-800 mb-6 flex items-center gap-2">
      <CheckCircle className="text-green-600 w-6 h-6" /> Included / Excluded
    </h2>
    <div className="grid md:grid-cols-2 gap-10">
      {/* Included */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h3 className="font-semibold text-green-700 mb-4">Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Menginap 3 malam di hotel bintang 3 di Kuta",
            "Pengalungan bunga di Bandara",
            "Transportasi pribadi dengan driver merangkap guide (Mobil 6-Seater)",
            "Semua tiket masuk dan aktivitas sesuai program",
            "Makan sesuai program",
            "Tiket PP fastboat",
            "1 Botol Air Mineral 600ml/hari/orang",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Excluded */}
      <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200">
        <h3 className="font-semibold text-red-700 mb-4">Tidak Termasuk:</h3>
        <ul className="space-y-3 text-gray-700">
          {[
            "Tiket pesawat",
            "Makan malam",
            "Shopping & keperluan pribadi lainnya",
            "Tipping untuk driver",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>

  {/* 🔹 Tour Plan */}
  <section>
    <h3 className="text-3xl font-bold text-cyan-800 mt-8 mb-6 flex items-center gap-2">
      <MapIcon className="text-cyan-700 w-7 h-7" /> Tour Plan
    </h3>
    <TourPlanAccordion
      day="Day 1"
      title="KEDATANGAN - JIMBARAN - NUSA DUA TOUR"
      items={[
        "Penjemputan di Bandara Ngurah Rai",
        "Pengalungan Bunga di Bandara",
        "Makan Siang di Kekeb Nusa Dua",
        "Pantai Nusa Dua",
        "Makan Malam di Restaurant Pantai Jimbaran",
        "Check in hotel",
      ]}
    />
    <TourPlanAccordion
      day="Day 2"
      title="FULL DAY KINTAMANI TOUR"
      items={[
        "Sarapan di hotel",
        "Desa Seni Batubulan (Batik, Lukisan, Perhiasan Silver Bali)",
        "Desa Penglipuran",
        "Kintamani Mount Batur Volcano View",
        "Makan Siang (buffet) di Grand Puncak Sari",
        "Bali Coffee Plantation",
        "Alas Harum Tegallalang Rice Terrace & Cretya Ubud Pool Bar",
        "Swing di Alas Harum (biaya sendiri)",
        "Makan Malam di Restaurant Wedja Ubud",
      ]}
    />
    <TourPlanAccordion
      day="Day 3"
      title="FULL DAY NUSA PENIDA TOUR"
      items={[
        "Sarapan Box dari Hotel",
        "Berangkat dari Hotel jam 6.30 (on time)",
        "Nusa Penida West Trip: Angel’s Billabong, Broken Beach (Pasih Uug), Kelingking Beach, Crystal Bay Beach",
        "Makan Siang di Restaurant Lokal",
        "Belanja di Krisna Oleh-oleh",
        "Makan Malam di Bale Udang Mang Engking Kuta",
      ]}
    />
    <TourPlanAccordion
      day="Day 4"
      title="DAY OUT"
      items={[
        "Sarapan di Hotel",
        "Check out Hotel",
        "Pengantaran ke Bandara Internasional Ngurah Rai",
      ]}
    />
  </section>
</div>

  );
}






// 🔸 Komponen kecil untuk info
function InfoItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col items-center">
      {icon}
      <p className="font-semibold text-white">{title}</p>
      <p className="text-white">{value}</p>
    </div>
  );
}














