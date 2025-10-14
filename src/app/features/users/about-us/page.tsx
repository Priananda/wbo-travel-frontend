"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Image from "next/image";
import { hkGrotesk } from "@/app/fonts/fonts";
import Navbar from "@/app/components/navbar";

export default function AboutSection() {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const controlsLeft = useAnimation();
  const controlsRight = useAnimation();

  // animasi teks & angka
  useEffect(() => {
    if (inView) {
      controlsLeft.start({ opacity: 1, x: 0, transition: { duration: 0.6 } });
      controlsRight.start({ opacity: 1, x: 0, transition: { duration: 0.6 } });

      let start = 0;
      const end = 10;
      const step = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(step);
      }, 100);
    }
  }, [inView, controlsLeft, controlsRight]);

  return (
     
    <section ref={ref} className="w-full py-20 bg-white">
      <div className="absolute top-0 left-0 w-full z-50">
               <Navbar />
             </div>
     
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
        {/* Kolom Kiri */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={controlsLeft}
          className="space-y-5"
        >
          {/* Icon & Judul */}
          <div className="flex flex-col items-start gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="teal"
              className="w-14 h-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z"
              />
            </svg>
            <p className="text-teal-600 italic text-lg font-medium">
              Selamat Datang Di:
            </p>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            PT Bali Sundaram Travel
          </h2>

          <p className="text-gray-600 leading-relaxed">
            Merupakan perusahaan pelayanan jasa tour dan travel di Bali yang
            telah berpengalaman lebih dari 10 tahun dengan layanan terbaik dari
            tim profesional PT Bali Sundaram Travel.
          </p>

          <p className="text-gray-600 leading-relaxed">
            PT Bali Sundaram Travel merupakan perusahaan resmi yang berlokasi di
            Bali tepatnya JL. Pudak No 3A Batubulan, Kec. Sukawati, Kab. Gianyar,
            Bali 80582.
          </p>

          <button className="bg-cyan-700 hover:bg-cyan-800 rounded-lg shadow-sm text-white font-semibold px-6 py-3 cursor-pointer">
            Contact Us
          </button>
        </motion.div>

        {/* Kolom Tengah - Keunggulan */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={controlsRight}
          className="flex flex-col justify-center items-center gap-10 text-start"
        >
          {/* Jaminan Liburan */}
          <div className="flex items-center max-w-xs">
            <div className="mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="teal"
                className="w-10 h-10 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6l4 2m6-4.5A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-teal-700 text-lg">
                Jaminan Liburan Menyenangkan
              </h3>
              <p className="text-gray-600 leading-snug mt-1">
                Kami yakin liburan anda di Bali akan memorable dan menyenangkan.
              </p>
            </div>
          </div>

          {/* Pilihan Destinasi */}
          <div className="flex items-center max-w-xs">
            <div className="mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="teal"
                className="w-10 h-10 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m6 2.25A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-teal-700 text-lg">
                Pilihan Destinasi Terbaik
              </h3>
              <p className="text-gray-600 leading-snug mt-1">
                Kami memilih destinasi terbaik untuk anda.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Kolom Kanan - Gambar & Kotak Hijau */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={controlsRight}
          className="relative flex justify-center"
        >
          {/* Gambar */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=800&q=80"
              alt="Bali Beach"
              width={600}
              height={400}
              className="object-cover w-full h-auto"
            />
          </div>

          {/* Kotak Hijau */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
            className="absolute -left-16 top-1/4 bg-teal-600 text-white px-8 py-6 rounded-2xl shadow-lg text-center w-44"
          >
            <div className="flex flex-col items-center">
              {/* Icon pesawat */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-10 h-10 mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 19.5v-15m0 0-3.75 3.75m3.75-3.75L15.75 8.25M19.5 12a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                />
              </svg>

              <span className="text-5xl font-bold">{count}</span>
              <p className="text-sm font-medium mt-1">Tahun Pengalaman</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
