"use client";

import { useState, DragEvent } from "react";
import { Loader2, Upload } from "lucide-react";
import { useAuth } from "@/app/services/Auth";
import ProtectedRoute from "@/app/middleware/ProtectedRoute";
import {adminApi} from "@/app/api/api"
import AlertInputPackages from "@/app/components/userAdminModal/page";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loading/index";
import { hkGrotesk } from "@/app/fonts/fonts";

interface AlertModalState {
  show: boolean;
  title: string;
  message: string;
  onClose: () => void;
  showConfirm?: boolean; // tombol "Iya / Tidak"
  onConfirm?: () => void; // aksi kalau klik "Iya"
}
interface PaketTourFormData {
  title: string;
  slug: string;
  description: string;
  price: string;
  stock: string;
  location: string;
  duration_days: string;
  duration_nights: string;
  feature_duration_days: string;
  minimum_age: string;
  pickup_location: string;
  image: File | null;
  active: boolean;
}

export default function InputPaketTourPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModalLoading, setShowModalLoading] = useState(false);
  const [formData, setFormData] = useState<PaketTourFormData>({
    title: "",
    slug: "",
    description: "",
    price: "",
    stock: "",
    location: "",
    duration_days: "5",
    duration_nights: "4",
    feature_duration_days: "5",
    minimum_age: "0",
    pickup_location: "",
    image: null,
    active: true,
  });
  const [alertModal, setAlertModal] = useState<AlertModalState>({ show: false, title: "", message: "", onClose: () => {},});



  //  Handle text input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value, type } = target;
    const val = type === "checkbox" ? (target as HTMLInputElement).checked : value;

    // auto generate slug jika title berubah
    if (name === "title") {
      const slugValue = value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      setFormData({ ...formData, title: value, slug: slugValue });
    } else {
      setFormData({ ...formData, [name]: val as never });
    }
  };

  // Validasi file upload
  const handleFile = (file: File) => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png"];
  const maxSize = 20 * 1024 * 1024; // 20MB

  if (!validTypes.includes(file.type)) {
    setError("Format gambar hanya boleh JPG atau PNG.");
    setFormData({ ...formData, image: null });
    return;
  }

  if (file.size > maxSize) {
    setError("Ukuran gambar maksimal 20MB.");
    setFormData({ ...formData, image: null });
    return;
  }

  setError(null);
  setFormData({ ...formData, image: file });
};


  // Input file biasa
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  // Drag & drop area
  const handleDrag = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  //  Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
    setAlertModal({
    show: true,
    title: "Error",
    message: "Kamu belum login!",
    onClose: () => setAlertModal({ ...alertModal, show: false }),
    });
    return;
    }
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
      if (key === "image") {
        // Hanya append kalau ada file baru
        if (value instanceof File) {
        data.append(key, value);
        }
        } else if (key === "active") {
        data.append(key, value ? "1" : "0");
        } else {
        data.append(key, String(value));
        }
      });

      const response = await adminApi.post("/paket-tours", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        },
      });


      setAlertModal({
        show: true,
        title: "Sukses",
        message: "Paket Tour berhasil ditambahkan!",
        onClose: () => {
        setAlertModal({ ...alertModal, show: false }); 
        setShowModalLoading(true); 
        setTimeout(() => {
        router.push("/features/admin/packages/view"); 
        setShowModalLoading(false);
        }, 500); 
      },
      });
      // reset form
      setFormData({
        title: "",
        slug: "",
        description: "",
        price: "",
        stock: "",
        location: "",
        duration_days: "5",
        duration_nights: "4",
        feature_duration_days: "5",
        minimum_age: "0",
        pickup_location: "",
        image: null,
        active: true,
      });
    } catch (err: unknown) {
      console.error(err);
      setAlertModal({
      show: true,
      title: "Gagal",
      message: "Gagal menambah paket tour. Lihat console untuk detail error.",
      onClose: () => setAlertModal({ ...alertModal, show: false }),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className={`flex ${hkGrotesk.className}`}>
        {showModalLoading && <Loading />}

        {/* <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} /> */}

        <div className="flex-1 min-h-screen md:p-3 lg:p-6">
          <div className="bg-white p-5 md:p-8 lg:p-8 rounded-xl shadow-sm border border-slate-200">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800 drop-shadow-xs">
              Input Paket Tour
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
              {/* Judul */}
              <div>
                <label className="block text-md mb-1 text-gray-800 font-medium">
                  Judul Paket
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  placeholder="Masukkan nama paket tour"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-md mb-1 text-gray-800 font-medium">
                  Slug (otomatis)
                </label>
                <input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none bg-gray-50"
                  readOnly
                />
              </div>

              {/* Deskripsi */}
              <div className="col-span-2">
                <label className="block text-md mb-1 text-gray-800 font-medium">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full h-28 border border-slate-400 rounded-md px-3 py-3 outline-none"
                  placeholder="Masukkan deskripsi paket tour"
                  required
                />
              </div>

              {/* Harga */}
              <div>
                <label className="block text-md mb-1 text-gray-800 font-medium">
                  Harga (Rp)
                </label>
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  type="number"
                  className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  placeholder="Masukkan harga"
                  required
                />
              </div>

              {/* Stok */}
              <div>
                <label className="block text-md mb-1 text-gray-800 font-medium">
                  Maksimal Peserta
                </label>
                <input
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  type="number"
                  className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  placeholder="Masukkan stok"
                  required
                />
              </div>

              {/* Lokasi */}
              <div>
                <label className="block text-md mb-1 text-gray-800 font-medium">
                  Lokasi
                </label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  placeholder="Masukkan lokasi"
                  required
                />
              </div>

              {/* Durasi Hari */}
              <div>
                <label className="block text-md mb-1 text-gray-800 font-medium">
                  Durasi (Hari)
                </label>
                <input
                  name="duration_days"
                  value={formData.duration_days}
                  onChange={handleChange}
                  type="number"
                  className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  min={1}
                />
              </div>

              {/* Durasi Malam */}
              <div>
                <label className="block text-md mb-1 text-gray-800 font-medium">
                  Durasi (Malam)
                </label>
                <input
                  name="duration_nights"
                  value={formData.duration_nights}
                  onChange={handleChange}
                  type="number"
                  className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  min={0}
                />
              </div>

              {/* Featured Duration */}
              <div>
                <label className="block text-md mb-1 text-gray-800 font-medium">
                  Featured (Hari)
                </label>
                <input
                  name="feature_duration_days"
                  value={formData.feature_duration_days}
                  onChange={handleChange}
                  type="number"
                  className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  min={1}
                />
              </div>

              {/* Minimum Age */}
              <div>
                <label className="block text-md mb-1 text-gray-800 font-medium">
                  Usia Minimal
                </label>
                <input
                  name="minimum_age"
                  value={formData.minimum_age}
                  onChange={handleChange}
                  type="number"
                  className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  min={0}
                />
              </div>

              {/* Pickup Location */}
              <div className="col-span-2">
                <label className="block text-md mb-1 text-gray-800 font-medium">
                  Penjemputan
                </label>
                <input
                  name="pickup_location"
                  value={formData.pickup_location}
                  onChange={handleChange}
                  className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  placeholder="Masukkan lokasi penjemputan"
                />
              </div>

              {/* Status Aktif */}
              <div className="flex items-center gap-3 mt-6">
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                />
                <label className="text-gray-700">Aktifkan Paket Tour</label>
              </div>

              {/* Upload Gambar */}
              <div className="col-span-2">
                <label
                  htmlFor="image"
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition ${
                    dragActive ? "border-cyan-700" : "text-cyan-800"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-xl">
                    <Upload className="w-8 h-8 text-cyan-700 mb-3" />
                    <p className="text-md text-gray-800">
                      <span className="font-semibold text-cyan-700">
                        Klik untuk upload
                      </span>{" "}
                      atau drag & drop
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      JPG, JPEG, PNG (MAX. 2MB)
                    </p>
                    {formData.image && (
                      <p className="mt-3 text-sm text-teal-700 font-medium">
                        📁 {formData.image.name}
                      </p>
                    )}
                    {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
                  </div>
                  <input
                    id="image"
                    type="file"
                    name="image"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Tombol Submit */}
              <div className="col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-3 bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-lg shadow-sm hover:from-teal-800 hover:to-cyan-700 font-medium flex items-center gap-2"
                >
                  {loading && <Loader2 className="animate-spin w-4 h-4" />}
                  Simpan Paket Tour
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AlertInputPackages
      show={alertModal.show}
      title={alertModal.title}
      message={alertModal.message}
      onClose={alertModal.onClose}
      />

    </ProtectedRoute>
  );
}





