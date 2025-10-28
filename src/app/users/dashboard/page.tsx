"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import WhatsAppButton from "@/app/components/waButton/page";
import Footer from "@/app/components/footer/index";
import ExploreDestinationsButton from "@/app/components/exploreDestinationsButton/page";

// import Image from "next/image";
import dynamic from "next/dynamic";
// const PackageList = dynamic(() => import("@/app/users/packages/page"), { ssr: false });

const WhyChooseUs = dynamic(() => import("@/app/components/whyChoosesUs/index"), { ssr: true });
const PackageList = dynamic(() => import("@/app/components/packagesListDashboard"), { ssr: false });

import "@/app/styles/marquee.css"; 
// import { useAuth } from "@/app/services/Auth";
// import ProtectedRoute from "@/app/middleware/ProtectedRoute";
import Navbar from "@/app/components/navbar/index";
import { hkGrotesk } from "@/app/fonts/fonts"
import { LaBelleAurore } from "@/app/fonts/fonts"

export default function UserDashboard() {
  // const { user, logout } = useAuth();
  useEffect(() => {
  AOS.init({
    duration: 800, // durasi animasi
    easing: "ease-in-out", // gaya animasi
    once: true, // hanya animasi sekali
  });
}, []);



  return (
    <>

      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <section className="relative min-h-screen flex flex-col items-center justify-center text-white overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/testing.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative text-center z-10">
           <p className={`mt-40 mb-6 text-4xl text-yellow-500 tracking-wider ${LaBelleAurore.className}`}>Welcome to</p>

          <h1 data-aos="fade-down" className={`mb-6 text-5xl md:text-7xl lg:text-7xl text-white tracking-wide font-semibold ${hkGrotesk.className}`}>
            WISATA BALI OKE
          </h1>
          <p data-aos="zoom-in" className={`mb-10 text-lg text-medium ${hkGrotesk.className}`}>
            Powered by PT Bali Sundaram Travel
          </p>

          {/* <Link
           href="/packages"
          className={`px-6 py-3 text-lg bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-lg hover:from-teal-800 hover:to-cyan-600 transition duration-300 transform hover:scale-110 font-semibold ${hkGrotesk.className}`}>
          Explore Destinations
          </Link> */}

          <ExploreDestinationsButton
            href="/packages"
            label="Explore Destinations"
            className={hkGrotesk.className}
          />
          
          
        </div>
          <div className="mt-16 overflow-hidden relative w-full max-w-7xl">
            <div className="animate-marquee whitespace-nowrap flex space-x-10">
              {["Explore Bali","Enjoy Nature", "Discover Culture", "Relax by the Beach", "Create Memories", "Adventure awaits", "Experience the taste of Bali",].map(
                (text, i) => (
                  <span
                    key={i}
                    className={`text-md font-medium text-white tracking-wide ${hkGrotesk.className}`}
                  >
                    {text}
                  </span>
                )
              )}
            </div>
          </div>
      </section>

   
<WhyChooseUs />
<PackageList />
<WhatsAppButton />
<Footer />

    </>
  );
}



