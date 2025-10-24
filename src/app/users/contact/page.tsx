"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/app/components/navbar/index";
import { MapPin, Phone, Mail } from "lucide-react";
import { hkGrotesk, LaBelleAurore } from "@/app/fonts/fonts";
 import Link from "next/link";
 import WhatsAppButton from "@/app/components/waButton/page";
export default function ContactPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="w-full relative bg-white">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Google Maps Embed */}
      <div className="w-full h-[480px] relative z-0 mt-[135px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15778.636017028604!2d115.24225067035157!3d-8.628697343758203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23f70b5a75011%3A0x4661f47875fd033f!2sPT.%20Bali%20Sundaram%20Travel!5e0!3m2!1sid!2sid!4v1760363580811!5m2!1sid!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Contact Section */}
      <div className="-mt-14 relative z-20 bg-white border-2 border-teal-700/30 rounded-xl shadow-md mb-10 max-w-6xl mx-auto px-6 py-20 -translate-y-20 md:-translate-y-28">
        <h2
          data-aos="fade-up"
          className={`text-center text-3xl mb-2 text-teal-600 tracking-wider ${LaBelleAurore.className}`}
        >
          Contact Us
        </h2>

        <div className="mt-5 flex flex-col items-center justify-center mb-6 md:flex-row">
          <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-full mb-3 md:mb-0 md:mr-4"></div>
          <h2
            className={`text-3xl md:text-4xl text-black drop-shadow-sm font-semibold ${hkGrotesk.className}`}
          >
            Get In Touch
          </h2>
        </div>

        <p
          className={`mb-10 text-lg text-center text-gray-800 font-medium ${hkGrotesk.className}`}
        >
          We are at your disposal 7 days a week!
        </p>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
          {/* 🗺️ Store Location */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="flex flex-col items-center p-8 shadow-md rounded-md gap-5 cursor-pointer hover:bg-teal-50 transition-all"
          >
            <div className="bg-teal-50 p-6 shadow-md rounded-xl">
              <MapPin className="w-8 h-8 text-teal-600" />
            </div>
            <div className="space-y-3">
              <h3 className={`text-lg font-semibold ${hkGrotesk.className}`}>
                Store Location
              </h3>
              <Link
                href="https://www.google.com/maps?q=PT.+Bali+Sundaram+Travel,+JL.+Pudak+No+3A+Batubulan,+Gianyar"
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-800 text-md font-medium hover:text-teal-600 ${hkGrotesk.className}`}
              >
                JL. Pudak No 3A Batubulan, Kec. Sukawati, Gianyar
              </Link>
            </div>
          </div>

          {/* 📞 Phone Numbers / WhatsApp */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="flex flex-col items-center p-8 shadow-md rounded-md gap-5 cursor-pointer hover:bg-teal-50 transition-all"
          >
            <div className="bg-teal-50 p-6 shadow-md rounded-xl">
              <Phone className="w-8 h-8 text-teal-600" />
            </div>
            <div className="space-y-3">
              <h3 className={`text-lg font-semibold ${hkGrotesk.className}`}>
                WhatsApp / Phone
              </h3>
           

<Link
  href="https://wa.me/6281338905757?text=Halo,%20ada%20yang%20bisa%20kami%20bantu?"
  target="_blank"
  rel="noopener noreferrer"
  className={`text-gray-800 text-md font-medium hover:text-teal-600 block ${hkGrotesk.className}`}
>
  +62 813-3890-5757
</Link>

<Link
  href="https://wa.me/6285333775517?text=Halo,%20ada%20yang%20bisa%20kami%20bantu?"
  target="_blank"
  rel="noopener noreferrer"
  className={`text-gray-800 text-md font-medium hover:text-teal-600 block ${hkGrotesk.className}`}
>
  +62 853-3377-5517
</Link>

            </div>
          </div>

          {/* ✉️ Email */}
          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="flex flex-col items-center p-8 shadow-md rounded-md gap-5 cursor-pointer hover:bg-teal-50 transition-all"
          >
            <div className="bg-teal-50 p-6 shadow-md rounded-xl">
              <Mail className="w-8 h-8 text-teal-600" />
            </div>
            <div className="space-y-3">
              <h3 className={`text-lg font-semibold ${hkGrotesk.className}`}>
                Email Us
              </h3>
              <Link
                href="mailto:idbalisundaram@gmail.com?subject=Halo&body=Halo,%20ada%20yang%20bisa%20kami%20bantu?" 
                className={`text-gray-800 text-md font-medium hover:text-teal-600 ${hkGrotesk.className}`}
              >
                idbalisundaram@gmail.com
              </Link>
            </div>
          </div>
        </div>
      </div>
        <WhatsAppButton />
    </div>
  );
}



