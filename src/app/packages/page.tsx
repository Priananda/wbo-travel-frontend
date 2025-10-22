"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import dayjs from "dayjs";
import FavoriteButton from "@/app/components/FavoriteButton";
import Navbar from "@/app/components/navbar";
import { hkGrotesk } from "@/app/fonts/fonts";
import Loading from "@/app/components/loading/index"; // ✅ pakai component Loading

interface PaketTour {
  id: number;
  title: string;
  slug: string;
  description: string;
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const perPage = 8;

  const sortOptions = [
    { value: "default", label: "Default sorting" },
    { value: "latest", label: "Sort by latest" },
    { value: "price_asc", label: "Price: low to high" },
    { value: "price_desc", label: "Price: high to low" },
  ];

  const fetchPackages = async () => {
    // setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/paket-tours", {
        params: {
          page,
          per_page: perPage,
          sort,
        },
      });

      setPackages(res.data.data);
      setTotalPages(res.data.meta.last_page);
      setTotalItems(res.data.meta.total);
    } catch (err) {
      console.error(err);
      setPackages([]);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [page, sort]);

  const isFeatured = (created_at: string) =>
    dayjs().diff(dayjs(created_at), "day") < 7;

  // if (loading) return <Loading />; // ✅ pakai component Loading

  return (
    <div className="max-w-6xl mx-auto py-10 relative">
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <h2
        className={`mt-32 mb-4 text-3xl md:text-4xl font-semibold text-black drop-shadow-sm ${hkGrotesk.className}`}
      >
        Paket Bali Tour
      </h2>

      {/* 🔹 Top Bar */}
      <div className="flex mb-10 justify-between items-center text-md text-gray-800 relative">
        <p className="text-lg">
          Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, totalItems)} of{" "}
          {totalItems} results
        </p>

        {/* 🔹 Custom Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2 border border-teal-700 px-5 py-3 rounded-full shadow-md bg-white hover:bg-teal-50 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {sortOptions.find((o) => o.value === sort)?.label}
            <ChevronDown className="w-5 h-5 mt-1" />
          </button>

          {dropdownOpen && (
            <ul className="absolute text-md right-0 mt-1 w-56 bg-white border border-slate-200 shadow-lg rounded-md z-50">
              {sortOptions.map((option) => (
                <li
                  key={option.value}
                  className={`px-4 py-2 cursor-pointer hover:bg-cyan-50 ${
                    sort === option.value ? "bg-cyan-100 font-semibold" : ""
                  }`}
                  onClick={() => {
                    setSort(option.value);
                    setPage(1);
                    setDropdownOpen(false);
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* 🔹 Grid Paket */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition ${hkGrotesk.className} group`}
          >
            {/* Gambar utama paket */}
            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src={`http://127.0.0.1:8000/storage/${pkg.image}`}
                alt={pkg.title}
                fill
                className="object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
              />

              {/* Durasi overlay */}
              <div className="absolute bottom-2 left-2 px-3 py-2 bg-cyan-50 text-cyan-700 text-sm font-semibold rounded-md inline-flex items-center shadow-sm">
                {pkg.duration_days ?? "-"} Hari {pkg.duration_nights ?? "-"} Malam
              </div>

              {/* Featured badge */}
              {isFeatured(pkg.created_at) && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-2 rounded-md">
                  Featured
                </span>
              )}

              {/* Favorite button */}
              <div className="absolute top-2 right-2">
                <FavoriteButton paketId={pkg.id} />
              </div>
            </div>

            {/* Bagian teks */}
            <div className="p-5 mt-2 flex flex-col flex-grow justify-between">
              {/* Judul */}
              <h3 className="text-xl font-semibold text-gray-900 hover:text-teal-700 cursor-pointer leading-snug mb-3 drop-shadow-xs">
                {pkg.title}
              </h3>

              {/* Deskripsi */}
              <p className="text-sm text-gray-900 leading-snug font-medium mb-3 line-clamp-3">
                {pkg.description || "........"}
              </p>

              {/* Harga & Tombol Explore */}
              <div className="mt-3 flex items-center justify-between">
                <p className="text-lg font-bold text-gray-900 drop-shadow-xs">
                  Rp{Number(pkg.price).toLocaleString("id-ID")}
                </p>
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-lg shadow-sm transition-all duration-300 font-medium"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 space-x-3 py-2 rounded-full border-2 border-slate-400 w-full max-w-xs mx-auto shadow shadow-teal-700/50">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((p) => Math.abs(p - page) <= 2)
          .map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded-md cursor-pointer ${
                p === page
                  ? "bg-gradient-to-r from-teal-600 to-cyan-700 text-white"
                  : "bg-slate-200 hover:bg-slate-300 text-black"
              }`}
            >
              {p}
            </button>
          ))}

        {page < totalPages && (
          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-slate-200 rounded-md hover:bg-slate-300 flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
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
// import { Loader2, ChevronDown } from "lucide-react";
// import dayjs from "dayjs";
// import FavoriteButton from "@/app/components/FavoriteButton";
// import Navbar from "@/app/components/navbar";
// import { hkGrotesk } from "@/app/fonts/fonts";
// import { ChevronRight } from "lucide-react";
// import { ChevronLeft } from "lucide-react";
// interface PaketTour {
//   id: number;
//   title: string;
//   slug: string;
//   description: string;
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
//   const [totalItems, setTotalItems] = useState(0);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const perPage = 8;

//   const sortOptions = [
//     { value: "default", label: "Default sorting" },
//     { value: "latest", label: "Sort by latest" },
//     { value: "price_asc", label: "Price: low to high" },
//     { value: "price_desc", label: "Price: high to low" },
//   ];

//   const fetchPackages = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/api/paket-tours", {
//         params: {
//           page,
//           per_page: perPage,
//           sort,
//         },
//       });

//       setPackages(res.data.data);
//       setTotalPages(res.data.meta.last_page);
//       setTotalItems(res.data.meta.total);
//     } catch (err) {
//       console.error(err);
//       setPackages([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPackages();
//   }, [page, sort]);

//   const isFeatured = (created_at: string) =>
//     dayjs().diff(dayjs(created_at), "day") < 7;

//   if (loading)
//     return (
//   <div className="flex justify-center items-center text-center mt-70">
//       <Loader2 className="animate-spin text-cyan-700 w-10 h-10" />
//       </div>
//     );

//   return (
//     <div className="max-w-6xl mx-auto  py-10 relative">
//       <div className="absolute top-0 left-0 w-full z-50">
//         <Navbar />
//       </div>

//       <h2
//         className={`mt-32 mb-4 text-3xl md:text-4xl font-semibold text-black drop-shadow-sm ${hkGrotesk.className}`}
//       >
//         Paket Bali Tour
//       </h2>

//       {/* 🔹 Top Bar */}
//       <div className="flex mb-10 justify-between items-center text-md text-gray-800 relative">
//         <p className="text-lg">
//           Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, totalItems)} of {totalItems} results
//         </p>

//         {/* 🔹 Custom Dropdown */}
//         <div className="relative">
//           <button
//             className="flex items-center gap-2 border border-teal-700 px-5 py-3 rounded-full shadow-md bg-white hover:bg-teal-50 cursor-pointer"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             {sortOptions.find((o) => o.value === sort)?.label}
//             <ChevronDown className="w-5 h-5 mt-1" />
//           </button>

//           {dropdownOpen && (
//             <ul className="absolute text-md right-0 mt-1 w-56 bg-white border border-slate-200 shadow-lg rounded-md z-50">
//               {sortOptions.map((option) => (
//                 <li
//                   key={option.value}
//                   className={`px-4 py-2 cursor-pointer hover:bg-cyan-50 ${
//                     sort === option.value ? "bg-cyan-100 font-semibold" : ""
//                   }`}
//                   onClick={() => {
//                     setSort(option.value);
//                     setPage(1);
//                     setDropdownOpen(false);
//                   }}
//                 >
//                   {option.label}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>

// {/* 🔹 Grid Paket */}
// {/* 🔹 Grid Paket */}
// <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
//   {packages.map((pkg) => (
//     <div
//       key={pkg.id}
//       className={`flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition ${hkGrotesk.className} group`}
//     >
//       {/* 🔹 Gambar utama paket */}
//       <div className="relative w-full h-56 overflow-hidden">
//         <Image
//           src={`http://127.0.0.1:8000/storage/${pkg.image}`}
//           alt={pkg.title}
//           fill
//           className="object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
//         />

//         {/* 🔹 Durasi overlay */}
//         <div className="absolute bottom-2 left-2 px-3 py-2 bg-cyan-50 text-cyan-700 text-sm font-semibold rounded-md inline-flex items-center shadow-sm">
//           {pkg.duration_days ?? "-"} Hari {pkg.duration_nights ?? "-"} Malam
//         </div>

//         {/* 🔹 Featured badge */}
//         {isFeatured(pkg.created_at) && (
//           <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-2 rounded-md">
//             Featured
//           </span>
//         )}

//         {/* 🔹 Favorite button */}
//         <div className="absolute top-2 right-2">
//           <FavoriteButton paketId={pkg.id} />
//         </div>
//       </div>

//       {/* 🔹 Bagian teks */}
//       <div className="p-5 mt-2 flex flex-col flex-grow justify-between">
//         {/* Judul */}
//         <h3 className="text-xl font-semibold text-gray-900 hover:text-teal-700 cursor-pointer leading-snug mb-3 drop-shadow-xs">
//           {pkg.title}
//         </h3>

//         {/* Deskripsi */}
//         <p className="text-sm text-gray-900 leading-snug font-medium mb-3 line-clamp-3">
//           {pkg.description || "........"}
//         </p>

//         {/* Harga & Tombol Explore */}
//         <div className="mt-3 flex items-center justify-between">
//           <p className="text-lg font-bold text-gray-900  drop-shadow-xs">
//             Rp{Number(pkg.price).toLocaleString("id-ID")}
//           </p>
//           <Link
//             href={`/packages/${pkg.slug}`}
//             className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-lg shadow-sm transition-all duration-300 font-medium"
//           >
//             Explore
//           </Link>
//         </div>
//       </div>
//     </div>
//   ))}
// </div>







//       {/* 🔹 Pagination */}
//       <div className="flex justify-center mt-10 space-x-3 py-2 rounded-full border-2 border-slate-400 w-full max-w-xs mx-auto shadow shadow-teal-700/50">
//         {page > 1 && (
//           <button
//             onClick={() => setPage(page - 1)}
//             className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 cursor-pointer"
//           >
//              <ChevronLeft className="w-4 h-4" />
//           </button>
//         )}

//         {Array.from({ length: totalPages }, (_, i) => i + 1)
//           .filter((p) => Math.abs(p - page) <= 2)
//           .map((p) => (
//            <button
//   key={p}
//   onClick={() => setPage(p)}
//   className={`px-4 py-2 rounded-md cursor-pointer ${
//     p === page
//       ? "bg-gradient-to-r from-teal-600 to-cyan-700 text-white"
//       : "bg-slate-200 hover:bg-slate-300 text-black"
//   }`}
// >
//   {p}
// </button>

//           ))}

//         {page < totalPages && (

// <button
//   onClick={() => setPage(page + 1)}
//   className="px-4 py-2 bg-slate-200 rounded-md hover:bg-slate-300 flex items-center justify-center cursor-pointer"
// >
//   <ChevronRight className="w-4 h-4" />
// </button>

//         )}
//       </div>
//     </div>
//   );
// }













