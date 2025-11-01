"use client";

import { motion } from "framer-motion";
import { LaBelleAurore, hkGrotesk } from "@/app/fonts/fonts";
import bgOne from "@/app/assets/images/bg-one.jpeg";
import Link from "next/link";

export default function AboutUs() {
  return (
    <motion.div
      className="m-1 md:m-3 lg:m-8 overflow-hidden rounded-t-xl relative mb-5 md:mb-5 lg:mb-5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Wrapper luar untuk potong radius */}
      <div
        className="relative bg-fixed bg-cover bg-center py-10 px-2 md:px-0  lg:px-6"
        style={{
          backgroundImage: `url(${bgOne.src})`,
        }}
      >
        {/* Overlay agar konten tetap terbaca */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Konten utama */}
        <div className="relative container mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            className="bg-black/60 rounded-xl shadow-lg p-6 md:p-8 text-white backdrop-blur-sm"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <p
              className={`text-yellow-400 text-4xl mb-2 drop-shadow-sm ${LaBelleAurore.className}`}
            >
              About Us
            </p>

            <motion.h2
              className={`text-4xl text-white font-bold leading-tight mb-6 drop-shadow-md ${hkGrotesk.className}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Temukan Surga Tersembunyi <br /> dan Keindahan Budaya Pulau Bali
            </motion.h2>

            <motion.p
              className="mb-4 text-md leading-relaxed text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              Jelajahi keindahan Pulau Bali bersama kami melalui berbagai paket
              tour eksklusif yang dirancang untuk memberikan pengalaman terbaik.
              Dari pesona sawah hijau di Ubud, pantai berpasir putih di Nusa Dua,
              hingga keagungan pura di Tanah Lot, setiap perjalanan menghadirkan
              keajaiban alam dan budaya yang memikat hati.
            </motion.p>

            <motion.p
              className="text-md leading-relaxed text-white mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              Dengan layanan profesional dan fasilitas lengkap, kami memastikan
              kenyamanan serta kepuasan Anda selama berlibur di Pulau Dewata.
              Nikmati momen tak terlupakan bersama keluarga, pasangan, atau
              sahabat — rasakan hangatnya keramahan Bali dalam setiap langkah
              perjalanan Anda.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <Link
                href="/packages"
                className={
                  "px-6 py-3 text-lg font-semibold rounded-lg text-white transition duration-300 transform hover:scale-110 shadow-md " +
                  "bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-800 hover:to-cyan-600"
                }
              >
                Explore
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT — VIDEO GRID */}
          <motion.div
            className="grid grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            <motion.div
              className="relative w-full h-80 md:h-[420px] rounded-xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <video
                src="/videos/testing2.mp4"
                className="object-cover w-full h-full"
                autoPlay
                muted
                loop
                playsInline
              />
            </motion.div>

            <motion.div
              className="relative w-full h-80 md:h-[420px] rounded-xl shadow-lg overflow-hidden mt-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <video
                src="/videos/testing.mp4"
                className="object-cover w-full h-full"
                autoPlay
                muted
                loop
                playsInline
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
