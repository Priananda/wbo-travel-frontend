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
  feature_duration_days?: number;
}

interface PaketCardProps {
  paket: PaketTour;
}

export default function PaketCard({ paket }: PaketCardProps) {
  const isFeatured = (created_at: string, feature_duration_days: number) => {
    const created = new Date(created_at);
    const now = new Date();
    const diffDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays < feature_duration_days;
  };

  return (
    <Link
      href={`/packages/${paket.slug}`}
      className={`group flex flex-col md:flex-row p-2 bg-white border border-cyan-700 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${hkGrotesk.className}`}
    >
      {/* Gambar */}
      <div className="relative w-full md:w-1/2 h-56 flex-shrink-0 overflow-hidden">
        <Image
          src={`http://127.0.0.1:8000/storage/${paket.image}`}
          alt={paket.title}
          fill
          className="object-cover rounded-sm transform transition-transform duration-500 ease-in-out group-hover:scale-105"
        />

        {/* Icon Favorite */}
        <div className="absolute top-2 right-2 z-10">
          <FavoriteButton />
        </div>

        {/* Featured Badge */}
        {isFeatured(paket.created_at, paket.feature_duration_days ?? 7) && (
          <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-semibold px-3 py-2 rounded-md shadow-md animate-pulse z-10">
            Featured
          </span>
        )}
      </div>

      {/* Konten */}
      <div className="flex flex-col justify-between p-4 w-full md:w-1/2">
        {/* Durasi */}
        <div className="flex items-center mt-2 md:-mt-1 md:mb-2 lg:-mt-1 lg:mb-2">
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
        <h3 className="mt-5 mb-6 md:mt-0 lg:mt-0 md:mb-4  lg:mb-4 text-lg font-semibold text-gray-900 leading-snug  line-clamp-2 group-hover:text-teal-700 transition">
          {paket.title}
        </h3>

        {/* Harga + Tombol Explore */}
        <div className="flex flex-col md:flex-col lg:flex-row items-start md:items-start lg:items-center justify-between mt-2 gap-3 md:gap-4">
  <p className="text-lg font-bold text-gray-900 drop-shadow-xs">
    Rp{Number(paket.price).toLocaleString("id-ID")}
  </p>

  <span className="bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-lg shadow-sm transition-all duration-300 font-medium cursor-pointer">
    Explore
  </span>
</div>

      </div>
    </Link>
  );
}



























// "use client";

// import Image from "next/image";
// import { hkGrotesk } from "@/app/fonts/fonts";
// import FavoriteButton from "@/app/components/FavoriteButton";
// import ExploreButton from "@/app/components/exploreButton/page";

// interface PaketTour {
//   id: number;
//   title: string;
//   slug: string;
//   description?: string;
//   price: string | number;
//   duration_days?: number;
//   duration_nights?: number;
//   image: string;
//   created_at: string;
//   feature_duration_days?: number;
// }

// interface PaketCardProps {
//   paket: PaketTour;
// }


// export default function PaketCard({ paket }: PaketCardProps) {
//   return (
//     <div
//       className={`flex flex-col md:flex-row p-2 bg-white border border-cyan-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ${hkGrotesk.className}`}
//     >
//       {/* Gambar */}
//       <div className="relative w-full md:w-1/2 h-56 flex-shrink-0">
//         <Image
//           src={`http://127.0.0.1:8000/storage/${paket.image}`}
//           alt={paket.title}
//           fill
//           className="object-cover rounded-sm"
//         />

//         {/* Icon Favorite */}
//         <div className="absolute top-2 right-2">
//           <FavoriteButton />
//         </div>
//       </div>

//       {/* Konten */}
//       <div className="flex flex-col justify-between p-4 w-full md:w-1/2">
//         {/* Durasi */}
//         <div className="flex items-center -mt-1 mb-2">
//           <div className="flex items-center text-md bg-teal-50 border border-teal-700 text-teal-700 px-3 py-1 rounded-md font-medium">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 mr-1"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             {paket.duration_days ?? 1} day
//           </div>
//         </div>

//         {/* Judul */}
//         <h3 className="text-lg font-semibold text-gray-900 leading-snug mb-4 line-clamp-2 drop-shadow-xs">
//           {paket.title}
//         </h3>

//         {/* Harga + Tombol */}
//         <div className="flex items-center justify-between">
//           <p className="font-bold text-gray-900 text-lg drop-shadow-xs">
//             Rp{Number(paket.price).toLocaleString("id-ID")}
//           </p>
//           <ExploreButton href={`/packages/${paket.slug}`} />
//         </div>

//       </div>
//     </div>
//   );
// }
