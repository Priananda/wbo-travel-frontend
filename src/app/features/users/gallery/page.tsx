"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

import { hkGrotesk } from "@/app/fonts/fonts";
import Navbar from "@/app/components/navbar/index";
import ProtectedRoute from "@/app/middleware/ProtectedRoute";
import testing from "@/app/assets/images/testing.jpg";
import { ArrowLeft, ArrowRight, X, ArrowUpRight, Search, Play, Maximize, Grid } from "lucide-react";

type ImgSource = StaticImageData | string;

type GalleryItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: ImgSource;
};

const galleryData: GalleryItem[] = [
  { id: 1, title: "Kelingking Beach", description: "Travel & Food", category: "pantai", image: testing },
  { id: 2, title: "Melasti Beach", description: "Travel & Food", category: "pantai", image: testing },
  { id: 3, title: "Pandawa Beach", description: "Travel & Food", category: "pura", image: testing },
  { id: 4, title: "Ulundanu Beratan", description: "Travel & Food", category: "pantai", image: testing },
  { id: 5, title: "Tanah Lot", description: "Travel & Food", category: "pantai", image: testing },
  { id: 6, title: "Uluwatu Temple", description: "Travel & Food", category: "pura", image: testing },
];

const categories = ["all", "pantai", "pura"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const filtered = useMemo(
    () => (activeCategory === "all" ? galleryData : galleryData.filter((g) => g.category === activeCategory)),
    [activeCategory]
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currency, setCurrency] = useState<"IDR" | "USD">("IDR");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    AOS.init({ duration: 600, easing: "ease-out", once: false });
  }, []);

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalOpen, currentIndex, filtered]);

  // scroll active thumb into view
  useEffect(() => {
    const thumbs = thumbsRef.current;
    const activeThumb = thumbs?.querySelector<HTMLButtonElement>(`button[data-index="${currentIndex}"]`);
    if (activeThumb && thumbs) {
      const rect = activeThumb.getBoundingClientRect();
      const parentRect = thumbs.getBoundingClientRect();
      if (rect.left < parentRect.left || rect.right > parentRect.right) {
        activeThumb.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  }, [currentIndex, isModalOpen]);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 260);
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
  };

  const prevImage = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 260);
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) closeModal();
  };

  // typed style for scrollbar hide (avoids `any`)
  const thumbContainerStyle: React.CSSProperties = { scrollbarWidth: "none" };

  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <div className="relative min-h-screen bg-white">
        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <section className="px-6 py-24 text-center max-w-7xl mx-auto">
          <div className="mt-24 flex flex-col items-center justify-center mb-6 md:flex-row">
            <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full mb-3 md:mb-0 md:mr-4"></div>
            <h2 className={`text-3xl md:text-4xl text-slate-900 drop-shadow-sm font-semibold ${hkGrotesk.className}`}>
              Take A Look Our Gallery
            </h2>
          </div>
          <p className={`mb-10 text-lg text-gray-800 font-medium ${hkGrotesk.className}`}>
            Ada banyak alasan menggunakan Wisata Bali Oke sebagai pilihan layanan tour di Bali
          </p>

          {/* Category filter */}
          <div className="flex justify-center gap-5 mt-14">
            {categories.map((cat) => (
                 <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-6 py-2 rounded-lg border transition-all cursor-pointer font-semibold ${hkGrotesk.className}
                  ${
                    activeCategory === cat
                      ? "bg-cyan-700 hover:bg-cyan-800 text-white"
                      : "bg-white text-gray-700 border-teal-700 hover:bg-teal-50"
                  }
                `}
              >
                {cat === "all" ? "Show All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-7 mt-10">
  {filtered.map((item, i) => (
    <div key={item.id} data-aos="fade-up" data-aos-duration="600" className="cursor-pointer">
      
      {/* Gambar + Overlay */}
      <div className="relative group overflow-hidden rounded-lg">
        <Image
          src={item.image}
          alt={item.title}
          width={900}
          height={600}
          className="w-full h-72 object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay hanya di gambar */}
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"
          onClick={() => openModal(i)}
        >
          <div className="bg-yellow-500 p-3 rounded-full transform transition-all duration-350 ease-out group-hover:scale-110 group-hover:shadow-lg">
            <ArrowUpRight className="text-white w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Title + Description tetap terpisah */}
      <div className={`mt-10 space-y-3 text-left ${hkGrotesk.className}`}>
        <h3 className="text-2xl font-semibold text-black">{item.title}</h3>
        <p className="text-md text-gray-800 font-medium">{item.description}</p>
      </div>

    </div>
  ))}
</div>

        </section>

        {/* Modal / Lightbox */}
        {isModalOpen && (
          <div
            ref={overlayRef}
            onMouseDown={onOverlayClick}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/80"
            aria-modal="true"
            role="dialog"
          >
            {/* Counter top-left */}
            <div className="absolute top-6 left-6 text-white text-sm opacity-90 font-medium select-none">
              {currentIndex + 1} / {filtered.length}
            </div>

            {/* Top-right small dummy icons */}
            <div className="absolute top-6 right-24 hidden md:flex items-center gap-3 z-60 text-white opacity-90">
              <button className="p-2 rounded-md bg-white/5 hover:bg-white/10 cursor-pointer">
                <Search />
              </button>
              <button className="p-2 rounded-md bg-white/5 hover:bg-white/10 cursor-pointer">
                <Play />
              </button>
              <button className="p-2 rounded-md bg-white/5 hover:bg-white/10 cursor-pointer">
                <Maximize />
              </button>
              <button className="p-2 rounded-md bg-white/5 hover:bg-white/10 cursor-pointer">
                <Grid />
              </button>
            </div>

            {/* Close top-right */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-60 p-2 rounded-full border border-white/30 bg-white/5 hover:bg-white/10 cursor-pointer"
              aria-label="Close gallery"
            >
              <X className="text-white" />
            </button>

            {/* Currency toggle right middle (vertical pills) */}
            {/* <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-2 z-60">
              <button
                onClick={() => setCurrency("IDR")}
                className={`px-4 py-2 rounded-l-md rounded-r-md font-semibold text-sm transition ${
                  currency === "IDR" ? "bg-rose-500 text-white" : "bg-white/5 text-white"
                }`}
              >
                IDR
              </button>
              <button
                onClick={() => setCurrency("USD")}
                className={`px-4 py-2 rounded-l-md rounded-r-md font-semibold text-sm transition ${
                  currency === "USD" ? "bg-rose-500 text-white" : "bg-white/5 text-white"
                }`}
              >
                USD
              </button>
            </div> */}

            {/* Left navigation (outside image) */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white z-60 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer"
              aria-label="Previous image"
            >
              <ArrowLeft />
            </button>

            {/* Right navigation (outside image) */}
            <button
              onClick={nextImage}
              className="absolute right-28 top-1/2 transform -translate-y-1/2 text-white z-60 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer"
              aria-label="Next image"
            >
              <ArrowRight />
            </button>

            {/* Main content area (image + overlay caption + thumbnails) */}
            <div className="mx-auto mt-24 max-w-4xl w-full px-6 text-center">
              {/* Main image with fade animation */}
              <div className="relative">
                <div
                  className={`mx-auto  overflow-hidden transform transition-all duration-300 ${
                    isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  <Image
                    src={filtered[currentIndex].image}
                    alt={filtered[currentIndex].title}
                    width={1100}
                    height={700}
                    className="mx-auto w-[600px] h-[350px] object-cover rounded-md"
                  />
                </div>

                {/* Overlay caption inside image (bottom center) */}
                {/* <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 px-6 py-3 bg-black/40 backdrop-blur-sm rounded-md">
                  <h3 className="text-lg md:text-xl text-white font-semibold">{filtered[currentIndex].title}</h3>
                  <p className="text-sm text-gray-200 mt-1">
                    {filtered[currentIndex].description} • {currency}
                  </p>
                </div> */}
              </div>

              {/* Thumbnail strip */}
              <div className="mt-6 ">
                <div
                  ref={thumbsRef}
                  className="flex items-center gap-4 overflow-x-auto py-3 px-2 rounded-md"
                  style={thumbContainerStyle}
                >
                  {filtered.map((t, idx) => (
                    <button
                      key={t.id}
                      data-index={idx}
                      onClick={() => {
                        setCurrentIndex(idx);
                      }}
                      className={`flex-none mx-auto rounded-md p-0.5 transition-all ${
                        idx === currentIndex
                          ? "ring-2 ring-teal-600"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`Go to ${t.title} thumbnail`}
                    >
                      <div className="w-28 h-20 relative rounded-md overflow-hidden bg-gray-800">
                        <Image src={t.image} alt={t.title} fill style={{ objectFit: "cover" }} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}






// "use client";

// import { hkGrotesk } from "@/app/fonts/fonts";
// import { useState, useEffect } from "react";
// import { ArrowUpRight } from "lucide-react";
// import Image from "next/image";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Navbar from "@/app/components/navbar/index";
// import testing from "@/app/assets/images/testing.jpg";
// import ProtectedRoute from "@/app/middleware/ProtectedRoute";

// const galleryData = [
//   {
//     id: 1,
//     title: "Keligking Beach",
//     description: "Travel & Food",
//     category: "pantai",
//     image: testing,
//   },
//   {
//     id: 2,
//     title: "Melasti Beach",
//     description: "Travel & Food",
//     category: "pantai",
//     image: testing,
//   },
//   {
//     id: 3,
//     title: "Pandawa Beach",
//     description: "Travel & Food",
//     category: "pura",
//     image: testing,
//   },
//   {
//     id: 4,
//     title: "Ulundanu Beratan",
//     description: "Travel & Food",
//     category: "pantai",
//     image: testing,
//   },
//   {
//     id: 5,
//     title: "Tanah Lot",
//     description: "Travel & Food",
//     category: "pantai",
//     image: testing,
//   },
//   {
//     id: 6,
//     title: "Uluwatu Temple",
//     description: "Travel & Food",
//     category: "pura",
//     image: testing,
//   },
// ];

// const categories = ["all", "pantai", "pura"];

// export default function GalleryPage() {
//   const [activeCategory, setActiveCategory] = useState("all");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     AOS.init({ duration: 600, easing: "ease-out", once: false });
//   }, []);

//   const filteredData =
//     activeCategory === "all"
//       ? galleryData
//       : galleryData.filter((item) => item.category === activeCategory);

//   // Modal Function
//   const openModal = (index: number) => {
//     setCurrentIndex(index);
//     setIsModalOpen(true);
//   };

//   const nextImage = () => {
//     setCurrentIndex((prev) => (prev + 1) % filteredData.length);
//   };

//   const prevImage = () => {
//     setCurrentIndex((prev) => (prev - 1 + filteredData.length) % filteredData.length);
//   };

//   return (
//     <ProtectedRoute allowedRoles={["user"]}>
//       <div className="absolute top-0 left-0 w-full z-50">
//         <Navbar />
//       </div>

//       <section className="px-6 py-16 text-center">
//         <div className="max-w-7xl p-2 mx-auto text-center">

//           {/* Header */}
//           <div className="mt-28 flex flex-col items-center justify-center mb-6 md:flex-row">
//             <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full mb-3 md:mb-0 md:mr-4"></div>
//             <h2 className={`text-3xl md:text-4xl text-black drop-shadow-sm font-semibold text-center md:text-left ${hkGrotesk.className}`}>
//               Take A Look Our Gallery
//             </h2>
//           </div>
//           <p className="mb-12 text-lg text-gray-800">
//             Ada banyak alasan menggunakan Wisata Bali Oke sebagai pilihan layanan tour di Bali
//           </p>

//           {/* Filter Buttons */}
//           <div className="flex justify-center gap-5 mt-10 text-md">
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className={`
//                   px-6 py-2 rounded-lg border transition-all cursor-pointer font-semibold ${hkGrotesk.className}
//                   ${
//                     activeCategory === cat
//                       ? "bg-cyan-700 hover:bg-cyan-800 text-white"
//                       : "bg-white text-gray-700 border-teal-700 hover:bg-teal-50"
//                   }
//                 `}
//               >
//                 {cat === "all" ? "Show All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
//               </button>
//             ))}
//           </div>

//           {/* Gallery Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-y-14 gap-x-7  mt-10">
//             {filteredData.map((item, index) => (
//               <div key={item.id} className="relative group overflow-hidden cursor-pointer" data-aos="fade-up">

//                 {/* Gambar + Hover Icon */}
//                 <div className="relative">
//                   <Image
//                     src={item.image}
//                     alt={item.title}
//                     width={500}
//                     height={300}
//                     className="w-full h-72 object-cover rounded-md"
//                     unoptimized={false}
//                   />

//                   <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                     <div
//                       className="bg-yellow-500 p-3 rounded-full transform transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-2"
//                       onClick={() => openModal(index)}
//                     >
//                       <ArrowUpRight className="text-white" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Title & Description */}
//                 <div className={`mt-8 space-y-2 text-left ${hkGrotesk.className}`}>
//                   <h3 className="text-2xl font-semibold">{item.title}</h3>
//                   <p className="text-md text-gray-800 font-medium">{item.description}</p>
//                 </div>

//               </div>
//             ))}
//           </div>

//         </div>
//       </section>

//       {/* Modal Lightbox */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//           <button className="absolute top-5 right-5 text-white text-3xl" onClick={() => setIsModalOpen(false)}>×</button>
//           <button className="absolute left-5 text-white text-3xl" onClick={prevImage}>‹</button>

//           <div className="text-center">
//             <Image
//               src={filteredData[currentIndex].image}
//               alt={filteredData[currentIndex].title}
//               width={800}
//               height={500}
//               className="rounded-lg"
//             />
//             <h3 className="text-white text-2xl mt-4">{filteredData[currentIndex].title}</h3>
//             <p className="text-gray-300">{filteredData[currentIndex].description}</p>
//           </div>

//           <button className="absolute right-5 text-white text-3xl" onClick={nextImage}>›</button>
//         </div>
//       )}

//     </ProtectedRoute>
//   );
// }
