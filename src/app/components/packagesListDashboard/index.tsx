"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PaketCard from "@/app/components/packagesCardDashboard";
import { hkGrotesk } from "@/app/fonts/fonts";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import ExploreMoreButton from "@/app/components/exploreMoreButton/page";

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

export default function PackageList() {
  const [packages, setPackages] = useState<PaketTour[]>([]);

  const fetchPackages = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/paket-tours", {
        params: {
          per_page: 4,
          page: 1,
        },
      });
      setPackages(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPackages();

    // Init AOS
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="max-w-6xl mx-auto py-10 space-y-4">
      {/* Judul */}
      <div className="flex flex-col items-center justify-center mb-6 md:flex-row">
        <div className="w-20 h-1 bg-cyan-700 rounded-full mb-3 md:mb-0 md:mr-4"></div>
        <h2
          className={`text-3xl md:text-4xl text-black drop-shadow-sm font-semibold text-center md:text-left ${hkGrotesk.className}`}
        >
          Paket Wisata Unggulan
        </h2>
      </div>

      <p
        className="mb-12 text-center text-lg text-gray-800"
      >
        Nikmati perjalanan tak terlupakan dengan destinasi terbaik, layanan nyaman, dan pengalaman seru bersama kami.
      </p>

      {/* Grid 2 kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg, index) => (
          <div
            key={pkg.id}
            data-aos="zoom-in"
            data-aos-delay={index * 200} // card muncul satu per satu
          >
            <PaketCard paket={pkg} />
          </div>
        ))}
      </div>

      {/* Tombol Explore More */}
      {/* <div className="mt-16 mb-10 text-center">
        <Link
          href="https://balisundaram.com/product-category/bali-tour-packages/"
          target="_blank"
          rel="noopener noreferrer"
          className={`px-6 py-3 text-lg bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-lg hover:from-teal-800 hover:to-cyan-600 transition duration-300 transform hover:scale-110 font-semibold ${hkGrotesk.className}`}
        >
          Explore More
        </Link>
      </div> */}
      <div className="mt-16 mb-10 text-center">
        <ExploreMoreButton
        href="https://balisundaram.com/product-category/bali-tour-packages/"
        label="Explore More"
        className="text-lg px-8 py-3"
      />
</div>

    </section>
  );
}




