// app/blogs/layout.tsx
"use client";

import { ReactNode } from "react";
import Navbar from "@/app/components/navbar";
import { Search } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import ProtectedRoute from "@/app/middleware/ProtectedRoute";

type Blog = {
  id: number;
  title: string;
  slug: string;
};

type Comment = {
  id: number;
  name: string;
  content: string;
  blog_slug: string;
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  const [recentPosts, setRecentPosts] = useState<Blog[]>([]);
  const [recentComments, setRecentComments] = useState<Comment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/blogs").then((res) => {
      setRecentPosts(res.data.data.slice(0, 5));
    });

    axios.get("http://127.0.0.1:8000/api/comments?limit=5").then((res) => {
      setRecentComments(res.data.data);
    });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/blogs?search=${searchTerm}`;
    }
  };

  return (
    
    <div className="relative min-h-screen bg-gray-50">
             <ProtectedRoute allowedRoles={["user"]}>
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="container mx-auto pt-28 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kiri = konten utama */}
        <div className="lg:col-span-2 min-h-[500px]">{children}</div>
        {/* Sidebar */}
        <div className="space-y-8">
          {/* Search */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Search</h3>
            <form className="flex" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-red-500 text-white px-4 rounded-r-md hover:bg-red-600"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Recent Posts */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Recent Posts
            </h3>
            <ul className="space-y-3">
              {recentPosts.map((post) => (
                <li key={post.id} className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">📄</span>
                  <a
                    href={`/blogs/${post.slug}`}
                    className="text-gray-700 hover:text-blue-700 text-sm leading-snug"
                  >
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ✅ Recent Comments */}
          <div className="bg-white p-5 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">
              Recent Comments
            </h3>
            <ul className="space-y-3">
              {recentComments.map((comment) => (
                <li key={comment.id} className="text-sm">
                  <p className="text-gray-700 italic">"{comment.content.slice(0, 40)}..."</p>
                  <a
                    href={`/blogs/${comment.blog_slug}`}
                    className="text-blue-600 hover:underline text-xs"
                  >
                    — {comment.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
      </ProtectedRoute>
    </div>
  );
}


// // app/blogs/layout.tsx
// "use client";

// import { ReactNode } from "react";
// import Navbar from "@/app/components/navbar";
// import { Search, } from "lucide-react";
// import axios from "axios";
// import { useEffect, useState } from "react";

// type Blog = {
//   id: number;
//   title: string;
//   slug: string;
// };

// export default function BlogLayout({ children }: { children: ReactNode }) {
//   const [recentPosts, setRecentPosts] = useState<Blog[]>([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     axios.get("http://127.0.0.1:8000/api/blogs").then((res) => {
//       setRecentPosts(res.data.data.slice(0, 5));
//     });
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-gray-50">
//       <div className="absolute top-0 left-0 w-full z-50">
//         <Navbar />
//       </div>

//       <div className="container mx-auto pt-28 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Kiri = konten utama (daftar blog / detail blog) */}
//         <div className="lg:col-span-2">{children}</div>

//         {/* Kanan = sidebar tetap */}
//         <div className="space-y-8">
//           {/* Search */}
//           <div className="bg-white p-5 rounded-xl shadow-sm">
//             <h3 className="text-lg font-semibold mb-3 text-gray-900">Search</h3>
//             <form className="flex">
//               <input
//                 type="text"
//                 placeholder="Cari artikel..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="flex-1 border rounded-l-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="submit"
//                 className="bg-red-500 text-white px-4 rounded-r-md hover:bg-red-600"
//               >
//                 <Search className="w-4 h-4" />
//               </button>
//             </form>
//           </div>

//           {/* Recent Posts */}
//           <div className="bg-white p-5 rounded-xl shadow-sm">
//             <h3 className="text-lg font-semibold mb-4 text-gray-900">
//               Recent Posts
//             </h3>
//             <ul className="space-y-3">
//               {recentPosts.map((post) => (
//                 <li key={post.id} className="flex items-start gap-2">
//                   <span className="text-red-500 mt-1">📄</span>
//                   <a
//                     href={`/blogs/${post.slug}`}
//                     className="text-gray-700 hover:text-blue-700 text-sm leading-snug"
//                   >
//                     {post.title}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
