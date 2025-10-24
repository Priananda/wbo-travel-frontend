"use client";

import type { StaticImageData } from "next/image";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
 import WhatsAppButton from "@/app/components/waButton/page";

import {
  ArrowLeft,
  ArrowRight,
  X,
  ArrowUpRight,
  Search,
  Play,
  Maximize,
  Grid,
  Pause,
} from "lucide-react";

import { hkGrotesk } from "@/app/fonts/fonts";
import Navbar from "@/app/components/navbar";
import ProtectedRoute from "@/app/middleware/ProtectedRoute";
import melastibeach from "@/app/assets/images/melastibeach.jpg";
import kelingkingbeach from "@/app/assets/images/kelingkingbeach.jpg";
import pandawabeach from "@/app/assets/images/pandawabeach.jpeg";
import tanahlot from "@/app/assets/images/tanahlot.jpg";
import ulundanutemple from "@/app/assets/images/ulundanutemple.jpg";
import uluwatutemple from "@/app/assets/images/uluwatutemple.jpg";
import brokenbeach from "@/app/assets/images/brokenbeach.jpg";

type ImgSource = StaticImageData | string;

type GalleryItem = {
  id: number;
  title: string;
  description: string;
  category: string;
  image: ImgSource;
};

const galleryData: GalleryItem[] = [
  { id: 1, title: "Kelingking Beach", description: "Travel & Food", category: "pantai", image: kelingkingbeach },
  { id: 2, title: "Melasti Beach", description: "Travel & Food", category: "pantai", image: melastibeach },
  { id: 3, title: "Pandawa Beach", description: "Travel & Food", category: "pura", image: pandawabeach },
  { id: 4, title: "Ulundanu Beratan", description: "Travel & Food", category: "pantai", image: ulundanutemple },
  { id: 5, title: "Tanah Lot", description: "Travel & Food", category: "pantai", image: tanahlot },
  { id: 6, title: "Uluwatu Temple", description: "Travel & Food", category: "pura", image: uluwatutemple },
  { id: 7, title: "Broken Beach", description: "Travel & Food", category: "pantai", image: brokenbeach },
];

const categories = ["all", "pantai", "pura"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? galleryData
        : galleryData.filter((g) => g.category === activeCategory),
    [activeCategory]
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbs, setShowThumbs] = useState(true);
  const [pulseZoom, setPulseZoom] = useState(false); // ✅ efek zoom halus tambahan

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const slideshowRef = useRef<NodeJS.Timeout | null>(null);

  // Fungsi kecil untuk aktifkan efek zoom halus (pop)
  const triggerPulseZoom = useCallback(() => {
    setPulseZoom(true);
    setTimeout(() => setPulseZoom(false), 300);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 600, easing: "ease-out", once: false });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen, currentIndex]);

  // Auto slideshow
  useEffect(() => {
    if (isPlaying) {
      slideshowRef.current = setInterval(() => {
        nextImage();
      }, 3000);
    } else if (slideshowRef.current) {
      clearInterval(slideshowRef.current);
    }
    return () => {
      if (slideshowRef.current) clearInterval(slideshowRef.current);
    };
  }, [isPlaying]);

  // Scroll active thumbnail into view
  useEffect(() => {
    const thumbs = thumbsRef.current;
    const activeThumb = thumbs?.querySelector<HTMLButtonElement>(
      `button[data-index="${currentIndex}"]`
    );
    if (activeThumb && thumbs) {
      activeThumb.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [currentIndex]);

  // Navigation
  const nextImage = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setCurrentIndex((prev) => (prev + 1) % filtered.length);
    }, 200);
  }, [filtered.length]);

  const prevImage = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    }, 200);
  }, [filtered.length]);

  // Fullscreen
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement && overlayRef.current) {
      await overlayRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  // Overlay click (close)
  const onOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) closeModal();
  };

  // Modal open/close
  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsPlaying(false);
    setIsZoomed(false);
  };

  // Klik thumbnail → ubah gambar + efek zoom halus
  const handleThumbnailClick = (idx: number) => {
    setCurrentIndex(idx);
    triggerPulseZoom();
  };

  // Klik tombol grid → toggle thumbnails + efek zoom halus
  const handleToggleThumbs = () => {
    setShowThumbs((prev) => !prev);
    triggerPulseZoom();
  };

  const thumbContainerStyle: React.CSSProperties = { scrollbarWidth: "none" };

  return (
    // <ProtectedRoute allowedRoles={["user"]}>
      <div className="relative min-h-screen bg-white">
        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full z-50">
          <Navbar />
        </div>

        <section className="px-3 md:px-3 lg:px-6 py-24 text-center max-w-7xl mx-auto">
          {/* Title */}
          <div className="mt-24 flex flex-col items-center justify-center mb-6 md:flex-row">
            <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full mb-3 md:mb-0 md:mr-4" />
            <h2
              className={`text-3xl md:text-4xl text-slate-900 drop-shadow-sm font-semibold ${hkGrotesk.className}`}
            >
              Take A Look Our Gallery
            </h2>
          </div>
          <p className={`mb-10 text-lg text-gray-800 font-medium ${hkGrotesk.className}`}>
            Ada banyak alasan menggunakan Wisata Bali Oke sebagai pilihan layanan tour di Bali
          </p>

          {/* Filter */}
          <div className="flex justify-center gap-5 mt-14">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-lg shadow-sm border transition-all cursor-pointer font-semibold ${hkGrotesk.className}
                  ${
                    activeCategory === cat
                      ? "bg-cyan-700 hover:bg-cyan-800 text-white"
                      : "bg-white text-gray-700 border-teal-700 hover:bg-teal-50"
                  }`}
              >
                {cat === "all" ? "Show All" : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-14 gap-x-7 mt-10">
            {filtered.map((item, i) => (
              <div key={item.id} data-aos="fade-up" data-aos-duration="600" className="cursor-pointer">
                <div className="relative group overflow-hidden rounded-lg">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={900}
                    height={600}
                    className="w-full h-72 object-cover rounded-md transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"
                    onClick={() => openModal(i)}
                  >
                    <div className="bg-yellow-500 p-3 rounded-full transform transition-all duration-350 ease-out group-hover:scale-110 group-hover:shadow-lg">
                      <ArrowUpRight className="text-white w-6 h-6" />
                    </div>
                  </div>
                </div>
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
            {/* Counter */}
            <div className="absolute top-6 left-6 text-white text-sm opacity-90 font-medium select-none">
              {currentIndex + 1} / {filtered.length}
            </div>

            {/* Action Icons */}
            <div className="absolute top-6 right-24 hidden md:flex items-center gap-3 z-60 text-white opacity-90">
              {/* Zoom */}
              <button
                onClick={() => setIsZoomed((prev) => !prev)}
                className="p-2 rounded-md bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                <Search />
              </button>

              {/* Slideshow */}
              <button
                onClick={() => setIsPlaying((prev) => !prev)}
                className="p-2 rounded-md bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                {isPlaying ? <Pause /> : <Play />}
              </button>

              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-md bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                <Maximize />
              </button>

              {/* Toggle Thumbs */}
              <button
                onClick={handleToggleThumbs}
                className="p-2 rounded-md bg-white/5 hover:bg-white/10 cursor-pointer"
              >
                <Grid />
              </button>
            </div>

            {/* Close */}
            <button
              onClick={closeModal}
              className="absolute top-5 md:top-6 lg:top-6  right-6 z-60 p-2 rounded-full border border-white/30 bg-white/5 hover:bg-white/10 cursor-pointer"
            >
              <X className="text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute hidden md:flex left-6 top-1/2 transform -translate-y-1/2 text-white z-60 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={nextImage}
              className="absolute hidden md:flex right-28 top-1/2 transform -translate-y-1/2 text-white z-60 p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer"
            >
              <ArrowRight />
            </button>

            {/* Main Image */}
<div className="mx-auto mt-24 md:mt-20 lg:mt-20 max-w-4xl w-full flex flex-col items-center px-6 text-center">
  {/* Gambar Utama */}
  <div className="relative flex justify-center">
    <div
      className={`overflow-hidden transform transition-all duration-300 ${
        isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      <Image
        src={filtered[currentIndex].image}
        alt={filtered[currentIndex].title}
        width={550}
        height={700}
        className={`object-cover rounded-md transition-transform duration-300 ${
          isZoomed ? "scale-125 cursor-zoom-out" : "scale-100 cursor-zoom-in"
        } ${pulseZoom ? "scale-110" : ""}`}
        onClick={() => setIsZoomed((prev) => !prev)}
      />
    </div>
  </div>

  {/* Thumbnails */}
  {showThumbs && (
    <div className="mt-4 w-full flex justify-center">
      <div
        ref={thumbsRef}
        className="flex items-center justify-center gap-4 overflow-x-auto py-3 px-2 rounded-md"
        style={thumbContainerStyle}
      >
        {filtered.map((t, idx) => (
          <button
            key={t.id}
            data-index={idx}
            onClick={() => handleThumbnailClick(idx)}
            className={`flex-none rounded-md p-0.5 transition-all ${
              idx === currentIndex
                ? "ring-2 ring-teal-600"
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <div className="w-28 h-20 relative rounded-md overflow-hidden bg-gray-800">
              <Image src={t.image} alt={t.title} fill style={{ objectFit: "cover" }} />
            </div>
          </button>
        ))}
      </div>
    </div>
  )}
</div>

          </div>
        )}
         <WhatsAppButton />
      </div>
    // </ProtectedRoute>
  );
}







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