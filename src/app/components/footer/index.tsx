// export default function Footer() {
//   return (
//     <footer className="relative bg-gradient-to-r from-teal-600 to-cyan-700 text-white py-5 text-center">
//       <div className="absolute top-0 left-0 w-full h-1 "></div>

//       <div className="container mx-auto px-6">
//         <p className="text-sm md:text-base font-medium">
//           © {new Date().getFullYear()}{""}
//           <span className="text-white font-semibold">
//             Bali Wisata Oke
//           </span>
//           . All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, Facebook, Instagram, Music2 } from "lucide-react";

import LogoWbo from "@/app/assets/images/logo-wbo-removebg.png";
import LogoAsita from "@/app/assets/images/logo-asita.jpeg";
import LogoSundaram from "@/app/assets/images/logo-sundaram.png";
import LogoPesonaIndonesia from "@/app/assets/images/pesonaindonesia.png";
import LogoCanwego from "@/app/assets/images/canwego.jpeg";
import LogoTravelinbalii from "@/app/assets/images/travelinbalii.jpeg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#141a36] text-white pt-12 pb-6">
      <div className="container mx-auto px-6 grid gap-10 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {/* Kolom 1 - Logo & Deskripsi */}
        <div className="space-y-4 xl:col-span-2">

          <Image
            src={LogoWbo}
            alt="Wisata Bali Oke"
            priority
            className="object-cover"
            width={80}
            height={80}
          />


          <p className="max-w-md text-gray-300 leading-relaxed">
            Wisata Bali Oke adalah perusahaan dibawah naungan PT Bali Sundaram Travel
            yang merupakan perusahaan yang bergerak pada layanan jasa tour dan travel di Bali.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Link href="https://www.facebook.com/profile.php?id=61554616392242" aria-label="Facebook" className="hover:opacity-80">
              <Facebook size={20} />
            </Link>
            <Link href="https://www.instagram.com/wisatabalioke/" aria-label="Instagram" className="hover:opacity-80">
              <Instagram size={20} />
            </Link>
            <Link href="https://www.tiktok.com/@wisatabalioke" aria-label="TikTok" className="hover:opacity-80">
              <Music2 size={20} />
            </Link>
          </div>
        </div>

        {/* Kolom 2 - Menu */}
        <div>
          <h4 className="mb-4 text-lg font-semibold">Menu</h4>
          <ul className="space-y-3 text-gray-300">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/packages">Bali Tour Packages</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/contact">Kontak</Link></li>
            <li><Link href="/about">Tentang Kami</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* Kolom 3 - About Us, Member Of, Our Brand */}
        <div className="space-y-6">
          <div>
            <h4 className="mb-4 text-lg font-semibold">About Us</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/about">Tentang Kami</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-lg font-semibold">Member Of</h4>
            <div className="flex items-center gap-4">
              <Image
                src={LogoAsita}
                alt="ASITA Bali"
                width={60}
                height={60}
                className="rounded-full  bg-white p-1"
              />
              <Image
                src={LogoPesonaIndonesia}
                alt="Wonderful Indonesia"
                width={60}
                height={60}
                className="rounded-full  bg-white p-1"
              />
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-lg font-semibold">Our Brand</h4>
            <div className="flex flex-wrap items-center gap-4">
              <Image
                src={LogoCanwego}
                alt="CanWeGo"
                width={56}
                height={56}
                className="rounded-full bg-white p-1"
              />
              <Image
                src={LogoTravelinbalii}
                alt="Travel in Bali Island"
                width={56}
                height={56}
                className="rounded-full bg-white p-1"
              />
              <Image
                src={LogoSundaram}
                alt="Bali Sundaram Travel"
                width={56}
                height={56}
                className="rounded-full bg-white p-1"
              />
            </div>
          </div>
        </div>

        {/* Kolom 4 - Contact Info */}
        <div>
          <h4 className="mb-4 text-lg font-semibold">Contact Info</h4>
          <ul className="space-y-4 text-gray-300">
            <li>
              JL. Pudak No 3A<br />
              Batubulan, Kec. Sukawati,<br />
              Kec. Gianyar
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} />
              <Link href="tel:081338905757" className="hover:text-white">
                0813-3890-5757
              </Link>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={24} />
              <Link href="mailto:idbalisundaram@gmail.com" className="hover:text-white">
                idbalisundaram@gmail.com
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Garis bawah + Copyright */}
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
        © {year} <span className="font-semibold text-white">Bali Wisata Oke</span>. All rights reserved.
      </div>
    </footer>
  );
}

