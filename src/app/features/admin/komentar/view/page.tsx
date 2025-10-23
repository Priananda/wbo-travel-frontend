"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/app/components/admin/sidebar";
import { Loader2 } from "lucide-react";
import { Search } from "lucide-react";

interface Comment {
  id: number;
  blog: { title: string };
  user: { name: string };
  content: string;
  created_at: string;
}

export default function ViewKomentarPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/comments")
      .then((res) => setComments(res.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-1 bg-gray-50 min-h-screen">
        <div className="px-4 mt-4">
          <h1 className="text-2xl font-semibold mb-6 drop-shadow-xs"> Komentar User</h1>

          <div className="relative mb-4 w-full">
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Cari komentar..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
              />
            </div>

           <div className="bg-white rounded-md shadow-md overflow-hidden border border-slate-200">
        <table className="min-w-full text-sm text-left text-gray-700 border-collapse">
          <thead className="text-xs uppercase bg-cyan-800 text-white">
            <tr>
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">Nama User</th>
              <th className="px-4 py-3">Judul Blog</th>
              <th className="px-4 py-3">Komentar</th>
              <th className="px-4 py-3">Tanggal</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6">
                  <Loader2 className="animate-spin mx-auto text-cyan-700" />
                </td>
              </tr>
            ) : comments.length > 0 ? (
              comments.map((c, i) => (
                <tr
                  key={c.id}
                  className="border-b border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
                >
                  <td className="px-4 py-3">{i + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {c.user?.name || "Anonim"}
                  </td>
                  <td className="px-4 py-3 max-w-[180px] line-clamp-2">
                    {c.blog?.title || "-"}
                  </td>
                  <td className="px-4 py-3 max-w-[300px] line-clamp-2">
                    {c.content || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(c.created_at).toLocaleDateString("id-ID")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 italic"
                >
                  Belum ada komentar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

        </div>
      </main>
    </div>
  );
}




// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Sidebar from "@/app/components/admin/sidebar";

// interface Comment {
//   id: number;
//   blog: { title: string };
//   user: { name: string };
//   content: string;
//   created_at: string;
// }

// export default function ViewKomentarPage() {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/comments")
//       .then((res) => setComments(res.data.data || []))
//       .finally(() => setLoading(false));
//   }, []);

//   return (
//     <div className="flex">
//       <Sidebar />
//       <main className="flex-1 ml-64 p-8 bg-gray-50 min-h-screen">
//         <div className="bg-white p-8 rounded-2xl shadow">
//           <h2 className="text-2xl font-semibold mb-6">💬 View Komentar User</h2>

//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-gray-700 border">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="p-3">#</th>
//                     <th className="p-3">Nama User</th>
//                     <th className="p-3">Blog</th>
//                     <th className="p-3">Komentar</th>
//                     <th className="p-3">Tanggal</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {comments.length > 0 ? (
//                     comments.map((c, i) => (
//                       <tr key={c.id} className="border-t">
//                         <td className="p-3">{i + 1}</td>
//                         <td className="p-3 font-medium">
//                           {c.user?.name || "Anonim"}
//                         </td>
//                         <td className="p-3">{c.blog?.title}</td>
//                         <td className="p-3">{c.content}</td>
//                         <td className="p-3">
//                           {new Date(c.created_at).toLocaleString("id-ID")}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={5} className="text-center p-6 text-gray-500">
//                         Belum ada komentar.
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }
