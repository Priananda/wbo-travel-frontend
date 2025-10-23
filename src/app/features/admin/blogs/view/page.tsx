"use client";

import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import Sidebar from "@/app/components/admin/sidebar";
import { Pencil, Trash2, Loader2, Search, X } from "lucide-react";
import { useAuth } from "@/app/services/Auth";
import ProtectedRoute from "@/app/middleware/ProtectedRoute";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Blog {
  id: number;
  title: string;
  slug?: string;
  category?: string;
  author_email?: string;
  content?: string;
  image?: string;
  created_at?: string;
}

export default function ViewBlogPage() {
  const { token } = useAuth();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const apiUrl = "http://127.0.0.1:8000/api/admin/blogs";

  // 🔹 Ambil semua blog
  const fetchBlogs = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data.data || res.data);
    } catch (err) {
      console.error("Gagal ambil data:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Ambil 1 blog untuk diedit
  const handleEdit = async (id: number) => {
    if (!token) return;
    try {
      const res = await axios.get(`${apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditBlog(res.data.data || res.data);
    } catch (err) {
      console.error("Gagal ambil detail blog:", err);
    }
  };

  // 🔹 Fungsi handleEditChange (otomatis update slug)
  const handleEditChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    if (!editBlog) return;

    const target = e.target;

    // Fungsi pembuat slug
    const generateSlug = (text: string) =>
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

    // Jika input checkbox (jika ada di masa depan)
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setEditBlog({
        ...editBlog,
        [target.name]: target.checked as any,
      });
      return;
    }

    const { name, value } = target;

    // Jika sedang mengubah title → ubah juga slug otomatis
    if (name === "title") {
      setEditBlog({
        ...editBlog,
        title: value,
        slug: generateSlug(value),
      });
    } else {
      setEditBlog({
        ...editBlog,
        [name]: value,
      });
    }
  };

  // 🔹 Simpan perubahan blog
  const handleSave = async () => {
    if (!editBlog || !token) return;
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", editBlog.title);
      formData.append("slug", editBlog.slug || "");
      formData.append("category", editBlog.category || "");
      formData.append("content", editBlog.content || "");
      if (newImage) formData.append("image", newImage);

      const res = await axios.post(
        `${apiUrl}/${editBlog.id}?_method=PUT`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update berhasil:", res.data);
      alert("Perubahan berhasil disimpan!");
      setEditBlog(null);
      setNewImage(null);
      fetchBlogs();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Gagal update blog:", err.response?.data || err.message);
        alert(
          err.response?.data?.message ||
            JSON.stringify(err.response?.data.errors) ||
            "Gagal menyimpan perubahan!"
        );
      } else {
        console.error("Error tak terduga:", err);
        alert("Terjadi kesalahan tak terduga.");
      }
    } finally {
      setSaving(false);
    }
  };

  // 🔹 Hapus blog
  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus blog ini?")) return;
    if (!token) return;
    try {
      await axios.delete(`${apiUrl}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBlogs();
    } catch (err) {
      console.error("Gagal hapus:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [token]);

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex bg-white">
        <Sidebar />

       <main className="flex-1 mt-4 p-1 mx-auto overflow-y-auto overflow-x-hidden min-w-0">
  <div className="max-w-6xl px-4">
    <h1 className="text-2xl font-semibold mb-6 text-gray-800 drop-shadow-xs">View Blog</h1>

    {/* 🔍 Search Bar */}
    <div className="relative mb-4">
      <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
      <input
        type="text"
        placeholder="Cari blog..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
      />
    </div>

    {/* 📋 Tabel Data */}
    <div className="bg-white rounded-md shadow-md overflow-hidden border border-slate-200">
      <table className="min-w-full text-sm text-left text-gray-700 border-collapse">
        <thead className="text-xs uppercase bg-cyan-800 text-white">
          <tr>
            <th className="px-4 py-3">No</th>
            <th className="px-4 py-3">Judul</th>
            <th className="px-4 py-3">Slug</th>
            <th className="px-4 py-3">Kategori</th>
            <th className="px-4 py-3">Penulis</th>
            <th className="px-4 py-3">Isi Blog</th>
            <th className="px-4 py-3">Tanggal</th>
            <th className="px-4 py-3">Gambar</th>
            <th className="px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={9} className="text-center py-6">
                <Loader2 className="animate-spin mx-auto text-cyan-700" />
              </td>
            </tr>
          ) : filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog, i) => (
              <tr
                key={blog.id}
                className="border-b border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
              >
                <td className="px-4 py-3">{i + 1}</td>

                {/* Judul: batasi panjang */}
                <td className="px-4 py-3 max-w-[180px] line-clamp-2">
                  {blog.title}
                </td>

                <td className="px-4 py-3">{blog.slug || "-"}</td>
                <td className="px-4 py-3">{blog.category || "-"}</td>
                <td className="px-4 py-3">{blog.author_email || "-"}</td>

                {/* Isi Blog: tampil 2 baris saja */}
                <td className="px-4 py-3 max-w-[250px] line-clamp-2">
                  {blog.content || "-"}
                </td>

                <td className="px-4 py-3">
                  {blog.created_at
                    ? new Date(blog.created_at).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-4 py-3">
                  {blog.image ? (
                    <Image
                      src={`http://127.0.0.1:8000/storage/${blog.image}`}
                      alt={blog.title}
                      width={70}
                      height={50}
                      className="rounded-md object-cover border border-slate-300"
                      unoptimized
                    />
                  ) : (
                    "-"
                  )}
                </td>

                <td className="px-4 py-3 text-right flex gap-2 justify-end">
                  <button
                    onClick={() => handleEdit(blog.id)}
                    className="flex items-center gap-1 px-3 py-1 border border-cyan-700 text-cyan-700 rounded-md hover:bg-cyan-700 hover:text-white transition"
                  >
                    <Pencil size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="flex items-center gap-1 px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-600 hover:text-white transition"
                  >
                    <Trash2 size={16} /> Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={9}
                className="text-center py-6 text-gray-500 italic"
              >
                Tidak ada data blog ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</main>


        {/* ✏️ Modal Edit */}
        <AnimatePresence>
          {editBlog && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setEditBlog(null)}
              />

              <motion.div
                className="fixed z-50 inset-0 flex items-center justify-end p-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="bg-white rounded-2xl shadow-md border border-gray-200 w-full max-w-4xl p-6 relative">
                  <button
                    onClick={() => setEditBlog(null)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>

                  <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>

                  {/* Form Edit */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Judul
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={editBlog.title}
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
                          value={editBlog.slug || ""}
                          onChange={handleEditChange}
                          className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                          readOnly
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Kategori
                        </label>
                        <input
                          type="text"
                          name="category"
                          value={editBlog.category || ""}
                          onChange={handleEditChange}
                          className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                        />
                      </div>

                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Isi Blog
                        </label>
                        <textarea
                          name="content"
                          rows={4}
                          value={editBlog.content || ""}
                          onChange={handleEditChange}
                          className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                          Gambar Baru
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setNewImage(
                              e.target.files ? e.target.files[0] : null
                            )
                          }
                          className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
                        />
                      </div>

                      {editBlog.image && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Preview Gambar Saat Ini
                          </label>
                          <Image
                            src={`http://127.0.0.1:8000/storage/${editBlog.image}`}
                            alt="Preview"
                            width={400}
                            height={192}
                            className="mt-2 object-cover rounded-lg border"
                            unoptimized
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end mt-6 gap-3">
                    <button
                      onClick={() => setEditBlog(null)}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 rounded-lg bg-cyan-700 text-white hover:bg-cyan-800 disabled:opacity-50"
                    >
                      {saving ? "Menyimpan..." : "Simpan Perubahan"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </ProtectedRoute>
  );
}




// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "@/app/components/admin/sidebar";
// import { Pencil, Trash2, Loader2, Search, X } from "lucide-react";
// import { useAuth } from "@/app/services/Auth";
// import ProtectedRoute from "@/app/middleware/ProtectedRoute";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";

// interface Blog {
//   id: number;
//   title: string;
//   slug?: string;
//   category?: string;
//   author_email?: string;
//   content?: string;
//   image?: string;
//   created_at?: string;
// }

// export default function ViewBlogPage() {
//   const { token, user } = useAuth();
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [editBlog, setEditBlog] = useState<Blog | null>(null);
//   const [newImage, setNewImage] = useState<File | null>(null);
//   const [saving, setSaving] = useState(false);

//   const apiUrl = "http://127.0.0.1:8000/api/admin/blogs"; // pastikan cocok dengan routes Laravel kamu

//   // 🔹 Ambil semua blog
//   const fetchBlogs = async () => {
//     if (!token) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(apiUrl, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setBlogs(res.data.data || res.data);
//     } catch (err) {
//       console.error("Gagal ambil data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Ambil 1 blog untuk diedit
//   const handleEdit = async (id: number) => {
//     if (!token) return;
//     try {
//       const res = await axios.get(`${apiUrl}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEditBlog(res.data.data || res.data);
//     } catch (err) {
//       console.error("Gagal ambil detail blog:", err);
//     }
//   };

//   // 🔹 Simpan perubahan blog
// const handleSave = async () => {
//   if (!editBlog || !token) return;
//   setSaving(true);

//   try {
//     const formData = new FormData();
//     formData.append("title", editBlog.title);
//     formData.append("category", editBlog.category || "");
//     formData.append("content", editBlog.content || "");
//     if (newImage) formData.append("image", newImage);

//     // 💡 Kuncinya: pakai POST + _method=PUT
//     const res = await axios.post(
//       `${apiUrl}/${editBlog.id}?_method=PUT`,
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     console.log("Update berhasil:", res.data);
//     alert("Perubahan berhasil disimpan!");
//     setEditBlog(null);
//     setNewImage(null);
//     fetchBlogs();
//   } catch (err) {
//     if (axios.isAxiosError(err)) {
//       console.error("Gagal update blog:", err.response?.data || err.message);
//       alert(
//         err.response?.data?.message ||
//           JSON.stringify(err.response?.data.errors) ||
//           "Gagal menyimpan perubahan!"
//       );
//     } else {
//       console.error("Error tak terduga:", err);
//       alert("Terjadi kesalahan tak terduga.");
//     }
//   } finally {
//     setSaving(false);
//   }
// };



//   // 🔹 Hapus blog
//   const handleDelete = async (id: number) => {
//     if (!confirm("Yakin ingin menghapus blog ini?")) return;
//     if (!token) return;
//     try {
//       await axios.delete(`${apiUrl}/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchBlogs();
//     } catch (err) {
//       console.error("Gagal hapus:", err);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, [token]);

//   const filteredBlogs = blogs.filter((b) =>
//     b.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <ProtectedRoute allowedRoles={["admin"]}>
//       <div className="flex bg-white overflow-hidden">
//         <Sidebar />

//         <main className="flex-1 mt-5 mx-auto overflow-y-auto overflow-x-hidden min-w-0">
//           <div className="max-w-6xl px-4">
//             <h1 className="text-2xl font-semibold mb-6 text-gray-800">View Blog</h1>


//             {/* 🔍 Search Bar */}
//             <div className="relative mb-4 max-w-xs">
//               <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
//               <input
//                 type="text"
//                 placeholder="Cari blog..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-cyan-700"
//               />
//             </div>

//             {/* 📋 Tabel Data */}
//             <div className="bg-white rounded-lg w-full overflow-x-auto">
//               <table className="min-w-full text-sm text-left text-gray-600 border-collapse">
//                 <thead className="text-xs uppercase bg-gray-50 border-b border-slate-300 text-black">
//                   <tr>
//                     <th className="px-4 py-3">No</th>
//                     <th className="px-4 py-3">Judul</th>
//                     <th className="px-4 py-3">Kategori</th>
//                     <th className="px-4 py-3">Penulis</th>
//                     <th className="px-4 py-3">Slug</th>
//                     <th className="px-4 py-3">Isi Blog</th>
//                     <th className="px-4 py-3">Tanggal</th>
//                     <th className="px-4 py-3">Gambar</th>
//                     <th className="px-4 py-3 text-center">Aksi</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {loading ? (
//                     <tr>
//                       <td colSpan={7} className="text-center py-6">
//                         <Loader2 className="animate-spin mx-auto text-cyan-700" />
//                       </td>
//                     </tr>
//                   ) : filteredBlogs.length > 0 ? (
//                     filteredBlogs.map((blog, i) => (
//                       <tr
//                         key={blog.id}
//                         className="border-b border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
//                       >
//                         <td className="px-4 py-4">{i + 1}</td>
//                         <td className="px-4 py-4">{blog.title}</td>
//                         <td className="px-4 py-4">{blog.category || "-"}</td>
//                         <td className="px-4 py-4">{blog.author_email || "-"}</td>
//                                <td className="px-4 py-4">{blog.slug || "-"}</td>
//                         <td className="px-4 py-4">{blog.content || "-"}</td>
//                         <td className="px-4 py-4">
//                           {blog.created_at
//                             ? new Date(blog.created_at).toLocaleDateString()
//                             : "-"}
//                         </td>
//                         <td className="px-4 py-4">
//                           {blog.image ? (
//                             <Image
//                               src={`http://127.0.0.1:8000/storage/${blog.image}`}
//                               alt={blog.title}
//                               width={60}
//                               height={40}
//                               className="rounded-md object-cover border"
//                               unoptimized
//                             />
//                           ) : (
//                             "-"
//                           )}
//                         </td>
//                         <td className="px-4 py-4 text-right flex gap-2 justify-end">
//                           <button
//                             onClick={() => handleEdit(blog.id)}
//                             className="flex items-center gap-1 px-3 py-1 border border-cyan-700 text-cyan-700 rounded-md hover:bg-cyan-700 hover:text-white transition"
//                           >
//                             <Pencil size={16} /> Edit
//                           </button>
//                           <button
//                             onClick={() => handleDelete(blog.id)}
//                             className="flex items-center gap-1 px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-600 hover:text-white transition"
//                           >
//                             <Trash2 size={16} /> Hapus
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={7} className="text-center py-6 text-gray-500 italic">
//                         Tidak ada data blog ditemukan.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>

//        {/* ✏️ Modal Edit */}
// <AnimatePresence>
//   {editBlog && (
//     <>
//       <motion.div
//         className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         onClick={() => setEditBlog(null)}
//       />

//       <motion.div
//         className="fixed z-50 inset-0 flex items-center justify-end p-4"
//         initial={{ scale: 0.8, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.8, opacity: 0 }}
//       >
//         <div className="bg-white rounded-2xl shadow-md border border-gray-200 w-full max-w-4xl p-6 relative">
//           <button
//             onClick={() => setEditBlog(null)}
//             className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
//           >
//             <X size={20} />
//           </button>

//           <h2 className="text-xl font-semibold mb-4">Edit Blog</h2>

//           {/* Grid 2 kolom */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Kolom Kiri */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   Judul
//                 </label>
//                 <input
//                   type="text"
//                   value={editBlog.title}
//                   onChange={(e) =>
//                     setEditBlog({ ...editBlog, title: e.target.value })
//                   }
//                   className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   Slug
//                 </label>
//                 <input
//                   type="text"
//                   value={editBlog.slug}
//                   onChange={(e) =>
//                     setEditBlog({ ...editBlog, slug: e.target.value })
//                   }
//                   className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   Kategori
//                 </label>
//                 <input
//                   type="text"
//                   value={editBlog.category || ""}
//                   onChange={(e) =>
//                     setEditBlog({ ...editBlog, category: e.target.value })
//                   }
//                   className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   Isi Blog
//                 </label>
//                 <textarea
//                   rows={4}
//                   value={editBlog.content || ""}
//                   onChange={(e) =>
//                     setEditBlog({ ...editBlog, content: e.target.value })
//                   }
//                   className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
//                 />
//               </div>
//             </div>

//             {/* Kolom Kanan */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block mb-2 text-sm font-medium text-gray-700">
//                   Gambar Baru
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) =>
//                     setNewImage(e.target.files ? e.target.files[0] : null)
//                   }
//                   className="w-full border border-slate-400 rounded-md px-3 py-3 outline-none"
//                 />
//               </div>

//               {/* Bisa tambahkan preview gambar */}
//               {editBlog.image && (
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Preview Gambar Saat Ini
//                   </label>
//                   <Image
//                   src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${
//                   editBlog.image.startsWith('blogs/')
//                   ? editBlog.image
//                   : `blogs/${editBlog.image}`
//                   }`}
//                   alt="Preview"
//                   width={400}
//                   height={192}
//                   className="mt-2 object-cover rounded-lg border"
//                   />





//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-end mt-6 gap-3">
//             <button
//               onClick={() => setEditBlog(null)}
//               className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
//             >
//               Batal
//             </button>
//             <button
//               onClick={handleSave}
//               disabled={saving}
//               className="px-4 py-2 rounded-lg bg-cyan-700 text-white hover:bg-cyan-800 disabled:opacity-50"
//             >
//               {saving ? "Menyimpan..." : "Simpan Perubahan"}
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </>
//   )}
// </AnimatePresence>

//       </div>
//     </ProtectedRoute>
//   );
// }



// // "use client";

// // import { useEffect, useState } from "react";
// // import axios from "axios";
// // import Sidebar from "@/app/components/admin/sidebar";
// // import { Pencil, Trash2, Loader2, Search } from "lucide-react";
// // import { useAuth } from "@/app/services/Auth";
// // import ProtectedRoute from "@/app/middleware/ProtectedRoute";
// // import Image from "next/image";

// // interface Blog {
// //   id: number;
// //   title: string;
// //   slug: string;
// //   category?: string;
// //   author_email?: string;
// //   content?: string;
// //   image?: string;
// //   status?: string;
// //   created_at?: string;
// // }

// // export default function ViewBlogPage() {
// //   const { token, user } = useAuth();
// //   const [blogs, setBlogs] = useState<Blog[]>([]);
// //   const [loading, setLoading] = useState(false);
// //   const [search, setSearch] = useState("");

// //   const apiUrl = "http://127.0.0.1:8000/api/admin/blogs";

// //   const fetchBlogs = async () => {
// //     if (!token) return;
// //     setLoading(true);
// //     try {
// //       const res = await axios.get(apiUrl, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setBlogs(res.data.data || res.data);
// //     } catch (err) {
// //       console.error("Gagal ambil data:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleDelete = async (id: number) => {
// //     if (!confirm("Yakin ingin menghapus blog ini?")) return;
// //     if (!token) return;
// //     try {
// //       await axios.delete(`${apiUrl}/${id}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       fetchBlogs();
// //     } catch (err) {
// //       console.error("Gagal hapus:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchBlogs();
// //   }, [token]);

// //   const filteredBlogs = blogs.filter((b) =>
// //     b.title.toLowerCase().includes(search.toLowerCase())
// //   );



// //   return (
// //     <ProtectedRoute allowedRoles={["admin"]}>
// //       <div className="flex  bg-white  overflow-hidden">
// //         {/* Sidebar tetap di kiri */}
// //         <Sidebar />

// //         {/* Konten utama */}
// //         <main className="flex-1 mt-5 mx-auto  overflow-y-auto overflow-x-hidden">
// //           <div className="max-w-5xl">
// //             <h1 className="text-2xl font-semibold mb-6 text-gray-800">View Blog</h1>

// //             {/* TABLE WRAPPER supaya tidak overflow */}
// //             <div className="bg-white shadow-md rounded-lg w-full overflow-x-auto">
// //               <table className="min-w-full text-sm text-left text-gray-600 border-collapse">
// //                 <thead className="text-xs uppercase bg-gray-50 border-b border-slate-300 text-black">
// //                   <tr>
// //                     <th className="px-4 py-3 font-semibold  whitespace-nowrap">
// //                       #
// //                     </th>
// //                     <th className="px-4 py-3 font-semibold whitespace-nowrap">
// //                       Judul
// //                     </th>
// //                     <th className="px-4 py-3 font-semibold whitespace-nowrap">
// //                       Slug
// //                     </th>
// //                     <th className="px-4 py-3 font-semibold whitespace-nowrap">
// //                       Kategori
// //                     </th>
// //                     <th className="px-4 py-3 font-semibold whitespace-nowrap">
// //                       Penulis
// //                     </th>
                   
// //                     <th className="px-4 py-3 font-semibold whitespace-nowrap">
// //                       Dibuat
// //                     </th>
// //                     <th className="px-4 py-3 font-semibold whitespace-nowrap">
// //                       Gambar
// //                     </th>
// //                     <th className="px-4 py-3 font-semibold whitespace-nowrap text-center">
// //                       Aksi
// //                     </th>
// //                   </tr>
// //                 </thead>

// //                 <tbody>
// //                   {loading ? (
// //                     <tr>
// //                       <td colSpan={9} className="text-center py-6">
// //                         <Loader2 className="animate-spin mx-auto text-blue-500" />
// //                       </td>
// //                     </tr>
// //                   ) : filteredBlogs.length > 0 ? (
// //                     filteredBlogs.map((blog, i) => (
// //                       <tr
// //                         key={blog.id}
// //                         className="border-b border-slate-300 hover:bg-slate-50 text-slate-700  transition-colors"
// //                       >
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           {i + 1}
// //                         </td>
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           {blog.title}
// //                         </td>
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           {blog.slug}
// //                         </td>
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           {blog.category || "-"}
// //                         </td>
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           {blog.author_email || "-"}
// //                         </td>
                       
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           {blog.created_at
// //                             ? new Date(blog.created_at).toLocaleDateString()
// //                             : "-"}
// //                         </td>
// //                         <td className="px-4 py-4 whitespace-nowrap">
// //                           {blog.image ? (
// //                             <Image
// //                               src={`http://127.0.0.1:8000/storage/${blog.image}`}
// //                               alt={blog.title}
// //                               width={60}
// //                               height={40}
// //                               className="rounded-md object-cover border"
// //                               unoptimized
// //                             />
// //                           ) : (
// //                             "-"
// //                           )}
// //                         </td>
// //                         <td className="px-4 py-4 text-right whitespace-nowrap flex gap-2 justify-end cursor-pointer">
// //                           <button className="flex items-center gap-1 px-3 py-1 border border-cyan-700 text-cyan-700 rounded-md hover:bg-cyan-700 hover:text-white transition">
// //                             <Pencil size={16} /> Edit
// //                           </button>
// //                           <button
// //                             onClick={() => handleDelete(blog.id)}
// //                             className="flex items-center gap-1 px-3 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-600 hover:text-white transition"
// //                           >
// //                             <Trash2 size={16} /> Hapus
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))
// //                   ) : (
// //                     <tr>
// //                       <td
// //                         colSpan={9}
// //                         className="text-center py-6 text-gray-500 italic"
// //                       >
// //                         Tidak ada data blog ditemukan.
// //                       </td>
// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </main>
// //       </div>
// //     </ProtectedRoute>
// //   );
// // }
