"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import dayjs from "dayjs";
import FavoriteButton from "@/app/components/FavoriteButton";
import Navbar from "@/app/components/navbar";
import { hkGrotesk } from "@/app/fonts/fonts";
import WhatsAppButton from "@/app/components/waButton/page";
import Footer from "@/app/components/footer/index";
import { fetchPackages, PaketTour } from "@/app/services/PackageServices";

function PaketTourContent() {
  const hasLoaded = useRef(false);
  const [packages, setPackages] = useState<PaketTour[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("default");
  const [totalItems, setTotalItems] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const perPage = 8;

  const searchParams = useSearchParams();
  const router = useRouter();

  const updateUrlParams = (newPage: number, newSort: string) => {
    const params = new URLSearchParams();
    params.set("page", newPage.toString());
    params.set("sort", newSort);
    router.push(`/packages?${params.toString()}`, { scroll: false });
  };

  const sortOptions = [
    { value: "default", label: "Default sorting" },
    { value: "latest", label: "Sort by latest" },
    { value: "price_asc", label: "Price: low to high" },
    { value: "price_desc", label: "Price: high to low" },
  ];

  const handleFetch = async (
    pageParam = page,
    sortParam = sort,
    scrollToTop = false
  ) => {
    setLoading(true);
    try {
      const data = await fetchPackages(pageParam, perPage, sortParam);
      setPackages(data.data);
      setTotalPages(data.meta.last_page);
      setTotalItems(data.meta.total);
      if (scrollToTop) window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setPackages([]);
    } finally {
      setLoading(false);
    }
  };

  // Load pertama kali
  useEffect(() => {
    const urlPage = Number(searchParams.get("page")) || 1;
    const urlSort = searchParams.get("sort") || "default";

    setPage(urlPage);
    setSort(urlSort);
    handleFetch(urlPage, urlSort, false);
    hasLoaded.current = true;
  }, [searchParams]);

  // 🔹 Saat user ubah halaman / sorting
  useEffect(() => {
    if (hasLoaded.current) {
      updateUrlParams(page, sort);
      handleFetch(page, sort, true);
    }
  }, [page, sort]);

  const isFeatured = (created_at: string, feature_duration_days: number) =>
    dayjs().diff(dayjs(created_at), "day") < feature_duration_days;

  return (
    <div>
      {/* Navbar tetap di atas */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="px-3 md:px-3 lg:px-0 max-w-6xl mx-auto py-10 relative animate-[fadeIn_.6s_ease-in-out]">
        <h2
          className={`mt-32 mb-4 text-3xl md:text-4xl font-semibold text-black drop-shadow-sm ${hkGrotesk.className}`}
        >
          Paket Bali Tour
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="w-8 h-8 border-4 border-t-cyan-700 border-gray-200 rounded-full animate-spin"></div>
            <p className="mt-4 text-cyan-700 text-md">
              Memuat data paket tour...
            </p>
          </div>
        ) : (
          <>
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 text-md text-gray-800 gap-4 md:gap-0">
              <p className="text-lg">
                Showing {(page - 1) * perPage + 1}–
                {Math.min(page * perPage, totalItems)} of {totalItems} results
              </p>

              <div className="relative">
                <button
                  className="flex items-center gap-2 border border-teal-700 px-5 py-3 rounded-full shadow-md bg-white hover:bg-teal-50 transition"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  {sortOptions.find((o) => o.value === sort)?.label}
                  <ChevronDown className="w-5 h-5 mt-1" />
                </button>

                {dropdownOpen && (
                  <ul className="absolute text-md right-0 mt-1 w-56 bg-white border border-slate-200 shadow-lg rounded-md z-50 animate-[fadeIn_.3s_ease]">
                    {sortOptions.map((option) => (
                      <li
                        key={option.value}
                        className={`px-4 py-2 cursor-pointer hover:bg-cyan-50 transition ${
                          sort === option.value
                            ? "bg-cyan-100 font-semibold"
                            : ""
                        }`}
                        onClick={() => {
                          setSort(option.value);
                          setPage(1);
                          setDropdownOpen(false);
                        }}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Grid Paket */}
            <div
              className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ${hkGrotesk.className}`}
            >
              {packages.map((pkg) => (
                <Link
                  key={pkg.id}
                  href={`/packages/${pkg.slug}?page=${page}&sort=${sort}`}
                  className="group flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={`http://127.0.0.1:8000/storage/${pkg.image}`}
                      alt={pkg.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute bottom-2 left-2 px-3 py-2 bg-cyan-50 text-cyan-700 text-sm font-semibold rounded-md shadow-sm">
                      {pkg.duration_days ?? "-"} Hari {pkg.duration_nights ?? "-"} Malam
                    </div>
                    {isFeatured(pkg.created_at, pkg.feature_duration_days ?? 7) && (
                      <span className="absolute top-4 left-4 bg-red-600 text-white text-sm font-semibold px-3 py-2 rounded-md shadow-md animate-pulse">
                        Featured
                      </span>
                    )}
                    <div className="absolute top-2 right-2 z-10">
                      <FavoriteButton />
                    </div>
                  </div>

                  <div className="p-5 mt-2 flex flex-col flex-grow justify-between">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-teal-700 transition mb-3 leading-snug">
                      {pkg.title}
                    </h3>
                    <p className="text-sm text-gray-900 mb-3 line-clamp-3">
                      {pkg.description || "........"}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-lg font-bold text-gray-900">
                        Rp{Number(pkg.price).toLocaleString("id-ID")}
                      </p>
                      <span className="inline-block bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-lg shadow-sm transition font-medium cursor-pointer">
                        Explore
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 space-x-3 py-2 rounded-full border-2 border-slate-400 w-full max-w-xs mx-auto shadow shadow-teal-700/50">
              {page > 1 && (
                <button
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => Math.abs(p - page) <= 2)
                .map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-4 py-2 rounded-md transition ${
                      p === page
                        ? "bg-cyan-700 text-white"
                        : "bg-slate-200 hover:bg-slate-300 text-black"
                    }`}
                  >
                    {p}
                  </button>
                ))}

              {page < totalPages && (
                <button
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 bg-slate-200 rounded-md hover:bg-slate-300 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </>
        )}

        <WhatsAppButton />
      </div>

      <Footer />
    </div>
  );
}

export default function PaketTourPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-4 border-t-cyan-700 border-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-cyan-700 text-md">
            Memuat halaman paket tour...
          </p>
        </div>
      }
    >
      <PaketTourContent />
    </Suspense>
  );
}





