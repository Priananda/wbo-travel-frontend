"use client";

import { useState, DragEvent } from "react";
import axios from "axios";
import { Loader2, Upload } from "lucide-react";
import { useAuth } from "@/app/services/Auth";
import ProtectedRoute from "@/app/middleware/ProtectedRoute";
import { adminApi } from "@/app/api/api";
import AlertInputBlogs from "@/app/components/userAdminModal/page";
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
interface BlogFormData {
  title: string;
  slug: string;
  category: string;
  author_email: string;
  content: string;
  image: File | null;
}

export default function InputBlogPage() {
  const router = useRouter();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModalLoading, setShowModalLoading] = useState(false);
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    category: "",
    author_email: "",
    content: "",
    image: null,
  });
  const [alertModal, setAlertModal] = useState<AlertModalState>({ show: false, title: "", message: "", onClose: () => {},});
  

  //  Fungsi bantu: ubah title jadi slug otomatis
  const generateSlug = (text: string) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  // Handle input text
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Jika field "title" berubah, otomatis isi "slug"
    if (name === "title") {
      setFormData({
        ...formData,
        title: value,
        slug: generateSlug(value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
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

  //  Handle input file biasa
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  //  Handle drag & drop
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

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
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

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) data.append(key, value);
        else if (value) data.append(key, value);
      });

      await adminApi.post("blogs", data, {
          headers: {
          "Content-Type": "multipart/form-data",
          },
        });

      setAlertModal({
        show: true,
        title: "Sukses",
        message: "Blog berhasil ditambahkan!",
        onClose: () => {
        setAlertModal({ ...alertModal, show: false }); 
        setShowModalLoading(true); 
        setTimeout(() => {
        router.push("/features/admin/blogs/view"); 
        setShowModalLoading(false);
        }, 500); 
      },
      });
      setFormData({
        title: "",
        slug: "",
        category: "",
        author_email: "",
        content: "",
        image: null,
      });
    } catch (err) {
      console.error(err);
      setAlertModal({
      show: true,
      title: "Gagal",
      message: "Gagal menambah blog. Lihat console untuk detail error.",
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
      
      <main className="flex-1 min-h-screen md:p-3 lg:p-6">
        <div className="bg-white p-5 md:p-8 lg:p-8 rounded-xl shadow-sm border border-slate-200">
          <h1 className="text-2xl font-semibold mb-6 text-gray-800 drop-shadow-xs">
            Input Blog
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* Judul */}
            <div>
              <label className="block text-md mb-1 text-gray-800 font-medium">
                Judul
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                placeholder="Masukkan judul blog"
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
                className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                placeholder="contoh: tips-wisata-bali"
                required
              />
            </div>

            {/* Kategori */}
            <div>
              <label className="block text-md mb-1 text-gray-800 font-medium">
                Kategori
              </label>
              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                placeholder="Kategori blog"
              />
            </div>

            {/* Email Penulis */}
            <div>
              <label className="block text-md mb-1 text-gray-800 font-medium">
                Email Penulis
              </label>
              <input
                name="author_email"
                value={formData.author_email}
                onChange={handleChange}
                className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                placeholder="email@example.com"
              />
            </div>

            {/* Isi Blog */}
            <div className="col-span-2">
              <label className="block text-md mb-1 text-gray-800 font-medium">
                Isi Blog
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full h-32 border border-slate-400 rounded-md px-3 py-3 outline-none"
                placeholder="Masukkan isi blog"
                required
              />
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
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    JPG, JPEG, PNG (MAX. 2MB)
                  </p>
                  {formData.image && (
                    <p className="mt-3 text-sm text-teal-700 font-medium">
                      📁 {formData.image.name}
                    </p>
                  )}
                  {error && (
                    <p className="text-red-600 text-xs mt-2">{error}</p>
                  )}
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

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-3 bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-lg shadow-sm hover:from-teal-800 hover:to-cyan-700 cursor-pointer font-medium"
              >
                {loading && <Loader2 className="animate-spin w-4 h-4 mr-2 inline" />}
                Simpan Blog
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
    <AlertInputBlogs
    show={alertModal.show}
    title={alertModal.title}
    message={alertModal.message}
    onClose={alertModal.onClose}
    />
    </ProtectedRoute>
  );
}







// "use client";

// import { useState, DragEvent } from "react";
// import axios from "axios";
// import Sidebar from "@/app/components/admin/sidebar";
// import { Loader2, Upload } from "lucide-react";
// import { useAuth } from "@/app/services/Auth";

// interface BlogFormData {
//   title: string;
//   slug: string;
//   category: string;
//   author_email: string;
//   content: string;
//   image: File | null;
// }

// export default function InputBlogPage() {
//   const { token } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [dragActive, setDragActive] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const [formData, setFormData] = useState<BlogFormData>({
//     title: "",
//     slug: "",
//     category: "",
//     author_email: "",
//     content: "",
//     image: null,
//   });

//   // 🧠 Handle input text
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
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

//   // 🎯 Handle drag & drop
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
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!token) {
//       alert("❌ Kamu belum login!");
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         if (value instanceof File) data.append(key, value);
//         else if (value) data.append(key, value);
//       });

//       await axios.post("http://127.0.0.1:8000/api/admin/blogs", data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("✅ Blog berhasil ditambahkan!");
//       setFormData({
//         title: "",
//         slug: "",
//         category: "",
//         author_email: "",
//         content: "",
//         image: null,
//       });
//     } catch (err) {
//       console.error(err);
//       alert("❌ Gagal menambah blog.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="flex-1 bg-slate-50 min-h-screen">
//         <div className="bg-white p-8 rounded-lg shadow-md border border-slate-200">
//           <h1 className="text-2xl font-semibold mb-6 text-gray-800">Input Blog</h1>

//           <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
//             {/* Judul */}
//             <div>
//               <label className="block text-sm mb-1 text-gray-800 font-medium">
//                 Judul
//               </label>
//               <input
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
//                 placeholder="Masukkan judul blog"
//                 required
//               />
//             </div>

//             {/* Slug */}
//             <div>
//               <label className="block text-sm mb-1 text-gray-800 font-medium">
//                 Slug
//               </label>
//               <input
//                 name="slug"
//                 value={formData.slug}
//                 onChange={handleChange}
//                 className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
//                 placeholder="contoh: tips-wisata-bali"
//                 required
//               />
//             </div>

//             {/* Kategori */}
//             <div>
//               <label className="block text-sm mb-1 text-gray-800 font-medium">
//                 Kategori
//               </label>
//               <input
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
//                 placeholder="Kategori blog"
//               />
//             </div>

//             {/* Email Penulis */}
//             <div>
//               <label className="block text-sm mb-1 text-gray-800 font-medium">
//                 Email Penulis
//               </label>
//               <input
//                 name="author_email"
//                 value={formData.author_email}
//                 onChange={handleChange}
//                 className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
//                 placeholder="email@example.com"
//               />
//             </div>

//             {/* Isi Blog */}
//             <div className="col-span-2">
//               <label className="block text-sm mb-1 text-gray-800 font-medium">
//                 Isi Blog
//               </label>
//               <textarea
//                 name="content"
//                 value={formData.content}
//                 onChange={handleChange}
//                 className="w-full h-32 border border-slate-400 rounded-md px-3 py-3 outline-none"
//                 placeholder="Tulis isi blog di sini..."
//                 required
//               />
//             </div>

//             {/* Upload Gambar */}
//             <div className="col-span-2">
//               <label
//                 htmlFor="image"
//                 onDragEnter={handleDrag}
//                 onDragOver={handleDrag}
//                 onDragLeave={handleDrag}
//                 onDrop={handleDrop}
//                 className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition
//                 ${dragActive
//                   ? " border-none"
//                   : "text-cyan-700 p-[2px]"
//                 }`}
//               >
//                 <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-xl">
//                   <Upload className="w-8 h-8 text-cyan-700 mb-3" />
//                   <p className="text-md text-gray-800">
//                   <span className="font-semibold bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent">
//                     Click to upload
//                     </span>{' '}
//                     or drag and drop
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

//             {/* Submit Button */}
//             <div className="col-span-2">
//   <button
//     type="submit"
//     disabled={loading}
//     className="px-5 py-3 bg-gradient-to-r from-teal-600 to-cyan-700 text-white rounded-lg shadow-sm hover:from-teal-800 hover:to-cyan-700 cursor-pointer font-medium "
//   >
//     {loading && <Loader2 className="animate-spin w-4 h-4" />}
//     Simpan Blog
//   </button>
// </div>

//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }
