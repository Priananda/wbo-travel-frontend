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
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex flex-col items-center justify-center mb-6 md:flex-row">
          {/* Garis gradient */}
          <div className="w-20 h-1 bg-cyan-700 rounded-full mb-3 md:mb-0 md:mr-4"></div>

          {/* Judul */}
          <h2
            className={`text-3xl md:text-4xl text-black drop-shadow-sm font-semibold text-center md:text-left ${hkGrotesk.className}`}
          >
            Mengapa Memilih Kami?
          </h2>
        </div>

        <p className="mb-12 text-lg text-gray-800">
          Ada banyak alasan menggunakan Wisata Bali Oke sebagai pilihan layanan tour di Bali
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
  {items.map((item, index) => (
    <div
      key={index}
      className="relative rounded-lg p-[2px] bg-cyan-600"
      data-aos="fade-up"
      data-aos-delay={index * 200} // setiap card muncul selang 200ms
    >
      <div className="bg-white rounded-md p-9 text-center h-full hover:bg-gray-50">
        <div className="flex justify-center mb-5">
          <Image
            src={item.icon}
            alt={item.title}
            width={65}
            height={65}
            className="object-contain"
          />
        </div>
        <h3 className="mb-3 text-xl font-semibold text-cyan-700">
          {item.title}
        </h3>
        <p className="text-md text-gray-800 leading-relaxed">
          {item.desc}
        </p>
      </div>
    </div>
  ))}
</div>

      </div>
    </section>
  );
}
