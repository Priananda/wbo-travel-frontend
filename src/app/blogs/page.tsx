"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Folder, User, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "@/app/api/api";

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
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    setIsLoading(true); // mulai loading
    api.get("/blogs").then(async (res) => {
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
        const commentsRes = await api.get(`/blogs/${blog.id}/comments`);
        counts[blog.id] = commentsRes.data.data?.length || 0;
      }
      setCommentsCount(counts);

      setIsLoading(false); // selesai loading
    });
  }, [searchTerm]);

  return (
    <div className="relative min-h-screen mb-5">
      <div className="lg:col-span-2 space-y-5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 border-t-cyan-700 border-gray-200 rounded-full animate-spin"></div>
            <p className="mt-4 text-cyan-700 text-md">Memuat data blog...</p>
          </div>
        ) : filteredBlogs.length ? (
          filteredBlogs.map((blog) => (
            <div key={blog.id} className="bg-white p-4 rounded-lg shadow border border-slate-200 transition">
              {blog.image && (
                <Image
                  src={`http://127.0.0.1:8000/storage/${blog.image}`}
                  alt={blog.title}
                  width={800}
                  height={400}
                  className="rounded-md object-cover w-full h-64 mb-7"
                  unoptimized
                />
              )}

              <h2 className="text-2xl font-bold mb-4 text-gray-900 hover:text-cyan-700">
                {blog.title}
              </h2>

              <div className="text-gray-600 text-sm flex flex-wrap items-center gap-3 mb-4">
                <Calendar className="text-red-500 w-4 h-4" />
                {new Date(blog.published_at || "").toLocaleDateString("id-ID")}
                <Folder className="text-red-500 w-4 h-4" />
                {blog.category || "Uncategorized"}
                <User className="text-red-500 w-4 h-4" />
                {blog.author_email || "Admin"}
                <MessageCircle className="text-red-500 w-4 h-4" />
                {commentsCount[blog.id] || 0} Komentar
              </div>

              <p className="text-gray-800 mb-5 leading-relaxed">
                {blog.content.length > 250 ? blog.content.slice(0, 250) + "..." : blog.content}
              </p>

              <Link
                href={`/blogs/${blog.slug}`}
                className="inline-flex items-center gap-2 bg-cyan-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-cyan-800 transition-colors"
              >
                Read more
                <ArrowRight className="w-4 h-4" />
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
  );
}




// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Image from "next/image";
// import { Calendar, Folder, User, MessageCircle, ArrowRight } from "lucide-react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { api } from "@/app/api/api";

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
//   const [commentsCount, setCommentsCount] = useState<Record<number, number>>({});
//   const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

//   const searchParams = useSearchParams();
//   const searchTerm = searchParams.get("search")?.toLowerCase() || "";

//   useEffect(() => {
//     // axios.get("http://127.0.0.1:8000/api/blogs").then(async (res) => {
//     api.get("/blogs").then(async (res) => {
//       const data = res.data.data;
//       setBlogs(data);

//       if (searchTerm) {
//         const filtered = data.filter((b: Blog) =>
//           b.title.toLowerCase().includes(searchTerm) ||
//           b.content.toLowerCase().includes(searchTerm)
//         );
//         setFilteredBlogs(filtered);
//       } else {
//         setFilteredBlogs(data);
//       }

//       // Ambil komentar per blog
//       const counts: Record<number, number> = {};
//       for (const blog of data) {
//         // const commentsRes = await axios.get(`http://127.0.0.1:8000/api/blogs/${blog.id}/comments`);
//         const commentsRes = await api.get(`/blogs/${blog.id}/comments`);
//         counts[blog.id] = commentsRes.data.data?.length || 0;
//       }
//       setCommentsCount(counts);
//     });
//   }, [searchTerm]);

//   return (
//     <div className="relative min-h-screen mb-5">
//       <div className="">
//         <div className="lg:col-span-2 space-y-5">
//           {filteredBlogs.length ? (
//             filteredBlogs.map((blog) => (
//               <div key={blog.id} className="bg-white p-4 rounded-lg shadow border border-slate-200 transition">
//                 {blog.image && (
//                   <Image
//                     src={`http://127.0.0.1:8000/storage/${blog.image}`}
//                     alt={blog.title}
//                     width={800}
//                     height={400}
//                     className="rounded-md object-cover w-full h-64 mb-7"
//                     unoptimized
//                   />
//                 )}

//                 <h2 className="text-2xl font-bold mb-4 text-gray-900 hover:text-cyan-700">
//                   {blog.title}
//                 </h2>

//                 <div className="text-gray-600 text-sm flex flex-wrap items-center gap-3 mb-4">
//                   <Calendar className="text-red-500 w-4 h-4" />
//                   {new Date(blog.published_at || "").toLocaleDateString("id-ID")}
//                   <Folder className="text-red-500 w-4 h-4" />
//                   {blog.category || "Uncategorized"}
//                   <User className="text-red-500 w-4 h-4" />
//                   {blog.author_email || "Admin"}
//                   <MessageCircle className="text-red-500 w-4 h-4" />
//                   {commentsCount[blog.id] || 0} Komentar
//                 </div>

//                 <p className="text-gray-800 mb-5 leading-relaxed">
//                   {blog.content.length > 250 ? blog.content.slice(0, 250) + "..." : blog.content}
//                 </p>

//                   <Link
//                   href={`/blogs/${blog.slug}`}
//                   className="inline-flex items-center gap-2 bg-cyan-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-cyan-800 transition-colors">
//                   Read more
//                   <ArrowRight className="w-4 h-4" />
//                   </Link>


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


































