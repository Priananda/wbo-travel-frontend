"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Navbar from "@/app/components/navbar";
import { hkGrotesk } from "@/app/fonts/fonts";

import {
  CheckCircle, XCircle, 
  Calendar,
  Users,
  User,
  MapPin,
} from "lucide-react";
import TourPlanAccordion from "@/app/components/tourPlanAccordion";
import AddToCart from "@/app/components/addToCart/index";
import Loading from "@/app/components/loading/index"; // ✅ pakai component Loading

interface PaketTourDetail {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string | number;
  stock: string | number;
  duration_days?: number;
  duration_nights?: number;
  maximum_participants?: number;
  minimum_age?: number;
  pickup_location?: string;
  image: string;
  created_at: string;
}

export default function PaketTourDetailPage() {
  const { slug } = useParams();
  const [paket, setPaket] = useState<PaketTourDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get<PaketTourDetail>(
          `http://127.0.0.1:8000/api/paket-tours/${slug}`
        );
        setPaket(res.data);
      } catch {
        setPaket(null);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  if (loading) return <Loading />; 

  if (!paket)
    return (
      <p className="text-center mt-24 text-gray-500">
        Paket tidak ditemukan
      </p>
    );

 // 🔹 Deskripsi khusus berdasarkan slug
// 🔹 Deskripsi khusus berdasarkan slug
const deskripsiKhusus =
  slug === "bali-paket-tour-3-hari-2-malam-adventure" ? (
    <DeskripsiA paket={paket} />
  ) : slug === "bali-paket-tour-3-hari-2-malam-kintamani-tanah-lot-ubud" ? (
    <DeskripsiB paket={paket} />
  ) : slug === "bali-paket-tour-3-hari-2-malam-kintamani-tanah-lot-benoa" ? (
    <DeskripsiC paket={paket} />
  ) : slug === "bali-paket-tour-4-hari-3-malam-adventure" ? (
    <DeskripsiD paket={paket} />
  ) : slug === "bali-paket-tour-4-hari-3-malam-kintamani-bedugul-tanah-lot" ? (
    <DeskripsiE paket={paket} />
  ) : slug === "bali-paket-tour-4-hari-3-malam-kintamani-tanah-lot-bedugul" ? (
    <DeskripsiF paket={paket} />
  ) : slug === "packages/bali-paket-tour-5-hari-4-malam" ? (
    <DeskripsiG paket={paket} />
  ) : slug === "bali-paket-tour-5-hari-4-malam-adventure" ? (
    <DeskripsiH paket={paket} />
  ) : slug ===
    "bali-paket-tour-5-hari-4-malam-kopi-luwak-pantai-melasti-uluwatu" ? (
    <DeskripsiI paket={paket} />
  ) : slug === "bali-paket-tour-liburan-1-hari-nusa-penida-bagian-barat" ? (
    <DeskripsiJ paket={paket} />
  ) : slug === "bali-paket-tour-liburan-1-hari-nusa-penida-bagian-timur" ? (
    <DeskripsiK paket={paket} />
  ) : slug === "bali-paket-tour-eksplorasi-4-hari-3-malam-keajaiban-wisata" ? (
    <DeskripsiL paket={paket} />
  ) : slug ===
    "bali-paket-tour-eksplorasi-4-hari-3-malam-keajaiban-wisata-bali" ? (
    <DeskripsiM paket={paket} />
  ) : slug === "bali-paket-tour-3-hari-2-malam-tanah-lot-dan-kintamani" ? (
    <DeskripsiN paket={paket} />
  ) : slug === "paket-bulan-madu-3-hari-2-malam" ? (
    <DeskripsiO paket={paket} />
  ) : slug ===
    "paket-spesial-4-hari-3-malam-dengan-pesona-keindahan-alam-bali" ? (
    <DeskripsiP paket={paket} />
  ) : slug === "paket-wisata-bali-fullday-uluwatu-tour" ? (
    <DeskripsiQ paket={paket} />
  ) : slug === "paket-wisata-bali-fullday-bedugul-tour" ? (
    <DeskripsiR paket={paket} />
  ) : slug === "paket-wisata-bali-fullday-kintamani-tour" ? (
    <DeskripsiS paket={paket} />
  ) : slug === "paket-wisata-bali-fullday-ubud-tour" ? (
    <DeskripsiT paket={paket} />
  ) : null;


  return (
    
    <div className="min-h-screen bg-white py-10">
      <div className="absolute top-0 left-0 w-full z-50">
                <Navbar />
           </div>
      {/* Grid dua kolom */}
      <div className="mt-32 px-4 lg:px-0 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Kiri - Gambar */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative w-full h-80">
            <Image
              src={`http://127.0.0.1:8000/storage/${paket.image}`}
              alt={paket.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Kanan - Detail + AddToCart */}
        <div className={`bg-white rounded-xl shadow-md border border-gray-300 p-6 flex flex-col justify-between ${hkGrotesk.className}`}>
          {/* Judul & Harga */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-3">
              {paket.title}
            </h1>
            <p className="text-2xl font-semibold text-cyan-700 mb-4">
              Rp{Number(paket.price).toLocaleString("id-ID")}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              {paket.description}
            </p>
          </div>

          {/* Tombol AddToCart */}
          <AddToCart
            paketId={paket.id}
            title={paket.title}
            price={Number(paket.price)}
            image={`http://127.0.0.1:8000/storage/${paket.image}`}
            description={paket.description}
          />
        </div>
      </div>

      {/* Deskripsi Tambahan */}
      {deskripsiKhusus}
    </div>
  );
}

/* === COMPONENT DESKRIPSI TAMBAHAN === */

// SLUG 1
function DeskripsiA({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      {/* 🔹 Deskripsi */}
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman
          tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani,
          Tirtam Empil, dan tentu saja yang menjadi highlight tour ini adalah
          petualangan ATV dan Watersport. Dengan pemandangan alam yang memukau,
          keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini
          dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>

      {/* 🔹 Peserta */}
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer dilakukan setelah menerima copy invoice dari kami melalui WhatsApp/email.
          </li>
          <li>
            Bukti transfer bisa dikirim melalui WhatsApp di website kami atau email.
          </li>
          <li>
            Setelah pembayaran, kami kirim Detail Invoice sebagai bukti konfirmasi reservasi.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan dikembalikan sesuai ketentuan vendor (hotel, restoran, dll).
          </li>
          <li>
            Deposit yang masih ada (sisa pembayaran hotel dll) akan dikembalikan sesuai kebijakan vendor.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Solaris Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Deluxe Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
                "Shuttle di pantai Tanah Barak",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Kalungan bunga",
            "Makan Siang di Mak Jo",
            "Pantai Pandawa & Pantai Tanah Barak",
            "Pantai Melasti",
            "Pura Uluwatu",
            "Makan Malam (biaya sendiri)",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "ATV (tandem 1 jam)",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Restaurant Grand Puncak Sari",
            "Desa Penglipuran",
            "Shopping di Krisna Oleh-Oleh",
            "Makan Malam (biaya sendiri)",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Pengantaran ke Bandara Ngurah Rai",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG 2 */
function DeskripsiB({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Makan Siang di Restaurant Bali Timbungan",
            "Tanah Lot",
            "Makan Malam (Biaya Sendiri)",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur Volcano View",
            "Makan Siang (buffet) di Restaurant Grand Puncak Sari",
            "Bali Coffee Plantation",
            "Ubud Art Market",
            "Ubud Palace",
            "Makan Malam (Biaya Sendiri)",
            "Belanja di Krisna Oleh-oleh",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Pengantaran ke Bandara Internasional Ngurah Rai",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG 3 */
function DeskripsiC({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG 4 */
function DeskripsiD({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 4 hari 3 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Solaris Kuta (3)*</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 3 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 3 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Pengalungan bunga di Bandara",
                "Transportasi pribadi dengan driver merangkap guide (Mobil 6-Seater)",
                "Semua tiket masuk dan aktivitas sesuai program",
                "Makan (Sarapan, Makan Siang & Makan Malam) sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan Bunga di Bandara",
            "Makan Siang di Mak Jo Restaurant",
            "Pantai Melasti",
            "Pura Uluwatu",
            "Makan Malam di Jimbaran (Paket seafood lengkap dengan kelapa muda utuh)",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "ATV Tandem 1 Jam",
            "Makan siang di Finis ATV",
            "Ayung River Rafting",
            "Makan malam di Ayam Betutu Bu Mira",
          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "The Bloom Garden",
                  "Ulundanu Temple and Beratan Lake",
                  "Makan siang di Restaurant The Ulundanu",
                  "Pod Chocolate Factory",
                  "Sunset Tanah Lot",
                  "Makan Malam di Restaurant Seribu Rempah",
                ]}
        />
        <TourPlanAccordion
          day="Day 4"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out Hotel",
                  "Pantai Kuta",
                  "Belanja di Krisna Oleh-oleh",
                  "Pengantaran ke Bandara Internasional Ngurah Rai",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG 5 */
function DeskripsiE({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG 6 */
function DeskripsiF({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG 7 */
function DeskripsiG({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG 8 */
function DeskripsiH({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG 9 */
function DeskripsiI({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG 10 */
function DeskripsiJ({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG  */
function DeskripsiK({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG  */
function DeskripsiL({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}


/* SLUG */
function DeskripsiM({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG */
function DeskripsiN({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG  */
function DeskripsiO({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG */
function DeskripsiP({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG */
function DeskripsiQ({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG*/
function DeskripsiR({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG */
function DeskripsiS({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}


/* SLUG */
function DeskripsiT({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}

/* SLUG */
function DeskripsiU({ paket }: { paket: PaketTourDetail }) {
  return (
    <div className="mt-10 space-y-8 px-4 md:px-9  lg:px-9">
      <div className="bg-cyan-50 rounded-2xl p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
        <InfoItem
          icon={<Calendar className="w-8 h-8 text-red-500 mb-2" />}
          title="Durasi"
          value={`${paket.duration_days ?? 3} Hari ${
            paket.duration_nights ?? 2
          } Malam`}
        />
        <InfoItem
          icon={<Users className="w-8 h-8 text-red-500 mb-2" />}
          title="Maksimal Peserta"
          value={paket.maximum_participants ?? 40}
        />
        <InfoItem
          icon={<User className="w-8 h-8 text-red-500 mb-2" />}
          title="Usia Minimum"
          value={`${paket.minimum_age ?? 3}+`}
        />
        <InfoItem
          icon={<MapPin className="w-8 h-8 text-red-500 mb-2" />}
          title="Penjemputan"
          value={paket.pickup_location ?? "Bus/Mobil"}
        />
      </div>

      <div className=" text-black space-y-10">
      <section>
        <p className="text-md leading-8">
          Selamat datang dalam paket tour 3 hari 2 malam yang menawarkan pengalaman tak terlupakan di beberapa tujuan wisata paling ikonik di Bali: Kintamani, Tanah Lot, Benoa, dan Desa Penglipuran, dan beberapa tempat wisata populer di Bali lainya. Dengan pemandangan alam yang memukau, keindahan budaya, dan pengalaman kuliner yang lezat, paket tour ini dirancang untuk memenuhi berbagai selera wisatawan.
        </p>
      </section>
      <section>
        <h2 className="-mt-5 text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Peserta</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>Minimal peserta 2 orang dewasa.</li>
          <li>Satu kamar hotel untuk 2 orang.</li>
          <li>
            Peserta ketiga atau ganjil akan digabung dalam satu kamar dengan tambahan extra bed.
          </li>
          <li>Anak umur 0–4 tahun free, kebutuhan anak ditanggung orang tua.</li>
          <li>
            Anak umur 5–9 tahun 50% dari harga dewasa, satu kamar dengan orang tua tanpa extra bed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembayaran */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembayaran</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>50% Deposit wajib ditransfer pada saat pemesanan.</li>
          <li>
            Transfer pembayaran wajib dilakukan setelah menerima copy invoice dari kami, yang akan kami kirimkan, melalui WhatsApp messenger/ email
          </li>
          <li>
            Bukti transfer bisa dikirimkan melalui WhatsApp yang tersedia pada website, atau bisa juga melalui email kami
          </li>
          <li>
            Setelah melakukan pembayaran, kami akan kirimkan kembali Detail Invoice, sebagai bukti bahwa kami sudah menerima pembayaran, sekaligus menyatakan servasi sudah confirmed.
          </li>
        </ul>
      </section>

      {/* 🔹 Pembatalan */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pembatalan</h2>
        <ul className="pl-4 list-disc list-inside space-y-2">
          <li>
            Jika terjadi pembatalan setelah transfer, deposit akan kami kembalikan sesuai ketentuan dari vendor kami, seperti: hotel, dan pendukung aktivitas lainnya.
          </li>
          <li>
            Deposit yang masih ada pada kami (sisa pembayaran hotel dll), akan kami kembalikan, dan untuk deposit yang sudah kami bayarkan akan mengikuti ketentuan dari vendor kami, seperti; hotel, restaurant, dan pihak ketiga pendukung aktivitas wisata ini.
          </li>
        </ul>
      </section>

      {/* 🔹 Pilihan Hotel */}
      <section>
        <h2 className="text-xl font-semibold mb-4 border-b border-cyan-700 pb-2">Pilihan Hotel</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Zia Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: 1 Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
          <div className="border border-cyan-700 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-lg mb-2">Grand Livio Hotel Kuta (3*)</h3>
            <div className="space-y-1">
            <p>Tipe Kamar: Superior Room</p>
            <p>Jumlah Malam: 2 malam</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Included / Excluded */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b border-cyan-700  pb-2">Included / Excluded</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Included */}
          <div>
            <h3 className="font-semibold text-green-600 mb-3">Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Menginap 2 malam di hotel bintang 3 di Kuta",
                "Kalungan bunga di bandara",
                "Private transport dengan driver sebagai guide (6-seater)",
                "Tiket masuk wisata, aktivitas dan makan siang sesuai program",
                "1 botol air mineral setiap full tour",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excluded */}
          <div>
            <h3 className="font-semibold text-red-600 mb-3">Tidak Termasuk:</h3>
            <ul className="space-y-3 pl-4">
              {[
                "Tiket pesawat",
                "Makan malam",
                "Shopping & keperluan pribadi lainnya",
                "Tipping untuk driver",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="w-5 h-5 text-red-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>

      <section>
        <h3 className="text-3xl font-semibold mt-6 mb-3">Tour Plan</h3>
        <TourPlanAccordion
          day="Day 1"
          title="KEDATANGAN – ULUWATU TOUR"
          items={[
            "Penjemputan di Bandara Ngurah Rai",
            "Pengalungan bunga",
            "Watersport di Tanjung Benoa (Gratis 1x Naik Banana Boat)",
            "Makan Siang di Kekeb Nusa Dua",
            "Pura Uluwatu",
            "Makan Malam di New Furama Seafood Jimbaran",
            "Check in hotel",
          ]}
        />
        <TourPlanAccordion
          day="Day 2"
          title="FULL DAY KINTAMANI TOUR"
          items={[
            "Sarapan di hotel",
            "Desa Seni Batubulan",
            "Desa Penglipuran",
            "Kintamani Mount Batur View",
            "Makan Siang (buffet) di Resto Batur Sari",
            "Tirta Empul",
            "Makan Malam di Ayam Betutu Bu Mira",

          ]}
        />
        <TourPlanAccordion
          day="Day 3"
          title="DAY OUT"
          items={["Sarapan di hotel", 
                  "Check out hotel",
                  "Tanah Lot",
                  "Shopping di Krisna Oleh-Oleh",
                  "Pengantaran ke Bandara",
                ]}
        />
      </section>
    </div>
  );
}






// 🔸 Komponen kecil untuk info
function InfoItem({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col items-center">
      {icon}
      <p className="font-semibold text-gray-800">{title}</p>
      <p className="text-gray-600 text-sm">{value}</p>
    </div>
  );
}














