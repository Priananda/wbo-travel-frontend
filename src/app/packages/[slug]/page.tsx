"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import {
  Loader2,
  Calendar,
  Users,
  User,
  MapPin,
} from "lucide-react";
import TourPlanAccordion from "@/app/components/tourPlanAccordion";
import AddToCart from "@/app/components/addToCart/index";

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

  // ✅ Fetch tanpa perlu login
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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loader2 className="animate-spin text-cyan-700 w-8 h-8" />
      </div>
    );

  if (!paket)
    return (
      <p className="text-center mt-24 text-gray-500">
        Paket tidak ditemukan
      </p>
    );

  // 🔹 Deskripsi khusus berdasarkan slug
  const deskripsiKhusus =
    slug === "tour-bali-4-hari-3-malam" ? (
      <DeskripsiBali paket={paket} />
    ) : slug === "bali-jakarta" ? (
      <DeskripsiLombok paket={paket} />
    ) : null;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Grid dua kolom */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kiri - Gambar */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="relative w-full h-80">
            <Image
              src={`http://127.0.0.1:8000/storage/${paket.image}`}
              alt={paket.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Kanan - Detail + AddToCart */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between">
          {/* Judul & Harga */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {paket.title}
            </h1>
            <p className="text-2xl font-semibold text-cyan-700 mb-4">
              Rp{Number(paket.price).toLocaleString("id-ID")}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {paket.description}
            </p>
          </div>

          {/* Tombol AddToCart */}
          <AddToCart
            paketId={paket.id}
            title={paket.title}
            price={Number(paket.price)}
          />
        </div>
      </div>

      {/* Deskripsi Tambahan */}
      {deskripsiKhusus}
    </div>
  );
}

/* === COMPONENT DESKRIPSI TAMBAHAN === */

// 🌴 Deskripsi untuk Tour Bali
function DeskripsiBali({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 text-gray-800 leading-relaxed">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <section>
        <p>
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan
          pengalaman tak terlupakan di Bali: Kintamani, Tirta Empul, dan
          Watersport. Nikmati keindahan alam dan budaya Bali yang autentik!
        </p>
      </section>

      <section>
        <h3 className="text-xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Kalungan bunga",
            "Pantai Pandawa & Melasti",
            "Pura Uluwatu",
            "Makan malam (biaya sendiri)",
            "Check-in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan pagi di hotel",
            "Kunjungan ke Tirta Empul",
            "Makan siang di Kintamani",
            "Desa Penglipuran",
            "Coffee plantation tour",
          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Free program hingga check out", "Transfer ke bandara"]}
        />
      </section>
    </div>
  );
}

// 🏝️ Deskripsi untuk Lombok atau Bali–Jakarta
function DeskripsiLombok({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 text-gray-800 leading-relaxed">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 30}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 5}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Pelabuhan Lembar"}
        />
      </div>

      <section>
        <p>
          Paket wisata 3 hari 2 malam menjelajahi keindahan Lombok — Gili
          Trawangan, Senggigi, dan Desa Sade. Nikmati pantai berpasir putih,
          budaya Sasak, dan suasana tropis yang santai.
        </p>
      </section>

      <section>
        <h3 className="text-lg font-semibold mt-6 mb-2">Termasuk:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Hotel 2 malam</li>
          <li>Transport & sopir</li>
          <li>Tiket masuk objek wisata</li>
          <li>Air mineral & makan siang</li>
        </ul>
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
      <p className="font-semibold text-gray-800">{title}</p>
      <p className="text-gray-600 text-sm">{value}</p>
    </div>
  );
}







// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import Image from "next/image";
// import {
//   Loader2,
//   Calendar,
//   Users,
//   User,
//   MapPin,
//   ShoppingCart,
// } from "lucide-react";
// import TourPlanAccordion from "@/app/components/tourPlanAccordion";
// import AddToCart from "@/app/components/addToCart/index";

// interface PaketTourDetail {
//   id: number;
//   title: string;
//   slug: string;
//   description: string;
//   price: string | number;
//   stock: string | number;
//   duration_days?: number;
//   duration_nights?: number;
//   maximum_participants?: number;
//   minimum_age?: number;
//   pickup_location?: string;
//   image: string;
//   created_at: string;
// }

// export default function PaketTourDetailPage() {
//   const { slug } = useParams();
//   const [paket, setPaket] = useState<PaketTourDetail | null>(null);
//   const [loading, setLoading] = useState(true);

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   useEffect(() => {
//     const fetchDetail = async () => {
//       if (!token) return setLoading(false);
//       try {
//         const res = await axios.get<PaketTourDetail>(
//           `http://127.0.0.1:8000/api/paket-tours/${slug}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setPaket(res.data);
//       } catch {
//         setPaket(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetail();
//   }, [slug, token]);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-[70vh]">
//         <Loader2 className="animate-spin text-cyan-700 w-8 h-8" />
//       </div>
//     );

//   if (!paket)
//     return (
//       <p className="text-center mt-24 text-gray-500">
//         Paket tidak ditemukan
//       </p>
//     );

  
//   // 🔹 Deskripsi khusus berdasarkan slug
//   const deskripsiKhusus =
//     slug === "tour-bali-4-hari-3-malam" ? (
//       <div className="mt-10 space-y-8 text-gray-800 leading-relaxed">
//         {/* === Informasi Tambahan === */}
//         <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
//           <div className="flex flex-col items-center">
//             <Calendar className="w-8 h-8 text-red-500 mb-2" />
//             <p className="font-semibold text-gray-800">Durasi</p>
//             <p className="text-gray-600 text-sm">
//               {paket.duration_days ?? 3} Hari {paket.duration_nights ?? 2} Malam
//             </p>
//           </div>
//           <div className="flex flex-col items-center">
//             <Users className="w-8 h-8 text-red-500 mb-2" />
//             <p className="font-semibold text-gray-800">Maksimal Peserta</p>
//             <p className="text-gray-600 text-sm">
//               {paket.maximum_participants ?? 40}
//             </p>
//           </div>
//           <div className="flex flex-col items-center">
//             <User className="w-8 h-8 text-red-500 mb-2" />
//             <p className="font-semibold text-gray-800">Usia Minimum</p>
//             <p className="text-gray-600 text-sm">{paket.minimum_age ?? 3}+</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <MapPin className="w-8 h-8 text-red-500 mb-2" />
//             <p className="font-semibold text-gray-800">Penjemputan</p>
//             <p className="text-gray-600 text-sm">
//               {paket.pickup_location ?? "Bus/Mobil"}
//             </p>
//           </div>
//         </div>

//         {/* === Deskripsi Utama === */}
//         <section>
//           <p>
//             Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan
//             pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik
//             di Bali: Kintamani, Tirta Empul, dan Watersport. Dengan pemandangan
//             alam memukau, keindahan budaya, dan kuliner lezat, paket ini
//             dirancang untuk memenuhi berbagai selera wisatawan.
//           </p>
//         </section>

//         <section>
//           <h3 className="text-lg font-semibold mt-6 mb-2">Peserta</h3>
//           <ul className="list-disc list-inside space-y-1">
//             <li>Minimal peserta 2 orang dewasa.</li>
//             <li>Satu kamar hotel untuk 2 orang.</li>
//             <li>Peserta ganjil dapat extra bed sesuai ketersediaan.</li>
//             <li>Anak-anak 0-4 tahun gratis, 5-9 tahun diskon 50%.</li>
//           </ul>
//         </section>

//         <section>
//           <h3 className="text-lg font-semibold mt-6 mb-2">Pembayaran</h3>
//           <ul className="list-disc list-inside space-y-1">
//             <li>Deposit 50% saat pemesanan, sisanya saat tiba di Bali.</li>
//             <li>Transfer dilakukan setelah menerima invoice resmi.</li>
//             <li>Bukti pembayaran dikirim via WhatsApp atau email.</li>
//             <li>
//               Setelah pembayaran, kami kirim konfirmasi & itinerary lengkap.
//             </li>
//           </ul>
//         </section>

//         <section>
//           <h3 className="text-lg font-semibold mt-6 mb-2">Pembatalan</h3>
//           <ul className="list-disc list-inside space-y-1">
//             <li>Pembatalan mengikuti kebijakan vendor (hotel/aktivitas).</li>
//             <li>Deposit dikembalikan sesuai syarat penyedia layanan.</li>
//           </ul>
//         </section>

//         <section>
//           <h3 className="text-lg font-semibold mt-6 mb-2">Pilihan Hotel</h3>
//           <p>🏨 Grand Livio Hotel Kuta (3*) - Superior Room, 2 malam</p>
//           <p>🏨 Solaris Hotel Kuta (3*) - Deluxe Room, 2 malam</p>
//         </section>

//         <section>
//           <h3 className="text-xl font-semibold mt-6 mb-3">
//             Included / Excluded
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <ul className="space-y-1">
//               <li>✅ 2 malam hotel bintang 3</li>
//               <li>✅ Kalungan bunga di bandara</li>
//               <li>✅ Transport + driver guide</li>
//               <li>✅ Tiket masuk & makan siang</li>
//             </ul>
//             <ul className="space-y-1">
//               <li>❌ Tiket pesawat</li>
//               <li>❌ Makan malam</li>
//               <li>❌ Pengeluaran pribadi</li>
//               <li>❌ Tipping driver</li>
//             </ul>
//           </div>
//         </section>

//         <section>
//           <h3 className="text-xl font-semibold mt-6 mb-4">Tour Plan</h3>

//           <TourPlanAccordion
//             day="Day 1"
//             title="KEDATANGAN – ULUWATU TOUR"
//             items={[
//               "Penjemputan di Bandara Ngurah Rai",
//               "Pengalungan bunga",
//               "Makan Siang di Mak Jo",
//               "Pantai Pandawa & Tanah Barak",
//               "Pantai Melasti",
//               "Pura Uluwatu",
//               "Makan malam (biaya sendiri)",
//               "Check in hotel",
//             ]}
//           />

//           <TourPlanAccordion
//             day="Day 2"
//             title="FULL DAY KINTAMANI TOUR"
//             items={[
//               "Sarapan pagi di hotel",
//               "Kunjungan ke Tirta Empul",
//               "Makan siang di Kintamani",
//               "Desa Penglipuran",
//               "Coffee plantation tour",
//             ]}
//           />

//           <TourPlanAccordion
//             day="Day 3"
//             title="DAY OUT"
//             items={[
//               "Free program hingga check out",
//               "Transfer ke bandara",
//               "Tour selesai",
//             ]}
//           />
//         </section>
//       </div>
    
//   ) : slug === "bali-jakarta" ? (
//     <div className="mt-10 space-y-8 text-gray-800 leading-relaxed">
//       <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
//         <div className="flex flex-col items-center">
//           <Calendar className="w-8 h-8 text-red-500 mb-2" />
//           <p className="font-semibold text-gray-800">Durasi</p>
//           <p className="text-gray-600 text-sm">
//             {paket.duration_days ?? 3} Hari {paket.duration_nights ?? 2} Malam
//           </p>
//         </div>
//         <div className="flex flex-col items-center">
//           <Users className="w-8 h-8 text-red-500 mb-2" />
//           <p className="font-semibold text-gray-800">Maksimal Peserta</p>
//           <p className="text-gray-600 text-sm">
//             {paket.maximum_participants ?? 30}
//           </p>
//         </div>
//         <div className="flex flex-col items-center">
//           <User className="w-8 h-8 text-red-500 mb-2" />
//           <p className="font-semibold text-gray-800">Usia Minimum</p>
//           <p className="text-gray-600 text-sm">{paket.minimum_age ?? 5}+</p>
//         </div>
//         <div className="flex flex-col items-center">
//           <MapPin className="w-8 h-8 text-red-500 mb-2" />
//           <p className="font-semibold text-gray-800">Penjemputan</p>
//           <p className="text-gray-600 text-sm">
//             {paket.pickup_location ?? "Pelabuhan Lembar"}
//           </p>
//         </div>
//       </div>

//       <section>
//         <p>
//           Paket wisata 3 hari 2 malam menjelajahi keindahan Lombok — Gili Trawangan, Senggigi, dan Desa Sade. 
//           Nikmati pantai berpasir putih, budaya Sasak, dan suasana tropis yang santai.
//         </p>
//       </section>

//       <section>
//         <h3 className="text-lg font-semibold mt-6 mb-2">Termasuk:</h3>
//         <ul className="list-disc list-inside space-y-1">
//           <li>Hotel 2 malam</li>
//           <li>Transport & sopir</li>
//           <li>Tiket masuk objek wisata</li>
//           <li>Air mineral & makan siang</li>
//         </ul>
//       </section>
//     </div>
//   ) : null;
    

    

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       {/* Grid dua kolom */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Kiri - Gambar */}
//         <div className="bg-white rounded-2xl shadow-md overflow-hidden">
//           <div className="relative w-full h-80">
//             <Image
//               src={`http://127.0.0.1:8000/storage/${paket.image}`}
//               alt={paket.title}
//               fill
//               className="object-cover"
//             />
//           </div>
//         </div>

//         {/* Kanan - Detail + AddToCart */}
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col justify-between">
//           {/* Judul & Harga */}
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-3">
//               {paket.title}
//             </h1>
//             <p className="text-2xl font-semibold text-cyan-700 mb-4">
//               Rp{Number(paket.price).toLocaleString("id-ID")}
//             </p>
//             <p className="text-gray-600 text-sm leading-relaxed mb-6">
//               {paket.description}
//             </p>
//           </div>

//           {/* Tombol AddToCart */}
//           <AddToCart
//             paketId={paket.id}
//             title={paket.title}
//             price={Number(paket.price)}
//           />
//         </div>
//       </div>

//       {/* Deskripsi Tambahan */}
//       {deskripsiKhusus}
//     </div>
//   );
// }



















































// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import Image from "next/image";
// import { Loader2 } from "lucide-react";

// interface PaketTourDetail {
//   id: number;
//   title: string;
//   slug: string;
//   description: string;
//   price: string | number;
//   stock: string | number;
//   duration_days?: number;
//   duration_nights?: number;
//   maximum_participants?: number;
//   minimum_age?: number;
//   pickup_location?: string;
//   image: string;
//   created_at: string;
// }

// export default function PaketTourDetailPage() {
//   const { slug } = useParams();
//   const [paket, setPaket] = useState<PaketTourDetail | null>(null);
//   const [loading, setLoading] = useState(true);

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   // 🧭 Deskripsi manual berdasarkan slug
//   const deskripsiTambahan: Record<
//     string,
//     { title: string; content: string[] }
//   > = {
//     "tour-bali-4-hari-3-malam": {
//       title: "Nikmati Petualangan Seru di Pulau Bali",
//       content: [
//         "Jelajahi keindahan alam Bali dari pantai hingga pegunungan. Dalam paket ini, Anda akan menikmati pengalaman rafting di Sungai Ayung, kunjungan ke Ubud, dan makan malam romantis di Jimbaran.",
//         "Paket ini sudah termasuk penginapan bintang 4, transportasi selama perjalanan, serta pemandu lokal berpengalaman.",
//       ],
//     },
//     "lombok-explore": {
//       title: "Eksplorasi Keindahan Alam Lombok",
//       content: [
//         "Nikmati pantai-pantai eksotis seperti Tanjung Aan, Gili Trawangan, dan Pantai Kuta Lombok. Kegiatan snorkeling dan sunset trip sudah termasuk dalam paket ini.",
//         "Cocok untuk Anda yang mencari liburan santai namun tetap penuh petualangan.",
//       ],
//     },
//     "jogja-cultural": {
//       title: "Wisata Budaya dan Sejarah Yogyakarta",
//       content: [
//         "Paket ini menawarkan pengalaman budaya yang mendalam di Yogyakarta — kunjungi Candi Borobudur, Keraton, dan Malioboro dalam satu perjalanan.",
//         "Anda juga akan menikmati kuliner khas Jogja dan belajar membuat batik di workshop lokal.",
//       ],
//     },
//   };

//   useEffect(() => {
//     const fetchDetail = async () => {
//       if (!token) return setLoading(false);
//       try {
//         const res = await axios.get<PaketTourDetail>(
//           `http://127.0.0.1:8000/api/paket-tours/${slug}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setPaket(res.data);
//       } catch {
//         setPaket(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetail();
//   }, [slug, token]);

//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-[70vh]">
//         <Loader2 className="animate-spin text-cyan-700 w-8 h-8" />
//       </div>
//     );

//   if (!paket)
//     return (
//       <p className="text-center mt-24 text-gray-500">
//         Paket tidak ditemukan
//       </p>
//     );

//   const deskripsi = deskripsiTambahan[slug as string];

//   return (
//     <div className="min-h-screen bg-gray-50 py-10 px-4">
//       {/* Card kecil */}
//       <div className="max-w-sm mx-auto bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200">
//         {/* Gambar */}
//         <div className="relative w-full h-56">
//           <Image
//             src={`http://127.0.0.1:8000/storage/${paket.image}`}
//             alt={paket.title}
//             fill
//             className="object-cover"
//           />
//         </div>

//         {/* Isi card */}
//         <div className="p-6">
//           <h1 className="text-2xl font-bold mb-3 text-gray-900">
//             {paket.title}
//           </h1>

//           {/* Info singkat */}
//           <div className="flex flex-wrap gap-2 mb-4 text-xs text-gray-700">
//             <span className="bg-cyan-50 text-cyan-800 px-2 py-1 rounded-md">
//               ⏱️ {paket.duration_days ?? 5}H {paket.duration_nights ?? 4}M
//             </span>
//             {paket.maximum_participants && (
//               <span className="bg-cyan-50 text-cyan-800 px-2 py-1 rounded-md">
//                 👥 {paket.maximum_participants} Orang
//               </span>
//             )}
//             {paket.minimum_age && (
//               <span className="bg-cyan-50 text-cyan-800 px-2 py-1 rounded-md">
//                 🎂 {paket.minimum_age}+ Th
//               </span>
//             )}
//             {paket.stock && (
//               <span className="bg-cyan-50 text-cyan-800 px-2 py-1 rounded-md">
//                 📦 Sisa {paket.stock}
//               </span>
//             )}
//             {paket.pickup_location && (
//               <span className="bg-cyan-50 text-cyan-800 px-2 py-1 rounded-md">
//                 🚗 {paket.pickup_location}
//               </span>
//             )}
//           </div>

//           <p className="text-gray-700 text-sm mb-4 line-clamp-5">
//             {paket.description}
//           </p>

//           <div className="flex items-center justify-between mt-4">
//             <p className="text-xl font-semibold text-cyan-700">
//               Rp{Number(paket.price).toLocaleString("id-ID")}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Deskripsi Tambahan Berdasarkan Slug */}
//       {deskripsi && (
//         <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-sm p-8 border border-gray-200">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-900">
//             {deskripsi.title}
//           </h2>
//           {deskripsi.content.map((p, i) => (
//             <p key={i} className="text-gray-700 leading-relaxed mb-4">
//               {p}
//             </p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }










// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import Image from "next/image";
// import { Loader2 } from "lucide-react";
// // import GalleryCarousel from '@/app/components/GalleryCarousel/index';

// interface PaketTourDetail {
//   id: number;
//   title: string;
//   slug: string;
//   description: string;
//   price: string | number;
//   duration_days?: number;
//   duration_nights?: number;
//   maximum_participants?: number;
//   minimum_age?: number;
//   pickup_location?: string;
//   image: string;
//   created_at: string;
// }

// export default function PaketTourDetailPage() {
//   const { slug } = useParams();
//   const [paket, setPaket] = useState<PaketTourDetail | null>(null);
//   const [loading, setLoading] = useState(true);

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   useEffect(() => {
//     const fetchDetail = async () => {
//       if (!token) return setLoading(false);
//       try {
//         const res = await axios.get<PaketTourDetail>(
//           `http://127.0.0.1:8000/api/paket-tours/${slug}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setPaket(res.data);
//       } catch {
//         setPaket(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetail();
//   }, [slug, token]);

//   if (loading) return <Loader2 className="animate-spin text-cyan-700 w-8 h-8 mx-auto mt-24" />;
//   if (!paket) return <p className="text-center mt-24 text-gray-500">Paket tidak ditemukan</p>;

//   return (
    
//     <div className="max-w-6xl mx-auto px-4 py-10">
//         {/* <GalleryCarousel /> */}
//       <div className="relative w-full h-64 md:h-96 mb-6">
//         <Image src={`http://127.0.0.1:8000/storage/${paket.image}`} alt={paket.title} fill className="object-cover rounded-lg" />
//       </div>

//       <h1 className="text-3xl font-bold mb-4">{paket.title}</h1>

//       <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-700">
//         <span>⏱️ {paket.duration_days ?? 5} Hari {paket.duration_nights ?? 4} Malam</span>
//         {paket.maximum_participants && <span>👥 Maks. {paket.maximum_participants} Peserta</span>}
//         {paket.minimum_age && <span>🎂 Usia min. {paket.minimum_age} Tahun</span>}
//         {paket.pickup_location && <span>🚗 Penjemputan: {paket.pickup_location}</span>}
//       </div>

//       <p className="text-gray-800 mb-6">{paket.description}</p>

//       <p className="text-2xl font-bold mb-4">Rp{Number(paket.price).toLocaleString("id-ID")}</p>
//     </div>
//   );
// }
