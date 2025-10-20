"use client";

import { useState, DragEvent } from "react";
import axios from "axios";
import Sidebar from "@/app/components/admin/sidebar";
import { Loader2, Upload } from "lucide-react";
import { useAuth } from "@/app/services/Auth";
import ProtectedRoute from "@/app/middleware/ProtectedRoute";

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
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // 🧠 Handle text inputs
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

  // 🖼️ Validasi file upload
  const handleFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!validTypes.includes(file.type)) {
      setError("Format gambar hanya boleh JPG atau PNG.");
      setFormData({ ...formData, image: null });
      return;
    }

    if (file.size > maxSize) {
      setError("Ukuran gambar maksimal 2MB.");
      setFormData({ ...formData, image: null });
      return;
    }

    setError(null);
    setFormData({ ...formData, image: file });
  };

  // 📂 Input file biasa
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  // 🎯 Drag & drop area
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

  // 🚀 Submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      alert("❌ Kamu belum login!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          data.append(key, value);
        } else if (key === "active") {
          data.append(key, value ? "1" : "0");
        } else {
          data.append(key, String(value));
        }
      });

      const response = await axios.post(
        "http://127.0.0.1:8000/api/admin/paket-tours",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Paket Tour berhasil ditambahkan!");
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
      alert("❌ Gagal menambah paket tour. Lihat console untuk detail error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 bg-slate-50 min-h-screen p-8">
          <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">
              Input Paket Tour
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
              {/* Judul */}
              <div>
                <label className="block text-sm mb-1 text-gray-800 font-medium">
                  Judul Paket
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                  placeholder="Masukkan nama paket"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm mb-1 text-gray-800 font-medium">
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
                <label className="block text-sm mb-1 text-gray-800 font-medium">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full h-28 border border-slate-400 rounded-md px-3 py-3 outline-none"
                  placeholder="Masukkan deskripsi paket wisata..."
                  required
                />
              </div>

              {/* Harga */}
              <div>
                <label className="block text-sm mb-1 text-gray-800 font-medium">
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
                <label className="block text-sm mb-1 text-gray-800 font-medium">
                  Stok
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
                <label className="block text-sm mb-1 text-gray-800 font-medium">
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
                <label className="block text-sm mb-1 text-gray-800 font-medium">
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
                <label className="block text-sm mb-1 text-gray-800 font-medium">
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
                <label className="block text-sm mb-1 text-gray-800 font-medium">
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
                <label className="block text-sm mb-1 text-gray-800 font-medium">
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
                <label className="block text-sm mb-1 text-gray-800 font-medium">
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
                    dragActive ? "border-cyan-700" : "text-cyan-700"
                  }`}
                >
                  <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-xl">
                    <Upload className="w-8 h-8 text-cyan-700 mb-3" />
                    <p className="text-md text-gray-800">
                      <span className="font-semibold bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent">
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
        </main>
      </div>
    </ProtectedRoute>
  );
}





// "use client";

// import { useState, DragEvent } from "react";
// import axios from "axios";
// import Sidebar from "@/app/components/admin/sidebar";
// import { Loader2, Upload } from "lucide-react";
// import { useAuth } from "@/app/services/Auth";
// import ProtectedRoute from "@/app/middleware/ProtectedRoute";

// interface PaketTourFormData {
//   title: string;
//   slug: string;
//   description: string;
//   price: string;
//   stock: string;
//   location: string;
//   image: File | null;
//   active: boolean;
// }

// export default function InputPaketTourPage() {
//   const { token } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [dragActive, setDragActive] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const [formData, setFormData] = useState<PaketTourFormData>({
//     title: "",
//     slug: "",
//     description: "",
//     price: "",
//     stock: "",
//     location: "",
//     image: null,
//     active: true,
//   });

//   // 🧠 Handle text inputs
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const target = e.target as HTMLInputElement | HTMLTextAreaElement;
//     const { name, value, type } = target;
//     const val = type === "checkbox" ? (target as HTMLInputElement).checked : value;

//     // kalau title berubah, auto generate slug
//     if (name === "title") {
//       const slugValue = value
//         .toLowerCase()
//         .trim()
//         .replace(/\s+/g, "-")
//         .replace(/[^a-z0-9-]/g, "");
//       setFormData({ ...formData, title: value, slug: slugValue });
//     } else {
//       setFormData({ ...formData, [name]: val as never });
//     }
//   };

//   // 🖼️ Validasi file upload
//   const handleFile = (file: File) => {
//     const validTypes = ["image/jpeg", "image/jpg", "image/png"];
//     const maxSize = 2 * 1024 * 1024; // 2MB

//     if (!validTypes.includes(file.type)) {
//       setError("Format gambar hanya boleh JPG atau PNG.");
//       setFormData({ ...formData, image: null });
//       return;
//     }

//     if (file.size > maxSize) {
//       setError("Ukuran gambar maksimal 2MB.");
//       setFormData({ ...formData, image: null });
//       return;
//     }

//     setError(null);
//     setFormData({ ...formData, image: file });
//   };

//   // 📂 Handle input file biasa
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) handleFile(file);
//   };

//   // 🎯 Drag & drop area
//   const handleDrag = (e: DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
//     else if (e.type === "dragleave") setDragActive(false);
//   };

//   const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     const file = e.dataTransfer.files?.[0];
//     if (file) handleFile(file);
//   };

//   // 🚀 Submit form
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!token) {
//       alert("❌ Kamu belum login!");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const data = new FormData();

//       Object.entries(formData).forEach(([key, value]) => {
//         if (value instanceof File) {
//           data.append(key, value);
//         } else if (key === "active") {
//           data.append(key, value ? "1" : "0"); // Laravel expects 1/0
//         } else {
//           data.append(key, String(value));
//         }
//       });

//       console.log("🔹 Data yang dikirim ke API:");
//       for (const [key, val] of data.entries()) {
//         console.log(`   ${key}:`, val);
//       }

//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/admin/paket-tours",
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       console.log("✅ Response:", response.data);
//       alert("✅ Paket Tour berhasil ditambahkan!");

//       // reset form
//       setFormData({
//         title: "",
//         slug: "",
//         description: "",
//         price: "",
//         stock: "",
//         location: "",
//         image: null,
//         active: true,
//       });
//     } catch (err: unknown) {
//       if (axios.isAxiosError(err)) {
//         console.error("❌ Axios Error:", err.response?.data);
//         console.error("🔸 Status:", err.response?.status);
//         if (err.response?.data?.errors) {
//           for (const [field, messages] of Object.entries(
//             err.response.data.errors
//           )) {
//             console.error(`   ${field}: ${(messages as string[]).join(", ")}`);
//           }
//         }
//       } else {
//         console.error("❌ Unexpected error:", err);
//       }
//       alert("❌ Gagal menambah paket tour. Lihat console untuk detail error.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//         <ProtectedRoute allowedRoles={["admin"]}>
//     <div className="flex">
//        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

//       <main className="flex-1 bg-slate-50 min-h-screen p-8">
//         <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200">
//           <h1 className="text-2xl font-semibold mb-6 text-gray-800">
//             Input Paket Tour
//           </h1>

//           <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
//             {/* Judul */}
//             <div>
//               <label className="block text-sm mb-1 text-gray-800 font-medium">
//                 Judul Paket
//               </label>
//               <input
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
//                 placeholder="Masukkan nama paket"
//                 required
//               />
//             </div>

//             {/* Slug */}
//             <div>
//               <label className="block text-sm mb-1 text-gray-800 font-medium">
//                 Slug (otomatis)
//               </label>
//               <input
//                 name="slug"
//                 value={formData.slug}
//                 onChange={handleChange}
//                 className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none bg-gray-50"
//                 readOnly
//               />
//             </div>

//             {/* Deskripsi */}
//             <div className="col-span-2">
//               <label className="block text-sm mb-1 text-gray-800 font-medium">
//                 Deskripsi
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 className="w-full h-28 border border-slate-400 rounded-md px-3 py-3 outline-none"
//                 placeholder="Masukkan deskripsi paket wisata..."
//                 required
//               />
//             </div>

//             {/* Harga */}
//             <div>
//               <label className="block text-sm mb-1 text-gray-800 font-medium">
//                 Harga (Rp)
//               </label>
//               <input
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 type="number"
//                 className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
//                 placeholder="Masukkan harga"
//                 required
//               />
//             </div>

//             {/* Stok */}
//             <div>
//               <label className="block text-sm mb-1 text-gray-800 font-medium">
//                 Stok
//               </label>
//               <input
//                 name="stock"
//                 value={formData.stock}
//                 onChange={handleChange}
//                 type="number"
//                 className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
//                 placeholder="Masukkan stok"
//                 required
//               />
//             </div>

//             {/* Lokasi */}
//             <div>
//               <label className="block text-sm mb-1 text-gray-800 font-medium">
//                 Lokasi
//               </label>
//               <input
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
//                 placeholder="Masukkan lokasi"
//                 required
//               />
//             </div>

//             {/* Status Aktif */}
//             <div className="flex items-center gap-3 mt-6">
//               <input
//                 type="checkbox"
//                 name="active"
//                 checked={formData.active}
//                 onChange={handleChange}
//               />
//               <label className="text-gray-700">Aktifkan Paket Tour</label>
//             </div>

//             {/* Upload Gambar */}
//             <div className="col-span-2">
//               <label
//                 htmlFor="image"
//                 onDragEnter={handleDrag}
//                 onDragOver={handleDrag}
//                 onDragLeave={handleDrag}
//                 onDrop={handleDrop}
//                 className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition ${
//                   dragActive ? "border-cyan-700" : "text-cyan-700"
//                 }`}
//               >
//                 <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-xl">
//                   <Upload className="w-8 h-8 text-cyan-700 mb-3" />
//                   <p className="text-md text-gray-800">
//                     <span className="font-semibold bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent">
//                       Klik untuk upload
//                     </span>{" "}
//                     atau drag & drop
//                   </p>
//                   <p className="text-sm text-slate-500 mt-1">
//                     JPG, JPEG, PNG (MAX. 2MB)
//                   </p>
//                   {formData.image && (
//                     <p className="mt-3 text-sm text-teal-700 font-medium">
//                       📁 {formData.image.name}
//                     </p>
//                   )}
//                   {error && (
//                     <p className="text-red-600 text-xs mt-2">{error}</p>
//                   )}
//                 </div>
//                 <input
//                   id="image"
//                   type="file"
//                   name="image"
//                   accept="image/png, image/jpeg, image/jpg"
//                   onChange={handleFileChange}
//                   className="hidden"
//                 />
//               </label>
//             </div>

//             {/* Tombol Submit */}
//             <div className="col-span-2">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-5 py-3 bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-lg shadow-sm hover:from-teal-800 hover:to-cyan-700 font-medium flex items-center gap-2"
//               >
//                 {loading && <Loader2 className="animate-spin w-4 h-4" />}
//                 Simpan Paket Tour
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//     </ProtectedRoute>
//   );
// }


// // "use client";

// // import { useState, DragEvent } from "react";
// // import axios from "axios";
// // import Sidebar from "@/app/components/admin/sidebar";
// // import { Loader2, Upload } from "lucide-react";
// // import { useAuth } from "@/app/services/Auth";

// // interface PaketTourFormData {
// //   title: string;
// //   slug: string;
// //   description: string;
// //   price: string;
// //   stock: string;
// //   location: string;
// //   image: File | null;
// //   active: boolean;
// // }

// // export default function InputPaketTourPage() {
// //   const { token } = useAuth();
// //   const [loading, setLoading] = useState(false);
// //   const [dragActive, setDragActive] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   const [formData, setFormData] = useState<PaketTourFormData>({
// //     title: "",
// //     slug: "",
// //     description: "",
// //     price: "",
// //     stock: "",
// //     location: "",
// //     image: null,
// //     active: true,
// //   });

// //   // 🧠 Handle text inputs
// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value, type } = e.target;
// //     const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

// //     // kalau title berubah, auto generate slug
// //     if (name === "title") {
// //       const slugValue = value
// //         .toLowerCase()
// //         .trim()
// //         .replace(/\s+/g, "-")
// //         .replace(/[^a-z0-9-]/g, "");
// //       setFormData({ ...formData, title: value, slug: slugValue });
// //     } else {
// //       setFormData({ ...formData, [name]: val });
// //     }
// //   };

// //   // 🖼️ Validasi file upload
// //   const handleFile = (file: File) => {
// //     const validTypes = ["image/jpeg", "image/jpg", "image/png"];
// //     const maxSize = 2 * 1024 * 1024; // 2MB

// //     if (!validTypes.includes(file.type)) {
// //       setError("Format gambar hanya boleh JPG atau PNG.");
// //       setFormData({ ...formData, image: null });
// //       return;
// //     }

// //     if (file.size > maxSize) {
// //       setError("Ukuran gambar maksimal 2MB.");
// //       setFormData({ ...formData, image: null });
// //       return;
// //     }

// //     setError(null);
// //     setFormData({ ...formData, image: file });
// //   };

// //   // 📂 Handle input file biasa
// //   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (file) handleFile(file);
// //   };

// //   // 🎯 Drag & drop area
// //   const handleDrag = (e: DragEvent<HTMLLabelElement>) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
// //     else if (e.type === "dragleave") setDragActive(false);
// //   };

// //   const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
// //     e.preventDefault();
// //     e.stopPropagation();
// //     setDragActive(false);
// //     const file = e.dataTransfer.files?.[0];
// //     if (file) handleFile(file);
// //   };

// //   // 🚀 Submit form
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!token) {
// //       alert("❌ Kamu belum login!");
// //       return;
// //     }

// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const data = new FormData();
// //      Object.entries(formData).forEach(([key, value]) => {
// //   if (value instanceof File) {
// //     data.append(key, value);
// //   } else if (key === "active") {
// //     data.append(key, value ? "1" : "0"); // ✅ Laravel expects 1 or 0 for boolean
// //   } else {
// //     data.append(key, String(value));
// //   }
// // });

// //       console.log("🔹 Data yang dikirim ke API:");
// //       for (const [key, val] of data.entries()) {
// //         console.log(`   ${key}:`, val);
// //       }

// //       console.log("🔑 Token:", token);

// //       const response = await axios.post(
// //         "http://127.0.0.1:8000/api/admin/paket-tours",
// //         data,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "Content-Type": "multipart/form-data",
// //           },
// //         }
// //       );

// //       console.log("✅ Response dari server:", response.data);
// //       alert("✅ Paket Tour berhasil ditambahkan!");

// //       setFormData({
// //         title: "",
// //         slug: "",
// //         description: "",
// //         price: "",
// //         stock: "",
// //         location: "",
// //         image: null,
// //         active: true,
// //       });
// //     } catch (error) {
// //   if (axios.isAxiosError(error)) {
// //     console.error("❌ Axios Error:", error.response?.data);
// //     console.error("🔸 Status:", error.response?.status);
// //     console.error("🔸 Headers:", error.response?.headers);
    
// //     // Tampilkan error Laravel lebih jelas
// //     if (error.response?.data?.errors) {
// //       console.error("🧩 Laravel validation errors:");
// //       for (const [field, messages] of Object.entries(error.response.data.errors)) {
// //         console.error(`   ${field}: ${(messages as string[]).join(", ")}`);
// //       }
// //     } else {
// //       console.error("🧾 Response message:", error.response?.data?.message);
// //     }
// //   } else {
// //     console.error("❌ Unexpected error:", error);
// //   }

// //   alert("❌ Gagal menambah paket tour. Lihat console untuk detail error.");
// // }
// //  finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="flex">
// //       <Sidebar isOpen={true} onClose={() => {}} />
// //       <main className="flex-1 bg-slate-50 min-h-screen p-8">
// //         <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200">
// //           <h1 className="text-2xl font-semibold mb-6 text-gray-800">
// //             Input Paket Tour
// //           </h1>

// //           <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
// //             {/* Judul */}
// //             <div>
// //               <label className="block text-sm mb-1 text-gray-800 font-medium">
// //                 Judul Paket
// //               </label>
// //               <input
// //                 name="title"
// //                 value={formData.title}
// //                 onChange={handleChange}
// //                 className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
// //                 placeholder="Masukkan nama paket"
// //                 required
// //               />
// //             </div>

// //             {/* Slug */}
// //             <div>
// //               <label className="block text-sm mb-1 text-gray-800 font-medium">
// //                 Slug (otomatis)
// //               </label>
// //               <input
// //                 name="slug"
// //                 value={formData.slug}
// //                 onChange={handleChange}
// //                 className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none bg-gray-50"
// //                 readOnly
// //               />
// //             </div>

// //             {/* Deskripsi */}
// //             <div className="col-span-2">
// //               <label className="block text-sm mb-1 text-gray-800 font-medium">
// //                 Deskripsi
// //               </label>
// //               <textarea
// //                 name="description"
// //                 value={formData.description}
// //                 onChange={handleChange}
// //                 className="w-full h-28 border border-slate-400 rounded-md px-3 py-3 outline-none"
// //                 placeholder="Masukkan deskripsi paket wisata..."
// //                 required
// //               />
// //             </div>

// //             {/* Harga */}
// //             <div>
// //               <label className="block text-sm mb-1 text-gray-800 font-medium">
// //                 Harga (Rp)
// //               </label>
// //               <input
// //                 name="price"
// //                 value={formData.price}
// //                 onChange={handleChange}
// //                 type="number"
// //                 className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
// //                 placeholder="Masukkan harga"
// //                 required
// //               />
// //             </div>

// //             {/* Stok */}
// //             <div>
// //               <label className="block text-sm mb-1 text-gray-800 font-medium">
// //                 Stok
// //               </label>
// //               <input
// //                 name="stock"
// //                 value={formData.stock}
// //                 onChange={handleChange}
// //                 type="number"
// //                 className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
// //                 placeholder="Masukkan stok"
// //                 required
// //               />
// //             </div>

// //             {/* Lokasi */}
// //             <div>
// //               <label className="block text-sm mb-1 text-gray-800 font-medium">
// //                 Lokasi
// //               </label>
// //               <input
// //                 name="location"
// //                 value={formData.location}
// //                 onChange={handleChange}
// //                 className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
// //                 placeholder="Masukkan lokasi"
// //                 required
// //               />
// //             </div>

// //             {/* Status Aktif */}
// //             <div className="flex items-center gap-3 mt-6">
// //               <input
// //                 type="checkbox"
// //                 name="active"
// //                 checked={formData.active}
// //                 onChange={handleChange}
// //               />
// //               <label className="text-gray-700">Aktifkan Paket Tour</label>
// //             </div>

// //             {/* Upload Gambar */}
// //             <div className="col-span-2">
// //               <label
// //                 htmlFor="image"
// //                 onDragEnter={handleDrag}
// //                 onDragOver={handleDrag}
// //                 onDragLeave={handleDrag}
// //                 onDrop={handleDrop}
// //                 className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition ${
// //                   dragActive ? "border-cyan-700" : "text-cyan-700"
// //                 }`}
// //               >
// //                 <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-xl">
// //                   <Upload className="w-8 h-8 text-cyan-700 mb-3" />
// //                   <p className="text-md text-gray-800">
// //                     <span className="font-semibold bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent">
// //                       Klik untuk upload
// //                     </span>{" "}
// //                     atau drag & drop
// //                   </p>
// //                   <p className="text-sm text-slate-500 mt-1">
// //                     JPG, JPEG, PNG (MAX. 2MB)
// //                   </p>
// //                   {formData.image && (
// //                     <p className="mt-3 text-sm text-teal-700 font-medium">
// //                       📁 {formData.image.name}
// //                     </p>
// //                   )}
// //                   {error && (
// //                     <p className="text-red-600 text-xs mt-2">{error}</p>
// //                   )}
// //                 </div>
// //                 <input
// //                   id="image"
// //                   type="file"
// //                   name="image"
// //                   accept="image/png, image/jpeg, image/jpg"
// //                   onChange={handleFileChange}
// //                   className="hidden"
// //                 />
// //               </label>
// //             </div>

// //             {/* Tombol Submit */}
// //             <div className="col-span-2">
// //               <button
// //                 type="submit"
// //                 disabled={loading}
// //                 className="px-5 py-3 bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-lg shadow-sm hover:from-teal-800 hover:to-cyan-700 font-medium flex items-center gap-2"
// //               >
// //                 {loading && <Loader2 className="animate-spin w-4 h-4" />}
// //                 Simpan Paket Tour
// //               </button>
// //             </div>
// //           </form>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }
