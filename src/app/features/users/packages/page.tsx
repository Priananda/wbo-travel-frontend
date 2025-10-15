import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/app/components/FavoriteButton";
import { hkGrotesk } from "@/app/fonts/fonts";

// Nanti bagian ini akan diganti dengan fetch API dari Laravel (SSR)
const staticPackages = [
  {
    id: 1,
    title: "Paket Wisata Bali – Fullday Bedugul Tour",
    duration: "1 day",
    price: 750000,
    image_url:
      "https://images.unsplash.com/photo-1553514029-1318c9127859?auto=format&fit=crop&w=800&q=80",
    slug: "paket-wisata-bali-bedugul",
  },
  {
    id: 2,
    title: "Paket Wisata Bali – Fullday Ubud Tour",
    duration: "1 day",
    price: 700000,
    image_url:
      "https://images.unsplash.com/photo-1553514029-1318c9127859?auto=format&fit=crop&w=800&q=80",
    slug: "paket-wisata-bali-ubud",
  },
   {
    id: 3,
    title: "Paket Wisata Bali – Fullday Bedugul Tour",
    duration: "1 day",
    price: 750000,
    image_url:
      "https://images.unsplash.com/photo-1553514029-1318c9127859?auto=format&fit=crop&w=800&q=80",
    slug: "paket-wisata-bali-bedugul",
  },
  {
    id: 4,
    title: "Paket Wisata Bali – Fullday Ubud Tour",
    duration: "1 day",
    price: 700000,
    image_url:
      "https://images.unsplash.com/photo-1553514029-1318c9127859?auto=format&fit=crop&w=800&q=80",
    slug: "paket-wisata-bali-ubud",
  },
];

export default function PackagesPage() {
  // 🔹 Nanti `packages` ini akan diganti hasil fetch dari server (SSR)
  const packages = staticPackages;

  return (
    <section className="py-16 px-8 bg-gradient-to-b from-teal-50 to-cyan-50">
      <div className="max-w-6xl mx-auto text-center">
       <div className="flex flex-col items-center justify-center mb-6 md:flex-row">
                <div className="w-20 h-1 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-full mb-3 md:mb-0 md:mr-4"></div>
                <h2
                  className={`text-3xl md:text-4xl text-black drop-shadow-sm font-semibold text-center md:text-left ${hkGrotesk.className}`}
                >
                  Paket Wisata Unggulan
                </h2>
              </div>
              <p className="mb-12 text-lg text-gray-800">
          Ada banyak alasan menggunakan Wisata Bali Oke sebagai pilihan layanan tour di Bali
        </p>

      {/* 🔹 Grid daftar paket wisata */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-center">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex bg-white rounded-md shadow-sm overflow-hidden hover:shadow-sm transition"
          >
            {/* 🔹 Gambar utama paket */}
            <div className="relative w-72 h-auto m-2">
              <Image
                src={pkg.image_url}
                alt={pkg.title}
                fill
                className="object-cover rounded-md"
              />

              {/* 🔹 Tombol favorit (nanti bisa dibuat client component interaktif) */}
               <FavoriteButton />

            </div>

            {/* 🔹 Bagian teks di kanan gambar */}
            <div className="p-7 text-left flex flex-col justify-between  w-3/5">
              <div className={`${hkGrotesk.className}`}>
                {/* 🔹 Durasi paket */}
                <div className="px-3 py-2 mb-2 inline-flex items-center border bg-teal-50 text-teal-600 text-md rounded-md font-semibold">
                  ⏱️ {pkg.duration}
                </div>

                {/* 🔹 Nama / judul paket */}
                <h3 className="mt-3 text-xl font-semibold text-gray-900  hover:text-teal-600 cursor-pointer">
                  {pkg.title}
                </h3>
              </div>

              {/* 🔹 Harga dan tombol aksi */}
              <div className={`mt-5 flex items-center justify-center gap-12 ${hkGrotesk.className}`}>
                <p className="text-xl font-bold text-gray-900 mt-3">
                  Rp{pkg.price.toLocaleString("id-ID")}
                </p>
               <Link
  href={`/packages/${pkg.slug}`}
  className={`inline-block mt-4 bg-cyan-700 
     hover:bg-cyan-800 
     text-white px-5 py-2 rounded-lg shadow-sm
     transition-all duration-300 font-medium ${hkGrotesk.className}`}
>
  Explore
</Link>


              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="">
  <a
    href="https://www.example.com" 
    target="_blank" // buka di tab baru
    rel="noopener noreferrer" 
    className={`inline-block mt-10 bg-gradient-to-r from-teal-600 to-cyan-700 
       hover:from-teal-800 hover:to-cyan-600 
       text-white px-7 py-3 rounded-lg 
       transition-all duration-300 font-medium ${hkGrotesk.className}`}
  >
    Explore More
  </a>

      </div>
      </div>
    </section>
  );
}
