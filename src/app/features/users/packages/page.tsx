// src/app/features/packages/page.tsx
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "@/app/components/FavoriteButton";

// 🚀 Nanti bagian ini akan diganti dengan fetch API dari Laravel (SSR)
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
      "https://images.unsplash.com/photo-1570436493369-44d9b196d3db?auto=format&fit=crop&w=800&q=80",
    slug: "paket-wisata-bali-ubud",
  },
];

export default function PackagesPage() {
  // 🔹 Nanti `packages` ini akan diganti hasil fetch dari server (SSR)
  const packages = staticPackages;

  return (
    <section className="bg-gradient-to-b from-teal-50 to-white py-16 px-8 text-center">
      {/* 🔹 Judul utama section */}
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Paket Wisata Unggulan
      </h2>

      {/* 🔹 Deskripsi pembuka */}
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Nikmati perjalanan tak terlupakan dengan destinasi terbaik, layanan
        nyaman, dan pengalaman seru bersama kami.
      </p>

      {/* 🔹 Grid daftar paket wisata */}
      <div className="grid md:grid-cols-2 gap-8 justify-center">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="flex bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {/* 🔹 Gambar utama paket */}
            <div className="relative w-2/5 h-60">
              <Image
                src={pkg.image_url}
                alt={pkg.title}
                fill
                className="object-cover"
              />

              {/* 🔹 Tombol favorit (nanti bisa dibuat client component interaktif) */}
               <FavoriteButton />

            </div>

            {/* 🔹 Bagian teks di kanan gambar */}
            <div className="p-6 text-left flex flex-col justify-between w-3/5">
              <div>
                {/* 🔹 Durasi paket */}
                <div className="inline-flex items-center bg-teal-50 text-teal-600 text-sm px-3 py-1 rounded-md mb-2">
                  ⏱️ {pkg.duration}
                </div>

                {/* 🔹 Nama / judul paket */}
                <h3 className="text-lg font-semibold text-gray-900">
                  {pkg.title}
                </h3>
              </div>

              {/* 🔹 Harga dan tombol aksi */}
              <div>
                <p className="text-xl font-bold text-gray-900 mt-3">
                  Rp{pkg.price.toLocaleString("id-ID")}
                </p>
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="inline-block mt-4 bg-rose-500 hover:bg-rose-600 text-white font-medium px-5 py-2 rounded-lg"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
