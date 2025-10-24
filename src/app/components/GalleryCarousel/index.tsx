"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import tanahLot from "@/app/assets/images/tanahlot.jpg";
import brokenBeach from "@/app/assets/images/brokenbeach.jpg";
import { LaBelleAurore } from "@/app/fonts/fonts";

const galleryItems = [
  { id: 1, image: tanahLot, title: "Tanah Lot", description: "Pemandangan laut dan pura ikonik di Bali." },
  { id: 2, image: brokenBeach, title: "Broken Beach", description: "Pantai legendaris dengan tebing alami memukau." },
  { id: 3, image: tanahLot, title: "Tanah Lot", description: "Pura di atas batu karang dengan pemandangan sunset." },
  { id: 4, image: brokenBeach, title: "Broken Beach", description: "Pantai eksotis dengan formasi batu unik." },
  { id: 5, image: tanahLot, title: "Tanah Lot", description: "Destinasi favorit wisatawan di Bali." },
  { id: 6, image: brokenBeach, title: "Broken Beach", description: "Panorama laut biru yang memukau." },
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
