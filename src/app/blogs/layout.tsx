// app/blogs/layout.tsx
"use client";

import { ReactNode } from "react";
import Navbar from "@/app/components/navbar";
import { Search } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
// import ProtectedRoute from "@/app/middleware/ProtectedRoute";
import { FileText, MessageCircle } from "lucide-react";
import WhatsAppButton from "@/app/components/waButton/page";
import Footer from "@/app/components/footer";
import { api } from "@/app/api/api";

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
    api.get("/blogs").then((res) => {
      setRecentPosts(res.data.data.slice(0, 5));
    });

    api.get("/comments?limit=5").then((res) => {
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
             {/* <ProtectedRoute allowedRoles={["user"]}> */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="container mx-auto mt-40 px-4 grid grid-cols-1  md:grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kiri = konten utama */}
        <div className="lg:col-span-2 min-h-[500px]">{children}</div>
        {/* Sidebar */}
        <div className="space-y-5">
          {/* Search */}
          <div className="bg-white p-5 rounded-lg shadow border border-slate-200">
            <h3 className="text-lg font-semibold mb-3 text-gray-900">Search</h3>
            <form className="flex" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border border-slate-300 rounded-l-md px-3 py-2 text-sm focus:outline-none "
              />
              <button
                type="submit"
                className="bg-cyan-700 text-white px-4 rounded-r-md hover:bg-cyan-800"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Recent Posts */}
          <div className="bg-white p-5 rounded-lg shadow border border-slate-200">
  <h3 className="text-lg font-semibold mb-4 text-gray-900">
    Recent Posts
  </h3>
  <ul className="space-y-3">
    {recentPosts.map((post) => (
      <li key={post.id} className="flex items-start gap-2">
        <FileText className="w-5 h-5 text-cyan-700 mt-1" />
        <a
          href={`/blogs/${post.slug}`}
          className="text-gray-700 hover:text-cyan-800 text-sm leading-snug"
        >
          {post.title}
        </a>
      </li>
    ))}
  </ul>
</div>


  {/* ✅ Recent Comments */}
  <div className="bg-white p-5 mb-5 rounded-lg shadow border border-slate-200">
  <h3 className="text-lg font-semibold mb-4 text-gray-900">
    Recent Comments
  </h3>
  <ul className="space-y-3">
    {recentComments.map((comment) => (
      <li key={comment.id} className="flex items-start gap-2">
        <MessageCircle className="w-4 h-4 text-cyan-700 mt-1" />
        <div>
          {/* <p className="text-gray-800 italic text-sm">
            "{comment.content.slice(0, 40)}..."
          </p> */}
          <p className="text-gray-800 italic text-sm">
            &quot;{comment.content.slice(0, 40)}...&quot;
          </p>

          <a
            href={`/blogs/${comment.blog_slug}`}
            className="text-cyan-700 hover:underline text-xs"
          >
            — {comment.name}
          </a>
        </div>
      </li>
    ))}
  </ul>
</div>

        </div>
      </div>
      <WhatsAppButton />
      {/* </ProtectedRoute> */}
      <Footer/>
    </div>
  );
}


