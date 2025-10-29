"use client";

import { useEffect, useState } from "react";
import { Trash2, Loader2, Search } from "lucide-react";
import { api, adminApi  } from "@/app/api/api";
import AlertComment from "@/app/components/userAdminModal/page";
interface Comment {
  id: number;
  blog?: { title?: string };
  user?: { name?: string };
  content?: string;
  created_at?: string;
}
interface AlertModalState {
  show: boolean;
  title: string;
  message: string;
  onClose: () => void;
  showConfirm?: boolean; // tombol "Iya / Tidak"
  onConfirm?: () => void; // aksi kalau klik "Iya"
}


export default function ViewKomentarPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [alertModal, setAlertModal] = useState<AlertModalState>({ show: false, title: "", message: "", onClose: () => {},});

  const fetchComments = async () => {
    try {
      const res = await api.get("/comments");
      setComments(res.data.data || []);
    } catch (err) {
      console.error("Gagal ambil komentar:", err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // handleDelete 
  const handleDelete = (id: number) => {
    setAlertModal({
    show: true,
    title: "Konfirmasi Hapus",
    message: "Apakah kamu yakin ingin menghapus komentar ini?",
    onClose: () => setAlertModal((prev) => ({ ...prev, show: false })),
    showConfirm: true,
    onConfirm: async () => {
      // Tutup modal konfirmasi
      setAlertModal((prev) => ({ ...prev, show: false }));

        try {
          await adminApi.delete(`/comments/${id}`);
          fetchComments();

          // Tampilkan modal sukses
          setAlertModal({
            show: true,
            title: "Berhasil",
            message: "Komentar berhasil dihapus!",
            onClose: () =>
              setAlertModal((prev) => ({ ...prev, show: false })),
          });
        } catch (err) {
          console.error("Gagal hapus komentar:", err);

          // Tampilkan modal error
          setAlertModal({
            show: true,
            title: "Gagal Menghapus",
            message: "Terjadi kesalahan saat menghapus komentar.",
            onClose: () =>
              setAlertModal((prev) => ({ ...prev, show: false })),
          });
        }
      },
    });
  };


  // Filter komentar berdasarkan label
  const filteredComments = comments.filter((comment) => {
    const search = searchTerm.toLowerCase();
    return (
      comment.user?.name?.toLowerCase().includes(search) ||
      comment.blog?.title?.toLowerCase().includes(search) ||
      comment.content?.toLowerCase().includes(search)
    );
  });

  return (
    <div className="flex">

      <main className="flex-1 p-1 bg-gray-50 min-h-screen">
        <div className="px-4 mt-4">
          <h1 className="text-2xl font-semibold mb-6 drop-shadow-xs">
            Komentar User
          </h1>

          {/* 🔍 Input pencarian */}
          <div className="relative mb-4 w-full max-w-md">
            <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari user, komentar, atau judul blog..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
            />
          </div>

          {/* 🔹 Tabel Komentar */}
          <div className="bg-white rounded-md shadow-md overflow-hidden overflow-x-auto border border-slate-200 scroll-hidden">
            <table className="min-w-full text-sm text-left text-gray-700 border-collapse">
              <thead className="text-xs uppercase bg-cyan-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-center">No</th>
                  <th className="px-4 py-3">Nama User</th>
                  <th className="px-4 py-3">Judul Blog</th>
                  <th className="px-4 py-3">Isi Komentar</th>
                  <th className="px-4 py-3 text-center">Tanggal</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-6">
                      <Loader2 className="animate-spin mx-auto text-cyan-700" />
                    </td>
                  </tr>
                ) : filteredComments.length > 0 ? (
                  filteredComments.map((c, i) => (
                    <tr
                      key={c.id}
                      className="border-b border-slate-200 hover:bg-slate-50 text-gray-800 transition-colors"
                    >
                      <td className="px-4 py-3 text-center align-top">{i + 1}</td>
                      <td className="px-4 py-3 font-medium align-top">
                        {c.user?.name || "Anonim"}
                      </td>
                      <td className="px-4 py-3 max-w-[280px] whitespace-normal break-words align-top">
                        {c.blog?.title || "-"}
                      </td>
                      <td className="px-4 py-3 max-w-[300px] align-top">
                        {c.content || "-"}
                      </td>
                      <td className="px-4 py-3 text-center align-top">
  {c.created_at
    ? new Date(c.created_at).toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, 
        timeZone: "Asia/Jakarta", 
      })
    : "-"}
</td>


                      {/* 🔹 Tombol aksi */}
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="bg-white shadow-sm border border-slate-200 p-2 rounded-lg text-red-600 hover:bg-red-50 hover:shadow-md transition-all duration-200"
                            title="Hapus Komentar"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-6 text-gray-500 italic">
                      Tidak ada komentar yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
       <AlertComment
        show={alertModal.show}
        title={alertModal.title}
        message={alertModal.message}
        onClose={alertModal.onClose}
        showConfirm={alertModal.showConfirm}
  onConfirm={alertModal.onConfirm}
      />
    </div>
  );
}
