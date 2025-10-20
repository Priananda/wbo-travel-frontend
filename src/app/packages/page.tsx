"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import dayjs from "dayjs";
import FavoriteButton from "@/app/components/FavoriteButton";

interface PaketTour {
  id: number;
  title: string;
  slug: string;
  price: string | number;
  duration_days?: number;
  duration_nights?: number;
  image: string;
  created_at: string;
}

export default function PaketTourPage() {
  const [packages, setPackages] = useState<PaketTour[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("default");
  const [totalItems, setTotalItems] = useState(0);
  const perPage = 8;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchPackages = async () => {
    if (!token) return setLoading(false);
    setLoading(true);

    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/paket-tours",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            page,
            per_page: perPage,
            sort, // default | popularity | rating | latest | price_asc | price_desc
          },
        }
      );

      setPackages(res.data.data);
      setTotalPages(res.data.meta.last_page);
      setTotalItems(res.data.meta.total);
    } catch (err) {
      console.error(err);
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [page, sort]);

  const isFeatured = (created_at: string) =>
    dayjs().diff(dayjs(created_at), "day") < 7;

  if (loading)
    return (
      <Loader2 className="animate-spin text-cyan-700 w-8 h-8 mx-auto mt-24" />
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* 🔹 Result Count + Sorting */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
        <p>
          Showing {(page - 1) * perPage + 1}–
          {Math.min(page * perPage, totalItems)} of {totalItems} results
        </p>

        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="border px-3 py-1 rounded-md"
        >
          <option value="default">Default sorting</option>
          <option value="latest">Sort by latest</option>
          <option value="price_asc">Sort by price: low to high</option>
          <option value="price_desc">Sort by price: high to low</option>
        </select>
      </div>

      {/* 🔹 Grid Paket */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition flex flex-col"
          >
            <div className="relative w-full h-56">
              <Image
                src={`http://127.0.0.1:8000/storage/${pkg.image}`}
                alt={pkg.title}
                fill
                className="object-cover"
              />
              {isFeatured(pkg.created_at) && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  Featured
                </span>
              )}
              <div className="absolute top-2 right-2">
                <FavoriteButton paketId={pkg.id} />
              </div>
            </div>

            <div className="p-4 flex flex-col flex-grow justify-between">
              <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 text-sm rounded-md font-semibold mb-2">
                ⏱️ {pkg.duration_days ?? "-"} Hari {pkg.duration_nights ?? "-"}{" "}
                Malam
              </span>

              <h3 className="text-lg font-semibold text-gray-900 hover:text-teal-600 cursor-pointer mb-2">
                {pkg.title}
              </h3>

              <div className="flex items-center justify-between mt-2">
                <p className="text-base font-bold text-gray-900">
                  Rp{Number(pkg.price).toLocaleString("id-ID")}
                </p>
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="bg-cyan-700 hover:bg-cyan-800 text-white px-3 py-1 rounded-md text-sm"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            ‹
          </button>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => Math.abs(p - page) <= 2) // tampilkan hanya sekitar
          .map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded-md ${
                p === page
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {p}
            </button>
          ))}

        {page < totalPages && (
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}









// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import { Loader2 } from "lucide-react";
// import FavoriteButton from "@/app/components/FavoriteButton";
// import dayjs from "dayjs";

// interface PaketTour {
//   id: number;
//   title: string;
//   slug: string;
//   price: string | number;
//   duration_days?: number;
//   duration_nights?: number;
//   image: string;
//   created_at: string;
// }

// export default function PaketTourPage() {
//   const [packages, setPackages] = useState<PaketTour[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [sort, setSort] = useState("default");
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const fetchPackages = async () => {
//     if (!token) return setLoading(false);
//     setLoading(true);

//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/paket-tours", {
//         headers: { Authorization: `Bearer ${token}` },
//         params: {
//           page,
//           per_page: 8,
//           sort, // default | popularity | rating | latest | price_asc | price_desc
//         },
//       });

//       // Asumsikan API mengembalikan data + meta info
//       setPackages(res.data.data);
//       setTotalPages(res.data.meta.last_page);
//     } catch (err) {
//       console.error(err);
//       setPackages([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPackages();
//   }, [token, page, sort]);

//   const isFeatured = (created_at: string) => dayjs().diff(dayjs(created_at), "day") < 7;

//   if (loading)
//     return <Loader2 className="animate-spin text-cyan-700 w-8 h-8 mx-auto mt-24" />;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       {/* 🔹 Sorting */}
//       <div className="flex justify-end mb-4">
//         <select
//           value={sort}
//           onChange={(e) => {
//             setSort(e.target.value);
//             setPage(1); // reset page
//           }}
//           className="border px-3 py-1 rounded-md"
//         >
//           <option value="default">Default sorting</option>
//           <option value="popularity">Sort by popularity</option>
//           <option value="rating">Sort by average rating</option>
//           <option value="latest">Sort by latest</option>
//           <option value="price_asc">Sort by price: low to high</option>
//           <option value="price_desc">Sort by price: high to low</option>
//         </select>
//       </div>

//       {/* 🔹 Paket Tour Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {packages.map((pkg) => (
//           <div
//             key={pkg.id}
//             className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition flex flex-col"
//           >
//             <div className="relative w-full h-56">
//               <Image
//                 src={`http://127.0.0.1:8000/storage/${pkg.image}`}
//                 alt={pkg.title}
//                 fill
//                 className="object-cover"
//               />
//               {isFeatured(pkg.created_at) && (
//                 <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
//                   Featured
//                 </span>
//               )}
//               <div className="absolute top-2 right-2">
//                 <FavoriteButton paketId={pkg.id} />
//               </div>
//             </div>

//             <div className="p-4 flex flex-col flex-grow justify-between">
//               <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 text-sm rounded-md font-semibold mb-2">
//                 ⏱️ {pkg.duration_days ?? "-"} Hari {pkg.duration_nights ?? "-"} Malam
//               </span>

//               <h3 className="text-lg font-semibold text-gray-900 hover:text-teal-600 cursor-pointer mb-2">
//                 {pkg.title}
//               </h3>

//               <div className="flex items-center justify-between mt-2">
//                 <p className="text-base font-bold text-gray-900">
//                   Rp{Number(pkg.price).toLocaleString("id-ID")}
//                 </p>
//                 <Link
//                   href={`/packages/${pkg.slug}`}
//                   className="bg-cyan-700 hover:bg-cyan-800 text-white px-3 py-1 rounded-md text-sm"
//                 >
//                   Explore
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* 🔹 Pagination */}
//       {/* 🔹 Pagination */} 
// <div className="flex justify-center mt-6 space-x-2">
//   {page > 1 && (
//     <button
//       onClick={() => setPage(page - 1)}
//       className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//     >
//       ‹
//     </button>
//   )}

//   {Array.from({ length: totalPages }, (_, i) => i + 1)
//     .filter(p => Math.abs(p - page) <= 2) // Hanya tampilkan 2 kiri & kanan
//     .map((p) => (
//       <button
//         key={p}
//         onClick={() => setPage(p)}
//         className={`px-4 py-2 rounded-md ${
//           p === page ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
//         }`}
//       >
//         {p}
//       </button>
//     ))}

//   {page < totalPages && (
//     <button
//       onClick={() => setPage(page + 1)}
//       className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//     >
//       ›
//     </button>
//   )}
// </div>

//     </div>
//   );
// }



// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import { Loader2 } from "lucide-react";
// import FavoriteButton from "@/app/components/FavoriteButton";
// import dayjs from "dayjs";

// interface PaketTour {
//   id: number;
//   title: string;
//   slug: string;
//   price: string | number;
//   duration_days?: number;
//   duration_nights?: number;
  
//   image: string;
//   created_at: string;
// }

// export default function PaketTourPage() {
//   const [packages, setPackages] = useState<PaketTour[]>([]);
//   const [loading, setLoading] = useState(true);

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   useEffect(() => {
//     const fetchPackages = async () => {
//       if (!token) return setLoading(false);

//       try {
//         const res = await axios.get<PaketTour[]>(
//           "http://127.0.0.1:8000/api/paket-tours",
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setPackages(res.data || []);
//       } catch {
//         setPackages([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPackages();
//   }, [token]);

//   const isFeatured = (created_at: string) => dayjs().diff(dayjs(created_at), "day") < 7;

//   if (loading) return <Loader2 className="animate-spin text-cyan-700 w-8 h-8 mx-auto mt-24" />;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {packages.map((pkg) => (
//         <div key={pkg.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition flex flex-col">
//           <div className="relative w-full h-56">
//             <Image src={`http://127.0.0.1:8000/storage/${pkg.image}`} alt={pkg.title} fill className="object-cover" />
//             {isFeatured(pkg.created_at) && (
//               <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
//                 Featured
//               </span>
//             )}
//             <div className="absolute top-2 right-2">
//               <FavoriteButton paketId={pkg.id} />
//             </div>
//           </div>

//           <div className="p-4 flex flex-col flex-grow justify-between">
//             <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 text-sm rounded-md font-semibold mb-2">
//               ⏱️ {pkg.duration_days ?? 5} Hari {pkg.duration_nights ?? 4} Malam
//             </span>

//             <h3 className="text-lg font-semibold text-gray-900 hover:text-teal-600 cursor-pointer mb-2">
//               {pkg.title}
//             </h3>

//             <div className="flex items-center justify-between mt-2">
//               <p className="text-base font-bold text-gray-900">
//                 Rp{Number(pkg.price).toLocaleString("id-ID")}
//               </p>
//               <Link href={`/packages/${pkg.slug}`} className="bg-cyan-700 hover:bg-cyan-800 text-white px-3 py-1 rounded-md text-sm">
//                 Explore
//               </Link>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }








// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
// import { hkGrotesk } from "@/app/fonts/fonts";
// import { Loader2 } from "lucide-react";
// import Navbar from "@/app/components/navbar";
// import FavoriteButton from "@/app/components/FavoriteButton";
// import dayjs from "dayjs";

// interface PaketTour {
//   id: number;
//   title: string;
//   slug: string;
//   description: string;
//   price: string | number;
//   duration_days?: number; // jumlah hari
//   duration_nights?: number; // jumlah malam
//   maximum_participants?: number; // maksimal peserta
//   minimum_age?: number; // usia minimum
//   pickup_location?: string; // lokasi penjemputan
//   image: string;
//   created_at: string; // untuk featured
// }


// export default function PaketTourPage() {
//   const [packages, setPackages] = useState<PaketTour[]>([]);
//   const [loading, setLoading] = useState(true);

//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   useEffect(() => {
//     const fetchPackages = async () => {
//       if (!token) {
//         console.error("Token tidak tersedia!");
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       try {
//         const response = await axios.get<PaketTour[]>(
//           "http://127.0.0.1:8000/api/paket-tours",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setPackages(response.data || []);
//       } catch (error) {
//         console.error("Gagal mengambil data paket tour:", error);
//         setPackages([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPackages();
//   }, [token]);

//   // fungsi cek apakah paket terbaru (< 7 hari)
//   const isFeatured = (created_at: string) => {
//     const now = dayjs();
//     const created = dayjs(created_at);
//     return now.diff(created, "day") < 7; // tampil badge jika < 7 hari
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <Loader2 className="animate-spin text-cyan-700 w-8 h-8" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <div className="absolute top-0 left-0 w-full z-50">
//         <Navbar />
//       </div>

//       {/* 🔹 Judul Section */}
//       <div className="flex flex-col items-center justify-center mb-6 md:flex-row">
//         <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-full mb-3 md:mb-0 md:mr-4"></div>
//         <h2
//           className={`text-3xl md:text-4xl lg:text-4xl text-black drop-shadow-sm font-semibold text-center md:text-left ${hkGrotesk.className}`}
//         >
//           Paket Wisata Unggulan
//         </h2>
//       </div>

//       <p className="mb-12 text-lg text-gray-800 text-center md:text-left">
//         Ada banyak alasan menggunakan Wisata Bali Oke sebagai pilihan layanan tour di Bali
//       </p>

//       {/* 🔹 Grid daftar paket wisata */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {packages.map((pkg) => (
//           <div
//             key={pkg.id}
//             className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition flex flex-col"
//           >
//             {/* 🔹 Gambar di atas */}
//             <div className="relative w-full h-56">
//               <Image
//                 src={`http://127.0.0.1:8000/storage/${pkg.image}`}
//                 alt={pkg.title}
//                 fill
//                 className="object-cover"
//               />

//               {/* 🔹 Featured badge */}
//               {isFeatured(pkg.created_at) && (
//                 <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
//                   Featured
//                 </span>
//               )}

//               {/* 🔹 Favorite button */}
//               <div className="absolute top-2 right-2">
//                 <FavoriteButton paketId={pkg.id} />
//               </div>
//             </div>
// <div className="p-5 flex flex-col flex-grow justify-between">
//   <div>
//     {/* Durasi */}
//     <div className="mb-2">
//       <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 text-sm rounded-md font-semibold">
//         ⏱️ {pkg.duration_days ?? 5} Hari {pkg.duration_nights ?? 4} Malam
//       </span>
//     </div>

//     {/* Maksimal peserta */}
//     {pkg.maximum_participants && (
//       <div className="mb-2">
//         <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 text-sm rounded-md font-semibold">
//           👥 Maks. {pkg.maximum_participants} Peserta
//         </span>
//       </div>
//     )}

//     {/* Usia minimum */}
//     {pkg.minimum_age && (
//       <div className="mb-2">
//         <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 text-sm rounded-md font-semibold">
//           🎂 Usia min. {pkg.minimum_age} Tahun
//         </span>
//       </div>
//     )}

//     {/* Lokasi penjemputan */}
//     {pkg.pickup_location && (
//       <div className="mb-2">
//         <span className="inline-block px-3 py-1 bg-teal-50 text-teal-600 text-sm rounded-md font-semibold">
//           🚗 Penjemputan: {pkg.pickup_location}
//         </span>
//       </div>
//     )}

//     {/* Judul */}
//     <h3 className="text-lg font-semibold text-gray-900 hover:text-teal-600 cursor-pointer leading-snug mb-2">
//       {pkg.title}
//     </h3>

//     {/* Deskripsi */}
//     <p className="text-gray-700 text-sm line-clamp-3">{pkg.description}</p>
//   </div>

//   {/* Harga & tombol Explore */}
//   <div className="flex items-center justify-between mt-3">
//     <p className="text-base font-bold text-gray-900">
//       Rp{Number(pkg.price).toLocaleString("id-ID")}
//     </p>
//     <Link
//       href={`/packages/${pkg.slug}`}
//       className="bg-cyan-700 hover:bg-cyan-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
//     >
//       Explore
//     </Link>
//   </div>
// </div>

//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }














// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import FavoriteButton from "@/app/components/FavoriteButton";
// import { hkGrotesk } from "@/app/fonts/fonts";

// // Nanti bagian ini akan diganti dengan fetch API dari Laravel (SSR)
// const staticPackages = [
//   {
//     id: 1,
//     title: "Paket Wisata Bali – Fullday Bedugul Tour",
//     duration: "1 day",
//     price: 750000,
//     image_url:
//       "https://images.unsplash.com/photo-1553514029-1318c9127859?auto=format&fit=crop&w=800&q=80",
//     slug: "paket-wisata-bali-bedugul",
//   },
//   {
//     id: 2,
//     title: "Paket Wisata Bali – Fullday Ubud Tour",
//     duration: "1 day",
//     price: 700000,
//     image_url:
//       "https://images.unsplash.com/photo-1553514029-1318c9127859?auto=format&fit=crop&w=800&q=80",
//     slug: "paket-wisata-bali-ubud",
//   },
//   {
//     id: 3,
//     title: "Paket Wisata Bali – Fullday Kintamani Tour",
//     duration: "1 day",
//     price: 800000,
//     image_url:
//       "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80",
//     slug: "paket-wisata-bali-kintamani",
//   },
//   {
//     id: 4,
//     title: "Paket Wisata Bali – Halfday Tanah Lot Tour",
//     duration: "Half day",
//     price: 500000,
//     image_url:
//       "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
//     slug: "paket-wisata-bali-tanah-lot",
//   },
// ];

// export default function PackagesPage() {
//   const packages = staticPackages;

//   return (
//     <section className="py-16 px-4 bg-gradient-to-b from-teal-50 to-cyan-50">
//       <div className="max-w-6xl mx-auto text-center">
//         {/* 🔹 Judul Section */}
//         <div className="flex flex-col items-center justify-center mb-6 md:flex-row">
//           <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-full mb-3 md:mb-0 md:mr-4"></div>
//           <h2
//             className={`text-3xl md:text-4xl lg:text-4xl text-black drop-shadow-sm font-semibold text-center md:text-left ${hkGrotesk.className}`}
//           >
//             Paket Wisata Unggulan
//           </h2>
//         </div>

//         <p className="mb-12 text-lg text-gray-800">
//           Ada banyak alasan menggunakan Wisata Bali Oke sebagai pilihan layanan
//           tour di Bali
//         </p>

//         {/* 🔹 Grid daftar paket wisata */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-center">
//           {packages.map((pkg) => (
//             <div
//               key={pkg.id}
//               className="flex flex-col md:flex-row bg-white rounded-md shadow-sm overflow-hidden hover:shadow-md transition"
//             >
//               {/* 🔹 Gambar utama paket */}
//               <div className="relative w-full md:w-72 h-56 md:h-auto">
//                 <Image
//                   src={pkg.image_url}
//                   alt={pkg.title}
//                   fill
//                   className="object-cover"
//                 />
//                 <div className="absolute top-2 right-2">
//                   <FavoriteButton />
//                 </div>
//               </div>

//               {/* 🔹 Bagian teks */}
//               <div className="p-6 text-left flex flex-col justify-between md:w-3/5">
//                 <div className={`${hkGrotesk.className}`}>
//                   {/* Durasi */}
//                   <div className="px-3 py-1.5 mb-3 inline-flex items-center border bg-teal-50 text-teal-600 text-sm rounded-md font-semibold">
//                     ⏱️ {pkg.duration}
//                   </div>

//                   {/* Judul */}
//                   <h3 className="text-xl font-semibold text-gray-900 hover:text-teal-600 cursor-pointer leading-snug">
//                     {pkg.title}
//                   </h3>
//                 </div>

//                 {/* Harga & Tombol */}
//                 <div
//                   className={`mt-5 flex items-center justify-between ${hkGrotesk.className}`}
//                 >
//                   <p className="text-lg font-bold text-gray-900">
//                     Rp{pkg.price.toLocaleString("id-ID")}
//                   </p>
//                   <Link
//                     href={`/packages/${pkg.slug}`}
//                     className={`inline-block bg-cyan-700 
//                       hover:bg-cyan-800 
//                       text-white px-5 py-2 rounded-lg shadow-sm
//                       transition-all duration-300 font-medium`}
//                   >
//                     Explore
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* 🔹 Tombol Explore More */}
//         <div className="mt-12">
//           <a
//             href="https://www.example.com"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={`inline-block bg-gradient-to-r from-teal-600 to-cyan-700 
//                hover:from-teal-800 hover:to-cyan-600 
//                text-white px-7 py-3 rounded-lg 
//                transition-all duration-300 font-medium ${hkGrotesk.className}`}
//           >
//             Explore More
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// }
