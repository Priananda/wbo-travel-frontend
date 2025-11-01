"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LaBelleAurore } from "@/app/fonts/fonts";

import bg1 from "@/app/assets/images/bg-1.jpeg";
import bg2 from "@/app/assets/images/bg-2.jpeg";
import bg3 from "@/app/assets/images/bg-3.jpeg";
import bg4 from "@/app/assets/images/bg-4.jpeg";
import bg5 from "@/app/assets/images/bg-5.jpeg";
import bg6 from "@/app/assets/images/bg-6.jpeg";
import bg7 from "@/app/assets/images/bg-7.jpeg";
import bg8 from "@/app/assets/images/bg-8.jpeg";
import bg9 from "@/app/assets/images/bg-9.jpeg";
import bg10 from "@/app/assets/images/bg-10.jpeg";
import bg11 from "@/app/assets/images/bg-11.jpeg";
import bg12 from "@/app/assets/images/bg-12.jpeg";
import bg13 from "@/app/assets/images/bg-13.jpeg";
import bg14 from "@/app/assets/images/bg-14.jpeg";
import bg15 from "@/app/assets/images/bg-15.jpeg";
import bg16 from "@/app/assets/images/bg-16.jpeg";
import bg17 from "@/app/assets/images/bg-17.jpeg";

export const galleryItems = [
  { id: 1, image: bg1, title: "Kintamani", description: "Keindahan alam Bali yang mempesona." },
  { id: 2, image: bg2, title: "Uluwatu", description: "Panorama laut biru yang memikat hati." },
  { id: 3, image: bg3, title: "Uluwatu 2", description: "Tempat wisata dengan nuansa budaya khas Bali." },
  { id: 4, image: bg4, title: "Penglipuran", description: "Pura di tepi pantai dengan pemandangan sunset." },
  { id: 5, image: bg5, title: "Tirta Empul", description: "Air terjun tersembunyi dengan suasana tenang." },
  { id: 6, image: bg6, title: "Bloom Garden", description: "Hamparan sawah hijau menyejukkan mata." },
  { id: 7, image: bg7, title: "Pantai Pandawa", description: "Pantai pasir putih yang memesona." },
  { id: 8, image: bg8, title: "Water Sport", description: "Keindahan alam tropis yang memanjakan jiwa." },
  { id: 9, image: bg9, title: "Pantai Pandawa 2", description: "Suasana pedesaan dengan udara segar." },
  { id: 10, image: bg10, title: "Pantai Melasti", description: "Spot foto ikonik dengan panorama alam." },
  { id: 11, image: bg11, title: "Melasti Beach", description: "Pantai dengan tebing menakjubkan." },
  { id: 12, image: bg12, title: "Tanah Barak Beach", description: "Tempat wisata romantis di Bali." },
  { id: 13, image: bg13, title: "Tari Kecak", description: "Keindahan alam tersembunyi di pulau dewata." },
  { id: 14, image: bg14, title: "Tegenungan", description: "Panorama pegunungan dan hutan tropis." },
  { id: 15, image: bg15, title: "Taman Dedari", description: "Tempat meditasi dengan pemandangan indah." },
  { id: 16, image: bg16, title: "Sari Timbul", description: "Kawasan wisata yang eksotis dan alami." },
  { id: 17, image: bg17, title: "Bali farm Puse", description: "Pemandangan laut dan langit yang menakjubkan." },
];



export default function GalleryCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [animate, setAnimate] = useState(false);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(galleryItems.length / itemsPerSlide);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerAnimation = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 700);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % totalSlides);
    triggerAnimation();
    setIsPaused(true);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
    triggerAnimation();
    setIsPaused(true);
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % totalSlides);
        triggerAnimation();
      }, 4000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, totalSlides]);

  return (
    <div
      className="relative w-full max-w-[96%] mt-10 mx-auto overflow-hidden py-6 group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <h1
        className={`text-center text-cyan-700 text-4xl mt-2 mb-4 drop-shadow-sm ${LaBelleAurore.className}`}
      >
        Views Paket Tour
      </h1>

      {/* 🔹 Carousel Container */}
      <div className="relative">
        {/* 🔹 Wrapper Slide */}
        <div
          className={`flex transition-transform duration-700 ease-in-out`}
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="flex min-w-full">
              {galleryItems
                .slice(slideIndex * itemsPerSlide, slideIndex * itemsPerSlide + itemsPerSlide)
                .map((item) => (
                  <div
                    key={item.id}
                    className={`w-1/3 px-2 transition-transform duration-700 ${
                      animate ? "scale-95 animate-zoomIn" : "scale-100"
                    }`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute bottom-0 w-full bg-cyan-800/80 text-white text-center py-2 text-sm">
                        <p className="font-semibold">{item.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* 🔹 Tombol Navigasi — kini selalu di tengah */}
        <div className="absolute inset-y-0 left-5 flex items-center">
          <button
            onClick={prevSlide}
            className="bg-white/90 rounded-full shadow-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-5 flex items-center">
          <button
            onClick={nextSlide}
            className="bg-white/90 rounded-full shadow-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>
    </div>
  );
}
