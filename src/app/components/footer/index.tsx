"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Music2,
} from "lucide-react";
import { hkGrotesk } from "@/app/fonts/fonts";

import LogoWbo from "@/app/assets/images/logo-wbo-removebg.png";
import LogoAsita from "@/app/assets/images/logo-asita.jpeg";
import LogoSundaram from "@/app/assets/images/logo-sundaram.png";
import LogoPesonaIndonesia from "@/app/assets/images/pesonaindonesia.png";
import LogoCanwego from "@/app/assets/images/canwego.jpeg";
import LogoTravelinbalii from "@/app/assets/images/travelinbalii.jpeg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`bg-[#141a36] text-white pt-12 pb-6 ${hkGrotesk.className}`}
    >
      <div className="container mx-auto px-6 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {/* 🏝️ Kolom 1 - Logo & Deskripsi */}
        <div className="space-y-4 xl:col-span-2">
          <Image
            src={LogoWbo}
            alt="Wisata Bali Oke"
            priority
            className="object-cover"
            width={80}
            height={80}
          />

          <p className="max-w-md leading-relaxed text-sm sm:text-base">
            Wisata Bali Oke adalah perusahaan di bawah naungan{" "}
            <span className="font-semibold">
              PT Bali Sundaram Travel
            </span>{" "}
            yang bergerak dalam layanan jasa tour dan travel di Bali.
          </p>

          <div className="flex items-center gap-4 pt-2">
            <Link
              href="https://www.facebook.com/profile.php?id=61554616392242"
              aria-label="Facebook"
              className="hover:opacity-80"
            >
              <Facebook size={22} className="text-white" />
            </Link>
            <Link
              href="https://www.instagram.com/wisatabalioke/"
              aria-label="Instagram"
              className="hover:opacity-80"
            >
              <Instagram size={22} className="text-white" />
            </Link>
            <Link
              href="https://www.tiktok.com/@wisatabalioke"
              aria-label="TikTok"
              className="hover:opacity-80"
            >
              <Music2 size={22} className="text-white" />
            </Link>
          </div>
        </div>

        {/* 📜 Kolom 2 - Menu */}
        <div>
          <h4 className="mb-4 text-lg font-semibold">Menu</h4>
          <ul className="space-y-3 text-sm sm:text-base">
            <li>
              <Link href="/users/dashboard" className="hover:opacity-80">
                Home
              </Link>
            </li>
            <li>
              <Link href="/packages" className="hover:opacity-80">
                Bali Paket Tour
              </Link>
            </li>
            <li>
              <Link href="/users/gallery" className="hover:opacity-80">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/users/contact" className="hover:opacity-80">
                Kontak
              </Link>
            </li>
            <li>
              <Link href="/users/about-us" className="hover:opacity-80">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link href="/blogs" className="hover:opacity-80">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* 🏢 Kolom 3 - About Us, Member Of, Our Brand */}
        <div className="space-y-6">
          <div>
            <h4 className="mb-4 text-lg font-semibold">About Us</h4>
            <ul className="space-y-3 text-sm sm:text-base">
              <li>
                <Link href="/users/about-us" className="hover:opacity-80">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/users/contact" className="hover:opacity-80">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-lg font-semibold">Member Of</h4>
            <div className="flex items-center gap-4">
              <Image
                src={LogoAsita}
                alt="ASITA Bali"
                width={55}
                height={55}
                className="rounded-full bg-white p-1"
              />
              <Image
                src={LogoPesonaIndonesia}
                alt="Wonderful Indonesia"
                width={55}
                height={55}
                className="rounded-full bg-white p-1"
              />
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-lg font-semibold">Our Brand</h4>
            <div className="flex flex-wrap items-center gap-4">
              <Image
                src={LogoCanwego}
                alt="CanWeGo"
                width={50}
                height={50}
                className="rounded-full bg-white p-1"
              />
              <Image
                src={LogoTravelinbalii}
                alt="Travel in Bali Island"
                width={50}
                height={50}
                className="rounded-full bg-white p-1"
              />
              <Image
                src={LogoSundaram}
                alt="Bali Sundaram Travel"
                width={50}
                height={50}
                className="rounded-full bg-white p-1"
              />
            </div>
          </div>
        </div>

        {/* Kolom 4 - Contact Info */}
        <div>
          <h4 className="mb-4 text-lg font-semibold">Contact Info</h4>
          <ul className="space-y-4 text-sm sm:text-base">
            {/* Alamat */}
            <li className="flex items-start gap-3">
              <MapPin size={20} className="mt-1 text-white min-w-[20px]" />
              <a
                href="https://maps.app.goo.gl/UuxM9DRKkz91c5Ry9"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                JL. Pudak No 3A<br />
                Batubulan, Kec. Sukawati,<br />
                Kec. Gianyar
              </a>
            </li>

            {/* Telepon */}
            <li className="flex items-center gap-3">
              <Phone size={20} className="text-white min-w-[20px]" />
              <a
                   href="https://wa.me/6281338905757?text=Halo%20Bali%20Sundaram%20Travel"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                0813-3890-5757
              </a>
            </li>

            {/* Email */}
            <li className="flex items-center gap-3">
              <Mail size={22} className="text-white min-w-[22px]" />
              <a
                href="mailto:idbalisundaram@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80"
              >
                idbalisundaram@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* 🔹 Footer Bottom */}
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-md">
        © {year}{" "}
        <span className="font-semibold">Bali Wisata Oke</span>. All rights
        reserved.
      </div>
    </footer>
  );
}
