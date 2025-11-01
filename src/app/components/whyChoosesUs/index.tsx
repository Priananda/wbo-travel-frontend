"use client";

import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { hkGrotesk } from "@/app/fonts/fonts";
import DestinasiIcon from "@/app/assets/images/destinasi-populer.png";
import HargaIcon from "@/app/assets/images/jaminan-harga-terbaik.png";
import StaffIcon from "@/app/assets/images/staf-guide-berpengalaman.png";

export default function WhyChooseUs() {
  const items = [
    {
      icon: DestinasiIcon,
      title: "Destinasi Populer",
      desc: "Kami memilih Destinasi Populer untuk menambah pengalaman terbaik liburan Anda",
    },
    {
      icon: HargaIcon,
      title: "Jaminan Harga Terbaik",
      desc: "Kami menjamin harga terbaik untuk paket liburan yang Anda pilih",
    },
    {
      icon: StaffIcon,
      title: "Staff & Guide Berpengalaman",
      desc: "Guide dan staff kami telah berpengalaman di industri pariwisata di Bali",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800, 
      easing: "ease-in-out", 
      once: true, 
    });
  }, []);

  return (
   <section className="bg-white py-20 px-4 relative -mt-10">
  <div className="max-w-6xl mx-auto text-center">
    {/* Judul Section */}
 <div className="flex flex-col items-center justify-center mt-6 mb-6 md:flex-row">
        <div className="w-20 h-1 bg-cyan-700 rounded-full md:mt-0 -mt-7 mb-7 md:mb-0 md:mr-4"></div>
        <h2
          className={`text-3xl md:text-4xl text-black drop-shadow-sm font-semibold text-center md:text-left ${hkGrotesk.className}`}
        >
          Mengapa Memilih Kami?
        </h2>
      </div>

      <p
        className="mb-12 text-center text-lg text-gray-800"
      >
        Ada banyak alasan menggunakan Wisata Bali Oke sebagai pilihan layanan tour di Bali
      </p>


    {/* Card Container */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {items.map((item, index) => (
        <div
          key={index}
          className="group bg-white rounded-2xl border border-cyan-700 p-10 shadow-[0_8px_24px_rgba(0,0,0,0.05)] 
                     hover:shadow-[0_12px_32px_rgba(0,128,128,0.25)] 
                     hover:border-cyan-600 
                     transform transition-transform duration-500 ease-out"
          data-aos="fade-up"
          data-aos-delay={index * 200}
        >
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 rounded-full bg-cyan-100 group-hover:bg-cyan-100 flex items-center justify-center transition-colors duration-500 shadow-md">
              <Image
                src={item.icon}
                alt={item.title}
                width={55}
                height={55}
                className="object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-cyan-700 transition-colors duration-300">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-gray-800 leading-relaxed">
            {item.desc}
          </p>

          {/* Accent Line */}
          <div className="mt-6 w-16 h-[3px] bg-cyan-700 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      ))}
    </div>
  </div>

  {/* Decorative Blur Circle */}
  <div className="absolute bottom-0 -left-20 w-44 h-44 bg-cyan-200/80 rounded-full blur-3xl"></div>
</section>


  );
}
