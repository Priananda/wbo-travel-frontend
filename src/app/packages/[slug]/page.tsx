"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import {
  Calendar,
  Users,
  User,
  MapPin,
} from "lucide-react";
import TourPlanAccordion from "@/app/components/tourPlanAccordion";
import AddToCart from "@/app/components/addToCart/index";
import Loading from "@/app/components/loading/index"; // ✅ pakai component Loading

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
      <DeskripsiBali paket={paket} />
    ) : slug === "bali-jakarta" ? (
      <DeskripsiLombok paket={paket} />
    ) : null;

  return (
    
    <div className="min-h-screen bg-white py-10 px-4">
      <div className="absolute top-0 left-0 w-full z-50">
                <Navbar />
           </div>
      {/* Grid dua kolom */}
      <div className="mt-32 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            image={`http://127.0.0.1:8000/storage/${paket.image}`}
            description={paket.description}
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

//   // ✅ Fetch tanpa perlu login
//   useEffect(() => {
//     const fetchDetail = async () => {
//       try {
//         const res = await axios.get<PaketTourDetail>(
//           `http://127.0.0.1:8000/api/paket-tours/${slug}`
//         );
//         setPaket(res.data);
//       } catch {
//         setPaket(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetail();
//   }, [slug]);

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
//       <DeskripsiBali paket={paket} />
//     ) : slug === "bali-jakarta" ? (
//       <DeskripsiLombok paket={paket} />
//     ) : null;

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
//              image={`http://127.0.0.1:8000/storage/${paket.image}`} // ✅ kirim URL lengkap
//             description={paket.description}
//           />
//         </div>
//       </div>

//       {/* Deskripsi Tambahan */}
//       {deskripsiKhusus}
//     </div>
//   );
// }

// /* === COMPONENT DESKRIPSI TAMBAHAN === */

// // 🌴 Deskripsi untuk Tour Bali
// function DeskripsiBali({ paket }: { paket: PaketTourDetail }) {
//   return (
//     <div className="mt-10 space-y-8 text-gray-800 leading-relaxed">
//       <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
//         <InfoItem
//           icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
//           title="Durasi"
//           value={`${paket.duration_days ?? 3} Hari ${
//             paket.duration_nights ?? 2
//           } Malam`}
//         />
//         <InfoItem
//           icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
//           title="Maksimal Peserta"
//           value={paket.maximum_participants ?? 40}
//         />
//         <InfoItem
//           icon={<User className="w-8 h-8 text-red-500 mb-2" />}
//           title="Usia Minimum"
//           value={`${paket.minimum_age ?? 3}+`}
//         />
//         <InfoItem
//           icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
//           title="Penjemputan"
//           value={paket.pickup_location ?? "Bus/Mobil"}
//         />
//       </div>

//       <section>
//         <p>
//           Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan
//           pengalaman tak terlupakan di Bali: Kintamani, Tirta Empul, dan
//           Watersport. Nikmati keindahan alam dan budaya Bali yang autentik!
//         </p>
//       </section>

//       <section>
//         <h3 className="text-xl font-semibold mt-6 mb-3">Tour Plan</h3>
//         <TourPlanAccordion
//           day="Day 1"
//           title="KEDATANGAN – ULUWATU TOUR"
//           items={[
//             "Penjemputan di Bandara Ngurah Rai",
//             "Kalungan bunga",
//             "Pantai Pandawa & Melasti",
//             "Pura Uluwatu",
//             "Makan malam (biaya sendiri)",
//             "Check-in hotel",
//           ]}
//         />
//         <TourPlanAccordion
//           day="Day 2"
//           title="FULL DAY KINTAMANI TOUR"
//           items={[
//             "Sarapan pagi di hotel",
//             "Kunjungan ke Tirta Empul",
//             "Makan siang di Kintamani",
//             "Desa Penglipuran",
//             "Coffee plantation tour",
//           ]}
//         />
//         <TourPlanAccordion
//           day="Day 3"
//           title="DAY OUT"
//           items={["Free program hingga check out", "Transfer ke bandara"]}
//         />
//       </section>
//     </div>
//   );
// }

// // 🏝️ Deskripsi untuk Lombok atau Bali–Jakarta
// function DeskripsiLombok({ paket }: { paket: PaketTourDetail }) {
//   return (
//     <div className="mt-10 space-y-8 text-gray-800 leading-relaxed">
//       <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
//         <InfoItem
//           icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
//           title="Durasi"
//           value={`${paket.duration_days ?? 3} Hari ${
//             paket.duration_nights ?? 2
//           } Malam`}
//         />
//         <InfoItem
//           icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
//           title="Maksimal Peserta"
//           value={paket.maximum_participants ?? 30}
//         />
//         <InfoItem
//           icon={<User className="w-8 h-8 text-red-500 mb-2" />}
//           title="Usia Minimum"
//           value={`${paket.minimum_age ?? 5}+`}
//         />
//         <InfoItem
//           icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
//           title="Penjemputan"
//           value={paket.pickup_location ?? "Pelabuhan Lembar"}
//         />
//       </div>

//       <section>
//         <p>
//           Paket wisata 3 hari 2 malam menjelajahi keindahan Lombok — Gili
//           Trawangan, Senggigi, dan Desa Sade. Nikmati pantai berpasir putih,
//           budaya Sasak, dan suasana tropis yang santai.
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
//   );
// }

// // 🔸 Komponen kecil untuk info
// function InfoItem({
//   icon,
//   title,
//   value,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   value: string | number;
// }) {
//   return (
//     <div className="flex flex-col items-center">
//       {icon}
//       <p className="font-semibold text-gray-800">{title}</p>
//       <p className="text-gray-600 text-sm">{value}</p>
//     </div>
//   );
// }







