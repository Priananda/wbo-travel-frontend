"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Calendar, Folder, User, MessageCircle } from "lucide-react";
import { useAuth } from "@/app/services/Auth";
import { blogTypoContent } from "@/app/utils/blogTypo";

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

type Comment = {
  id: number;
  content: string;
  user: { name: string };
  created_at: string;
};

export default function BlogDetailPage() {
  const { user, token } = useAuth();
  const { slug } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [prevBlog, setPrevBlog] = useState<Blog | null>(null);
  const [nextBlog, setNextBlog] = useState<Blog | null>(null);

  // 🔹 Ambil data blog berdasarkan slug
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/blogs/slug/${slug}`).then(async (res) => {
      const currentBlog = res.data.data;
      setBlog(currentBlog);

      // Setelah blog ditemukan, cari prev dan next berdasarkan ID
      const allBlogsRes = await axios.get("http://127.0.0.1:8000/api/blogs");
      const blogs: Blog[] = allBlogsRes.data.data || [];

      const currentIndex = blogs.findIndex((b) => b.id === currentBlog.id);
      setPrevBlog(currentIndex > 0 ? blogs[currentIndex - 1] : null);
      setNextBlog(currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null);
    });
  }, [slug]);

  // 🔹 Ambil komentar
  useEffect(() => {
    if (blog) {
      axios
        .get(`http://127.0.0.1:8000/api/blogs/${blog.id}/comments`)
        .then((res) => setComments(res.data.data || []));
    }
  }, [blog]);

  // 🔹 Kirim komentar baru
  const handleSubmit = async () => {
    if (!user || !token) {
      alert("Silakan login terlebih dahulu untuk berkomentar.");
      return;
    }

    if (!newComment.trim()) return;

    await axios.post(
      "http://127.0.0.1:8000/api/comments",
      { blog_id: blog?.id, content: newComment },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setNewComment("");
    const res = await axios.get(`http://127.0.0.1:8000/api/blogs/${blog?.id}/comments`);
    setComments(res.data.data || []);
  };

  if (!blog) return <p className="text-center py-10">Loading...</p>;

  // 🔹 Ambil isi typografi dari file blogTypo.ts
  const htmlContent = blogTypoContent[blog.slug] || blogTypoContent.default;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      {/* Gambar Header */}
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

      {/* Judul dan Info */}
      <h1 className="text-3xl font-bold mb-4 text-gray-900">{blog.title}</h1>

      <div className="text-gray-500 text-sm flex flex-wrap items-center gap-3 mb-4">
        <Calendar className="text-red-500 w-4 h-4" />
        {new Date(blog.published_at || "").toLocaleDateString("id-ID")}
        <Folder className="text-red-500 w-4 h-4" />
        {blog.category || "Uncategorized"}
        <User className="text-red-500 w-4 h-4" />
        {blog.author_email || "Admin"}
        <MessageCircle className="text-red-500 w-4 h-4" />
        {comments.length} Komentar
      </div>

      {/* 🔸 Render konten dari blogTypo.ts */}
      <article
        className="max-w-none text-gray-800 leading-relaxed mb-8"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* 🔁 Navigasi Previous / Next Selalu Ada */}
      <div className="flex justify-between items-center border-y py-6 my-6 text-gray-800">
        {/* Previous */}
        <div className="flex-1 text-left">
          {prevBlog ? (
            <Link
              href={`/blogs/${prevBlog.slug}`}
              className="group inline-block"
            >
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="text-lg group-hover:-translate-x-1 transition-transform">&lt;</span>
                <span>PREVIOUS</span>
              </div>
              <p className="font-semibold text-gray-800 group-hover:text-red-600 transition">
                {prevBlog.title}
              </p>
            </Link>
          ) : (
            <div className="opacity-50">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="text-lg">&lt;</span>
                <span>PREVIOUS</span>
              </div>
              <p className="font-semibold text-gray-400">Tidak ada posting sebelumnya</p>
            </div>
          )}
        </div>

        {/* Next */}
        <div className="flex-1 text-right">
          {nextBlog ? (
            <Link
              href={`/blogs/${nextBlog.slug}`}
              className="group inline-block"
            >
              <div className="flex justify-end items-center gap-2 text-sm text-gray-500">
                <span>NEXT</span>
                <span className="text-lg group-hover:translate-x-1 transition-transform">&gt;</span>
              </div>
              <p className="font-semibold text-gray-800 group-hover:text-red-600 transition">
                {nextBlog.title}
              </p>
            </Link>
          ) : (
            <div className="opacity-50 text-right">
              <div className="flex justify-end items-center gap-2 text-sm text-gray-400">
                <span>NEXT</span>
                <span className="text-lg">&gt;</span>
              </div>
              <p className="font-semibold text-gray-400">Tidak ada posting selanjutnya</p>
            </div>
          )}
        </div>
      </div>

      {/* 💬 Komentar Section */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">💬 Komentar</h3>
        {comments.length ? (
          comments.map((c) => (
            <div key={c.id} className="bg-gray-100 p-3 rounded-md text-sm mb-2">
              <p className="font-medium text-gray-800">{c.user?.name}</p>
              <p className="text-gray-700">{c.content}</p>
              <p className="text-gray-400 text-xs">
                {new Date(c.created_at).toLocaleString("id-ID")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">Belum ada komentar.</p>
        )}

        {user ? (
          <div className="mt-4">
            <textarea
              className="w-full border rounded-md p-2 h-20 text-sm"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Tulis komentar kamu..."
            />
            <button
              onClick={handleSubmit}
              className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
            >
              Kirim Komentar
            </button>
          </div>
        ) : (
          <p className="text-gray-500 text-sm mt-2">Login untuk menulis komentar.</p>
        )}
      </div>
    </div>
  );
}






















// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { Calendar, Folder, User, MessageCircle } from "lucide-react";
// import { useAuth } from "@/app/services/Auth";

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

// export default function BlogDetailPage() {
//   const { user, token } = useAuth();
//   const { slug } = useParams();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [newComment, setNewComment] = useState("");

//   // ✅ Fungsi untuk decode HTML yang di-escape
//   function decodeHtml(html: string) {
//     return html.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
//   }

//   useEffect(() => {
//     axios.get(`http://127.0.0.1:8000/api/blogs/slug/${slug}`).then((res) => {
//       setBlog(res.data.data);
//     });
//   }, [slug]);

//   useEffect(() => {
//     if (blog) {
//       axios
//         .get(`http://127.0.0.1:8000/api/blogs/${blog.id}/comments`)
//         .then((res) => setComments(res.data.data || []));
//     }
//   }, [blog]);

//   const handleSubmit = async () => {
//     if (!user || !token) {
//       alert("Silakan login terlebih dahulu untuk berkomentar.");
//       return;
//     }

//     if (!newComment.trim()) return;

//     await axios.post(
//       "http://127.0.0.1:8000/api/comments",
//       { blog_id: blog?.id, content: newComment },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     setNewComment("");
//     const res = await axios.get(`http://127.0.0.1:8000/api/blogs/${blog?.id}/comments`);
//     setComments(res.data.data || []);
//   };

//   if (!blog) return <p className="text-center py-10">Loading...</p>;

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-sm">
//       {blog.image && (
//         <Image
//           src={`http://127.0.0.1:8000/storage/${blog.image}`}
//           alt={blog.title}
//           width={800}
//           height={400}
//           className="rounded-lg object-cover w-full h-64 mb-4"
//           unoptimized
//         />
//       )}

//       <h1 className="text-3xl font-bold mb-4 text-gray-900">{blog.title}</h1>

//       <div className="text-gray-500 text-sm flex flex-wrap items-center gap-3 mb-4">
//         <Calendar className="text-red-500 w-4 h-4" />
//         {new Date(blog.published_at || "").toLocaleDateString("id-ID")}
//         <Folder className="text-red-500 w-4 h-4" />
//         {blog.category || "Uncategorized"}
//         <User className="text-red-500 w-4 h-4" />
//         {blog.author_email || "Admin"}
//         <MessageCircle className="text-red-500 w-4 h-4" />
//         {comments.length} Komentar
//       </div>

//       {/* ✅ Render konten HTML dengan styling lengkap */}
//       <article
//         className="prose prose-lg max-w-none text-gray-800"
//         dangerouslySetInnerHTML={{ __html: decodeHtml(blog.content) }}
//       />

//       <div className="mt-6 border-t pt-4">
//         <h3 className="text-lg font-semibold mb-3 text-gray-800">💬 Komentar</h3>
//         {comments.length ? (
//           comments.map((c) => (
//             <div key={c.id} className="bg-gray-100 p-3 rounded-md text-sm mb-2">
//               <p className="font-medium text-gray-800">{c.user?.name}</p>
//               <p className="text-gray-700">{c.content}</p>
//               <p className="text-gray-400 text-xs">{new Date(c.created_at).toLocaleString("id-ID")}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-400 text-sm">Belum ada komentar.</p>
//         )}

//         {user ? (
//           <div className="mt-4">
//             <textarea
//               className="w-full border rounded-md p-2 h-20 text-sm"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               placeholder="Tulis komentar kamu..."
//             />
//             <button
//               onClick={handleSubmit}
//               className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
//             >
//               Kirim Komentar
//             </button>
//           </div>
//         ) : (
//           <p className="text-gray-500 text-sm mt-2">Login untuk menulis komentar.</p>
//         )}
//       </div>
//     </div>
//   );
// }


















// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { Calendar, Folder, User, MessageCircle } from "lucide-react";
// import { useAuth } from "@/app/services/Auth";

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

// export default function BlogDetailPage() {
//   const { user, token } = useAuth();
//   const { slug } = useParams();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [newComment, setNewComment] = useState("");

//   useEffect(() => {
//     axios.get(`http://127.0.0.1:8000/api/blogs/slug/${slug}`).then((res) => {
//       setBlog(res.data.data);
//     });
//   }, [slug]);

//   useEffect(() => {
//     if (blog) {
//       axios
//         .get(`http://127.0.0.1:8000/api/blogs/${blog.id}/comments`)
//         .then((res) => setComments(res.data.data || []));
//     }
//   }, [blog]);

//   const handleSubmit = async () => {
//     if (!user || !token) {
//       alert("Silakan login terlebih dahulu untuk berkomentar.");
//       return;
//     }

//     if (!newComment.trim()) return;

//     await axios.post(
//       "http://127.0.0.1:8000/api/comments",
//       { blog_id: blog?.id, content: newComment },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     setNewComment("");
//     const res = await axios.get(`http://127.0.0.1:8000/api/blogs/${blog?.id}/comments`);
//     setComments(res.data.data || []);
//   };

//   if (!blog) return <p className="text-center py-10">Loading...</p>;

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-sm">
//       {blog.image && (
//         <Image
//           src={`http://127.0.0.1:8000/storage/${blog.image}`}
//           alt={blog.title}
//           width={800}
//           height={400}
//           className="rounded-lg object-cover w-full h-64 mb-4"
//           unoptimized
//         />
//       )}

//       <h1 className="text-3xl font-bold mb-4 text-gray-900">{blog.title}</h1>

//       <div className="text-gray-500 text-sm flex flex-wrap items-center gap-3 mb-4">
//         <Calendar className="text-red-500 w-4 h-4" />
//         {new Date(blog.published_at || "").toLocaleDateString("id-ID")}
//         <Folder className="text-red-500 w-4 h-4" />
//         {blog.category || "Uncategorized"}
//         <User className="text-red-500 w-4 h-4" />
//         {blog.author_email || "Admin"}
//         <MessageCircle className="text-red-500 w-4 h-4" />
//         {comments.length} Komentar
//       </div>

//       <div
//         className="prose max-w-none text-gray-800 leading-relaxed"
//         dangerouslySetInnerHTML={{ __html: blog.content }}
//       />

//       <div className="mt-6 border-t pt-4">
//         <h3 className="text-lg font-semibold mb-3 text-gray-800">💬 Komentar</h3>
//         {comments.length ? (
//           comments.map((c) => (
//             <div key={c.id} className="bg-gray-100 p-3 rounded-md text-sm mb-2">
//               <p className="font-medium text-gray-800">{c.user?.name}</p>
//               <p className="text-gray-700">{c.content}</p>
//               <p className="text-gray-400 text-xs">{new Date(c.created_at).toLocaleString("id-ID")}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-400 text-sm">Belum ada komentar.</p>
//         )}

//         {user ? (
//           <div className="mt-4">
//             <textarea
//               className="w-full border rounded-md p-2 h-20 text-sm"
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//               placeholder="Tulis komentar kamu..."
//             />
//             <button
//               onClick={handleSubmit}
//               className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
//             >
//               Kirim Komentar
//             </button>
//           </div>
//         ) : (
//           <p className="text-gray-500 text-sm mt-2">Login untuk menulis komentar.</p>
//         )}
//       </div>
//     </div>
//   );
// }
























// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import { Calendar, Folder, User, MessageCircle } from "lucide-react";

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

// export default function BlogDetailPage() {
//   const { slug } = useParams();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [comments, setComments] = useState<Comment[]>([]);

//   useEffect(() => {
//     if (!slug) return;
//     axios.get(`http://127.0.0.1:8000/api/blogs/slug/${slug}`).then((res) => {
//       setBlog(res.data.data);
//     });
//   }, [slug]);

//   useEffect(() => {
//     if (blog) {
//       axios
//         .get(`http://127.0.0.1:8000/api/blogs/${blog.id}/comments`)
//         .then((res) => setComments(res.data.data || []));
//     }
//   }, [blog]);

//   if (!blog) return <p className="text-center py-10">Loading...</p>;

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-sm">
//       {blog.image && (
//         <Image
//           src={`http://127.0.0.1:8000/storage/${blog.image}`}
//           alt={blog.title}
//           width={800}
//           height={400}
//           className="rounded-lg object-cover w-full h-64 mb-4"
//           unoptimized
//         />
//       )}

//       <h1 className="text-3xl font-bold mb-4 text-gray-900">{blog.title}</h1>

//       <div className="text-gray-500 text-sm flex flex-wrap items-center gap-3 mb-4">
//         <Calendar className="text-red-500 w-4 h-4" />
//         {new Date(blog.published_at || "").toLocaleDateString("id-ID")}
//         <Folder className="text-red-500 w-4 h-4" />
//         {blog.category || "Uncategorized"}
//         <User className="text-red-500 w-4 h-4" />
//         {blog.author_email || "Admin"}
//         <MessageCircle className="text-red-500 w-4 h-4" />
//         {comments.length} Komentar
//       </div>

//       <div
//         className="prose max-w-none text-gray-800 leading-relaxed"
//         dangerouslySetInnerHTML={{ __html: blog.content }}
//       />

//       <div className="mt-6 border-t pt-4">
//         <h3 className="text-lg font-semibold mb-3 text-gray-800">💬 Komentar</h3>
//         {comments.length ? (
//           comments.map((c) => (
//             <div key={c.id} className="bg-gray-100 p-3 rounded-md text-sm mb-2">
//               <p className="font-medium text-gray-800">{c.user?.name}</p>
//               <p className="text-gray-700">{c.content}</p>
//               <p className="text-gray-400 text-xs">{new Date(c.created_at).toLocaleString("id-ID")}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-400 text-sm">Belum ada komentar.</p>
//         )}
//       </div>
//     </div>
//   );
// }
