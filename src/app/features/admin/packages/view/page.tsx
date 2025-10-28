"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosError } from "axios";
import { Pencil, Trash2, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/app/services/Auth";
import ProtectedRoute from "@/app/middleware/ProtectedRoute";
import Image from "next/image";
import { adminApi } from "@/app/api/api";

interface PaketTour {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  location: string;
  image?: string;
  active: boolean;
  duration_days: number;
  duration_nights: number;
  feature_duration_days: number;
  minimum_age: number;
  pickup_location: string;
  created_at?: string;
  updated_at?: string;
}

interface EditFormData {
  title: string;
  slug: string;
  description: string;
  price: number | string;
  stock: number | string;
  location: string;
  duration_days: number | string;
  duration_nights: number | string;
  feature_duration_days: number | string;
  minimum_age: number | string;
  pickup_location: string;
  image: File | null;
  active: boolean;
}

export default function ViewPaketTourPage() {
  const { token } = useAuth();
  const [pakets, setPakets] = useState<PaketTour[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<PaketTour | null>(null);
  const [editForm, setEditForm] = useState<EditFormData | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);

  const fetchPakets = async () => {
    if (!token) return;
    setLoading(true);
    try {
      // const res = await axios.get(apiUrl, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      const res = await adminApi.get("/paket-tours");
      const data = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];
      setPakets(data);
    } catch (err) {
      console.error("Gagal ambil data paket:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus paket ini?")) return;
    if (!token) return;
    try {
      // await axios.delete(`${apiUrl}/${id}`, {
      //   headers: { Authorization: `Bearer ${token}` },
      // });
      await adminApi.delete(`/paket-tours/${id}`);
      fetchPakets();
    } catch (err) {
      console.error("Gagal hapus paket:", err);
    }
  };

  const openEditModal = (paket: PaketTour) => {
    setEditing(paket);
    setEditForm({
      title: paket.title,
      slug: paket.slug,
      description: paket.description,
      price: paket.price,
      stock: paket.stock,
      location: paket.location,
      duration_days: paket.duration_days,
      duration_nights: paket.duration_nights,
      feature_duration_days: paket.feature_duration_days,
      minimum_age: paket.minimum_age,
      pickup_location: paket.pickup_location,
      active: paket.active,
      image: null,
    });
  };

  const handleEditChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!editForm) return;
    const target = e.target;

    const generateSlug = (text: string) =>
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setEditForm({ ...editForm, [target.name]: target.checked });
      return;
    }

    if (target.name === "title") {
      const newSlug = generateSlug(target.value);
      setEditForm({ ...editForm, title: target.value, slug: newSlug });
    } else {
      setEditForm({ ...editForm, [target.name]: target.value });
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setNewImage(file);
  };

  const handleEditSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!editing || !token || !editForm) return;

    const formData = new FormData();
    // Object.entries(editForm).forEach(([key, value]) => {
    //   if (value instanceof File) {
    //     formData.append(key, value);
    //   } else if (key === "active") {
    //     formData.append(key, value ? "1" : "0");
    //   } else {
    //     formData.append(key, String(value));
    //   }
    // });

    // if (newImage) formData.append("image", newImage);
    Object.entries(editForm).forEach(([key, value]) => {
  if (key === "image") return; // Jangan kirim field image default

  if (key === "active") {
    formData.append(key, value ? "1" : "0");
  } else {
    formData.append(key, String(value));
  }
});

// Hanya kirim image jika memilih file baru
if (newImage) {
  formData.append("image", newImage);
}

    setEditLoading(true);
    try {
      // await axios.post(`${apiUrl}/${editing.id}?_method=PUT`, formData, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      await adminApi.post(`/paket-tours/${editing.id}?_method=PUT`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Paket tour berhasil diperbarui!");
      setEditing(null);
      setEditForm(null);
      setNewImage(null);
      fetchPakets();
    } catch (err) {
      const error = err as AxiosError;
      console.error("Gagal update paket:", error.response?.data || error.message);
      alert("Gagal memperbarui paket!");
    } finally {
      setEditLoading(false);
    }
  };

  useEffect(() => {
    fetchPakets();
  }, [token]);

  const filteredPakets = pakets.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="p-6 bg-white rounded-xl shadow-sm">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 drop-shadow-xs">
          Daftar Paket Tour
        </h1>

        <input
          type="text"
          placeholder="Cari paket..."
          className="mb-4 px-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="bg-white rounded-md shadow-md overflow-x-auto border border-slate-200">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-cyan-700" size={30} />
            </div>
          ) : (
            <table className="min-w-full table-auto text-sm text-gray-800">
              <thead className="bg-cyan-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">No</th>
                  <th className="px-4 py-3 text-left">Judul</th>
                  <th className="px-4 py-3 text-left">Slug</th>
                  <th className="px-4 py-3 text-left">Deskripsi</th>
                  <th className="px-4 py-3 text-left">Lokasi</th>
                  <th className="px-4 py-3 text-left">Durasi</th>
                  <th className="px-4 py-3 text-left">Harga</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Gambar</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredPakets.length > 0 ? (
                  filteredPakets.map((paket, i) => (
                    <tr
                      key={paket.id}
                      className="border-b border-slate-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3">{i + 1}</td>
                      <td className="px-4 py-3 font-semibold">{paket.title}</td>
                      <td className="px-4 py-3">{paket.slug}</td>
                      <td className="px-4 py-3 max-w-[300px]">{paket.description}</td>
                      <td className="px-4 py-3">{paket.location}</td>
                      <td className="px-4 py-3">{paket.duration_days}H/{paket.duration_nights}M</td>
                      <td className="px-4 py-3 font-medium">Rp {paket.price.toLocaleString("id-ID")}</td>
                      <td className="px-4 py-3 text-center">
                        {paket.active ? (
                          <span className="text-green-600 font-semibold">Aktif</span>
                        ) : (
                          <span className="text-red-600 font-semibold">Nonaktif</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {paket.image ? (
                          <Image
                            src={`http://127.0.0.1:8000/storage/${paket.image}`}
                            alt={paket.title}
                            width={60}
                            height={40}
                            className="rounded-md object-cover border"
                            unoptimized
                          />
                        ) : (
                          "-"
                        )}
                      </td>
  <td className="px-4 py-3 text-center">
  <div className="flex items-center justify-center gap-2">
    {/* Tombol Edit */}
    <button
      onClick={() => openEditModal(paket)}
      className="bg-white shadow-sm border border-slate-200 p-2 rounded-lg text-cyan-700 hover:bg-cyan-50 hover:shadow-md transition-all duration-200"
      title="Edit Paket"
    >
      <Pencil size={18} />
    </button>

    {/* Tombol Delete */}
    <button
      onClick={() => handleDelete(paket.id)}
      className="bg-white shadow-sm border border-slate-200 p-2 rounded-lg text-red-600 hover:bg-red-50 hover:shadow-md transition-all duration-200"
      title="Hapus Paket"
    >
      <Trash2 size={18} />
    </button>
  </div>
</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="text-center py-6 text-gray-500 italic">
                      Tidak ada data paket tour ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Edit */}
      <AnimatePresence>
   {editing && editForm && (
    <>
      {/* Background overlay */}
      <motion.div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setEditing(null)}
      />

      {/* Modal container */}
      <motion.div
        className="fixed z-50 inset-0 flex items-center justify-end overflow-y-auto p-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <div className="bg-white mt-[800px] rounded-2xl shadow-md border border-gray-200 w-full max-w-4xl p-6 relative">
          {/* Tombol close */}
          <button
            onClick={() => setEditing(null)}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-semibold mb-4">Edit Paket Tour</h2>

          <form onSubmit={handleEditSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kolom kiri */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Judul
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleEditChange}
                    className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Slug
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={editForm.slug}
                    onChange={handleEditChange}
                    className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Deskripsi
                  </label>
                  <textarea
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    rows={4}
                    className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  />
                </div>
              </div>

              {/* Kolom kanan */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Harga (Rp)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleEditChange}
                    className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Stok
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={editForm.stock}
                    onChange={handleEditChange}
                    className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Lokasi
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleEditChange}
                    className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  />
                </div>
                <div>
  <label className="block mb-2 text-sm font-medium text-gray-700">Durasi (Hari)</label>
  <input
    type="number"
    name="duration_days"
    value={editForm.duration_days}
    onChange={handleEditChange}
    className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
  />
</div>

<div>
  <label className="block mb-2 text-sm font-medium text-gray-700">Durasi (Malam)</label>
  <input
    type="number"
    name="duration_nights"
    value={editForm.duration_nights}
    onChange={handleEditChange}
    className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
  />
</div>

<div>
  <label className="block mb-2 text-sm font-medium text-gray-700">Featured (Hari)</label>
  <input
    type="number"
    name="feature_duration_days"
    value={editForm.feature_duration_days}
    onChange={handleEditChange}
    className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
  />
</div>

<div>
  <label className="block mb-2 text-sm font-medium text-gray-700">Usia Minimal</label>
  <input
    type="number"
    name="minimum_age"
    value={editForm.minimum_age}
    onChange={handleEditChange}
    className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
  />
</div>

<div>
  <label className="block mb-2 text-sm font-medium text-gray-700">Lokasi Penjemputan</label>
  <input
    type="text"
    name="pickup_location"
    value={editForm.pickup_location}
    onChange={handleEditChange}
    className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
  />
</div>


                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Gambar Baru
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  />
                </div>

                {editing.image && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gambar Saat Ini
                    </label>
                    <Image
                      src={`http://127.0.0.1:8000/storage/${editing.image}`}
                      alt="Preview"
                      width={400}
                      height={192}
                      className="mt-2 object-cover rounded-lg border"
                      unoptimized
                    />
                  </div>
                )}

                <div className="flex items-center gap-3 mt-4">
                  <input
                    type="checkbox"
                    name="active"
                    checked={editForm.active}
                    onChange={handleEditChange}
                  />
                  <label className="text-gray-700">Aktifkan Paket Tour</label>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={editLoading}
                className="px-4 py-2 rounded-lg bg-cyan-700 text-white hover:bg-cyan-800 disabled:opacity-50"
              >
                {editLoading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>
    </ProtectedRoute>
  );
}





