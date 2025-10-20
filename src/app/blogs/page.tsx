"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Calendar, Folder, User, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type Blog = {
  id: number;
  title: string;
  slug: string;
  content: string;
  image?: string;
  category?: string;
  author_email?: string;
  published_at?: string;
};

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [commentsCount, setCommentsCount] = useState<Record<number, number>>({});
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/blogs").then(async (res) => {
      const data = res.data.data;
      setBlogs(data);

      if (searchTerm) {
        const filtered = data.filter((b: Blog) =>
          b.title.toLowerCase().includes(searchTerm) ||
          b.content.toLowerCase().includes(searchTerm)
        );
        setFilteredBlogs(filtered);
      } else {
        setFilteredBlogs(data);
      }

      // Ambil komentar per blog
      const counts: Record<number, number> = {};
      for (const blog of data) {
        const commentsRes = await axios.get(`http://127.0.0.1:8000/api/blogs/${blog.id}/comments`);
        counts[blog.id] = commentsRes.data.data?.length || 0;
      }
      setCommentsCount(counts);
    });
  }, [searchTerm]);

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div className="container mx-auto pt-28 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-10">
          {filteredBlogs.length ? (
            filteredBlogs.map((blog) => (
              <div key={blog.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                {blog.image && (
                  <Image
                    src={`http://127.0.0.1:8000/storage/${blog.image}`}
                    alt={blog.title}
                    width={800}
                    height={400}
                    className="rounded-lg object-cover w-full h-64 mb-4"
                    unoptimized
                  />
                )}

                <h2 className="text-2xl font-bold mb-3 text-gray-900 hover:text-blue-700">
                  {blog.title}
                </h2>

                <div className="text-gray-500 text-sm flex flex-wrap items-center gap-3 mb-4">
                  <Calendar className="text-red-500 w-4 h-4" />
                  {new Date(blog.published_at || "").toLocaleDateString("id-ID")}
                  <Folder className="text-red-500 w-4 h-4" />
                  {blog.category || "Uncategorized"}
                  <User className="text-red-500 w-4 h-4" />
                  {blog.author_email || "Admin"}
                  <MessageCircle className="text-red-500 w-4 h-4" />
                  {commentsCount[blog.id] || 0} Komentar
                </div>

                <p className="text-gray-700 mb-5 leading-relaxed">
                  {blog.content.length > 250 ? blog.content.slice(0, 250) + "..." : blog.content}
                </p>

                <Link
                  href={`/blogs/${blog.slug}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  Read more →
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              {searchTerm
                ? `Tidak ada hasil untuk "${searchTerm}"`
                : "Blog tidak ditemukan."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}


































// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "@/app/components/navbar";
// import Image from "next/image";
// import { Calendar, Folder, User } from "lucide-react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation"; // ⬅️ Tambahan penting

// type Blog = {
//   id: number;
//   title: string;
//   slug: string;
//   content: string;
//   image?: string;
//   category?: string;
//   author_email?: string;
//   published_at?: string;
// };

// export default function BlogListPage() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

//   const searchParams = useSearchParams();
//   const searchTerm = searchParams.get("search")?.toLowerCase() || ""; // ⬅️ Ambil dari URL

//   useEffect(() => {
//     axios.get("http://127.0.0.1:8000/api/blogs").then((res) => {
//       const data = res.data.data;
//       setBlogs(data);

//       if (searchTerm) {
//         const filtered = data.filter(
//           (b: Blog) =>
//             b.title.toLowerCase().includes(searchTerm) ||
//             b.content.toLowerCase().includes(searchTerm)
//         );
//         setFilteredBlogs(filtered);
//       } else {
//         setFilteredBlogs(data);
//       }
//     });
//   }, [searchTerm]); // ⬅️ Re-run setiap query berubah

//   return (
//     <div className="relative min-h-screen bg-gray-50">
//       <div className="container mx-auto pt-28 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-10">
//           {filteredBlogs.length ? (
//             filteredBlogs.map((blog) => (
//               <div
//                 key={blog.id}
//                 className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
//               >
//                 {blog.image && (
//                   <Image
//                     src={`http://127.0.0.1:8000/storage/${blog.image}`}
//                     alt={blog.title}
//                     width={800}
//                     height={400}
//                     className="rounded-lg object-cover w-full h-64 mb-4"
//                     unoptimized
//                   />
//                 )}

//                 <h2 className="text-2xl font-bold mb-3 text-gray-900 hover:text-blue-700">
//                   {blog.title}
//                 </h2>

//                 <div className="text-gray-500 text-sm flex flex-wrap items-center gap-3 mb-4">
//                   <Calendar className="text-red-500 w-4 h-4" />
//                   {new Date(blog.published_at || "").toLocaleDateString("id-ID")}
//                   <Folder className="text-red-500 w-4 h-4" />
//                   {blog.category || "Uncategorized"}
//                   <User className="text-red-500 w-4 h-4" />
//                   {blog.author_email || "Admin"}
//                 </div>

//                 <p className="text-gray-700 mb-5 leading-relaxed">
//                   {blog.content.length > 250
//                     ? blog.content.slice(0, 250) + "..."
//                     : blog.content}
//                 </p>

//                 <Link
//                   href={`/blogs/${blog.slug}`}
//                   className="text-blue-600 font-medium hover:underline"
//                 >
//                   Read more →
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center">
//               {searchTerm
//                 ? `Tidak ada hasil untuk "${searchTerm}"`
//                 : "Blog tidak ditemukan."}
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }























// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "@/app/components/navbar";
// import Image from "next/image";
// import { Calendar, Folder, User, Search } from "lucide-react";
// import Link from "next/link";

// type Blog = {
//   id: number;
//   title: string;
//   slug: string;
//   content: string;
//   image?: string;
//   category?: string;
//   author_email?: string;
//   published_at?: string;
// };

// export default function BlogListPage() {
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     axios.get("http://127.0.0.1:8000/api/blogs").then((res) => {
//       const data = res.data.data;
//       setBlogs(data);
//       setFilteredBlogs(data);
//     });
//   }, []);

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!searchTerm.trim()) {
//       setFilteredBlogs(blogs);
//       return;
//     }

//     const term = searchTerm.toLowerCase();
//     const filtered = blogs.filter(
//       (b) =>
//         b.title.toLowerCase().includes(term) ||
//         b.content.toLowerCase().includes(term)
//     );
//     setFilteredBlogs(filtered);
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-50">
//       <div className="absolute top-0 left-0 w-full z-50">
//         <Navbar />
//       </div>

//       <div className="container mx-auto pt-28 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2 space-y-10">
//           {filteredBlogs.length ? (
//             filteredBlogs.map((blog) => (
//               <div
//                 key={blog.id}
//                 className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
//               >
//                 {blog.image && (
//                   <Image
//                     src={`http://127.0.0.1:8000/storage/${blog.image}`}
//                     alt={blog.title}
//                     width={800}
//                     height={400}
//                     className="rounded-lg object-cover w-full h-64 mb-4"
//                     unoptimized
//                   />
//                 )}

//                 <h2 className="text-2xl font-bold mb-3 text-gray-900 hover:text-blue-700">
//                   {blog.title}
//                 </h2>

//                 <div className="text-gray-500 text-sm flex flex-wrap items-center gap-3 mb-4">
//                   <Calendar className="text-red-500 w-4 h-4" />
//                   {new Date(blog.published_at || "").toLocaleDateString("id-ID")}
//                   <Folder className="text-red-500 w-4 h-4" />
//                   {blog.category || "Uncategorized"}
//                   <User className="text-red-500 w-4 h-4" />
//                   {blog.author_email || "Admin"}
//                 </div>

//                 <p className="text-gray-700 mb-5 leading-relaxed">
//                   {blog.content.length > 250
//                     ? blog.content.slice(0, 250) + "..."
//                     : blog.content}
//                 </p>

//                 <Link
//                   href={`/blogs/${blog.slug}`}
//                   className="text-blue-600 font-medium hover:underline"
//                 >
//                   Read more →
//                 </Link>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center">Blog tidak ditemukan.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



















// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "@/app/components/navbar";
// import Image from "next/image";
// import { Calendar, Folder, User, MessageCircle, Search } from "lucide-react";
// import { useAuth } from "@/app/services/Auth";
// import Link from "next/link";

// type Blog = {
//   id: number;
//   title: string;
//   slug: string;
//   content: string;
//   image?: string;
//   category?: string;
//   author_email?: string;
//   published_at?: string;
// };

// type Comment = {
//   id: number;
//   content: string;
//   user: { name: string };
//   created_at: string;
// };

// export default function BlogListPage() {
//   const { user, token } = useAuth();
//   const [blogs, setBlogs] = useState<Blog[]>([]);
//   const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
//   const [recentPosts, setRecentPosts] = useState<Blog[]>([]);
//   const [comments, setComments] = useState<Record<number, Comment[]>>({});
//   const [newComments, setNewComments] = useState<Record<number, string>>({});
//   const [searchTerm, setSearchTerm] = useState("");

//   // 🔹 Fetch semua blog
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/blogs")
//       .then((res) => {
//         const data = res.data.data;
//         setBlogs(data);
//         setFilteredBlogs(data);
//         setRecentPosts(data.slice(0, 5));
//       })
//       .catch((err) => console.error("Gagal fetch blog:", err));
//   }, []);

//   // 🔹 Fetch komentar untuk tiap blog
//   useEffect(() => {
//     blogs.forEach((blog) => {
//       axios
//         .get(`http://127.0.0.1:8000/api/blogs/${blog.id}/comments`)
//         .then((res) => {
//           setComments((prev) => ({ ...prev, [blog.id]: res.data.data || [] }));
//         })
//         .catch((err) => console.error("Gagal fetch komentar:", err));
//     });
//   }, [blogs]);

//   // 🔹 Submit komentar baru
//   const handleCommentSubmit = async (blogId: number) => {
//     if (!user || !token) {
//       alert("Silakan login terlebih dahulu untuk berkomentar.");
//       return;
//     }

//     const content = newComments[blogId];
//     if (!content?.trim()) return;

//     try {
//       await axios.post(
//         "http://127.0.0.1:8000/api/comments",
//         { blog_id: blogId, content },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setNewComments((prev) => ({ ...prev, [blogId]: "" }));

//       // Refresh komentar
//       const res = await axios.get(`http://127.0.0.1:8000/api/blogs/${blogId}/comments`);
//       setComments((prev) => ({ ...prev, [blogId]: res.data.data || [] }));
//     } catch (err) {
//       console.error("Gagal kirim komentar:", err);
//     }
//   };

//   // 🔹 Search filter
//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!searchTerm.trim()) {
//       setFilteredBlogs(blogs);
//       return;
//     }
//     const term = searchTerm.toLowerCase();
//     const filtered = blogs.filter(
//       (b) =>
//         b.title.toLowerCase().includes(term) ||
//         b.content.toLowerCase().includes(term)
//     );
//     setFilteredBlogs(filtered);
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-50">
//       {/* Navbar */}
//       <div className="absolute top-0 left-0 w-full z-50">
//         <Navbar />
//       </div>

//       <div className="container mx-auto pt-28 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Blog List */}
//         <div className="lg:col-span-2 space-y-10">
//           {filteredBlogs.length ? (
//             filteredBlogs.map((blog) => {
//               const blogComments = comments[blog.id] || [];
//               return (
//                 <div
//                   key={blog.id}
//                   className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition"
//                 >
//                   {/* Gambar */}
//                   {blog.image && (
//                     <Image
//                       src={`http://127.0.0.1:8000/storage/${blog.image}`}
//                       alt={blog.title}
//                       width={800}
//                       height={400}
//                       className="rounded-lg object-cover w-full h-64 mb-4"
//                       unoptimized
//                     />
//                   )}

//                   {/* Judul */}
//                   <h2 className="text-2xl font-bold mb-3 text-gray-900 hover:text-blue-700 transition">
//                     {blog.title}
//                   </h2>

//                   {/* Info meta */}
//                   <div className="text-gray-500 text-sm flex flex-wrap items-center gap-3 mb-4">
//                     <Calendar className="text-red-500 w-4 h-4" />
//                     {new Date(blog.published_at || "").toLocaleDateString("id-ID")}
//                     <Folder className="text-red-500 w-4 h-4" />
//                     {blog.category || "Uncategorized"}
//                     <User className="text-red-500 w-4 h-4" />
//                     {blog.author_email || "Admin"}
//                     <MessageCircle className="text-red-500 w-4 h-4" />
//                     {blogComments.length} Comments
//                   </div>

//                   {/* Konten singkat */}
//                   <p className="text-gray-700 mb-5 leading-relaxed">
//                     {blog.content.length > 250
//                       ? blog.content.slice(0, 250) + "..."
//                       : blog.content}
//                   </p>

//                <Link href={`/blogs/${blog.slug}`} className="text-blue-600 font-medium hover:underline">
//   Read more →
// </Link>


//                   {/* Komentar */}
//                   <div id={`komentar-${blog.id}`} className="mt-6 border-t pt-4">
//                     <h3 className="text-md font-semibold mb-3 text-gray-800">
//                       💬 Komentar ({blogComments.length})
//                     </h3>

//                     <div className="space-y-3">
//                       {blogComments.length ? (
//                         blogComments.map((c) => (
//                           <div
//                             key={c.id}
//                             className="bg-gray-100 p-3 rounded-md text-sm"
//                           >
//                             <p className="font-medium text-gray-800">
//                               {c.user?.name || "Anonim"}
//                             </p>
//                             <p className="text-gray-700">{c.content}</p>
//                             <p className="text-gray-400 text-xs">
//                               {new Date(c.created_at).toLocaleString("id-ID")}
//                             </p>
//                           </div>
//                         ))
//                       ) : (
//                         <p className="text-gray-400 text-sm">
//                           Belum ada komentar.
//                         </p>
//                       )}
//                     </div>

                  
//                     {user ? (
//                       <div className="mt-3">
//                         <textarea
//                           value={newComments[blog.id] || ""}
//                           onChange={(e) =>
//                             setNewComments((prev) => ({
//                               ...prev,
//                               [blog.id]: e.target.value,
//                             }))
//                           }
//                           placeholder="Tulis komentar kamu..."
//                           className="w-full border rounded-md p-2 h-20 text-sm"
//                         />
//                         <button
//                           onClick={() => handleCommentSubmit(blog.id)}
//                           className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
//                         >
//                           Kirim Komentar
//                         </button>
//                       </div>
//                     ) : (
//                       <p className="text-gray-500 text-sm mt-2">
//                         Login untuk menulis komentar.
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="text-gray-500 text-center">Blog tidak ditemukan.</p>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }
