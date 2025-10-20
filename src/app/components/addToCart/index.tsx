"use client";

import { useState } from "react";
import { ShoppingCart, Loader2, CheckCircle, X } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AddToCartProps {
  paketId: number;
  title: string;
  price: number;
  image?: string;
  description?: string;
}

export default function AddToCart({
  paketId,
  title,
  price,
  image,
  description,
}: AddToCartProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 🔹 Handle Add to Cart
  const handleAddToCart = async () => {
    // Jika belum login → redirect ke halaman login
    if (!token) {
      router.push("/auth/users/login");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/cart",
        {
          paket_tour_id: paketId,
          quantity: 1,
          price: price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        const newItem = {
          id: paketId,
          title,
          price,
          image,
          description,
          quantity: 1,
        };

        setCart((prev) => [...prev, newItem]);
        setAdded(true);
        setTimeout(() => setAdded(false), 3000);
      }
    } catch (error) {
      console.error("Gagal menambahkan ke keranjang", error);
      alert("Terjadi kesalahan, coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Toggle Sidebar Cart
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="relative">
      {/* 🔹 Icon Keranjang di kanan atas */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleCart}
          className="relative p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <ShoppingCart className="w-6 h-6 text-cyan-700" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* 🔹 Tombol Add to Cart */}
      <button
        onClick={handleAddToCart}
        disabled={loading || added}
        className={`w-full font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
          added
            ? "bg-green-600 text-white"
            : "bg-cyan-600 hover:bg-cyan-700 text-white"
        }`}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : added ? (
          <>
            <CheckCircle className="w-5 h-5" /> Ditambahkan!
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            Tambahkan ke Keranjang
          </>
        )}
      </button>

      {/* 🔹 Sidebar Keranjang */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl border-l border-gray-200 z-50 transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Paket Tour Saya</h2>
          <button
            onClick={toggleCart}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Isi Keranjang */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-100px)]">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm text-center mt-10">
              Keranjang masih kosong.
            </p>
          ) : (
            cart.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 mb-4 border-b pb-3"
              >
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={70}
                    height={70}
                    className="rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-cyan-700 font-semibold">
                    Rp{Number(item.price).toLocaleString("id-ID")}
                  </p>
                  <p className="text-gray-500 text-xs line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Total */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200">
            <p className="text-gray-800 font-semibold mb-2">
              Total:{" "}
              <span className="text-cyan-700">
                Rp
                {cart
                  .reduce((sum, i) => sum + i.price * (i.quantity || 1), 0)
                  .toLocaleString("id-ID")}
              </span>
            </p>
            <button className="w-full bg-cyan-600 text-white rounded-xl py-2 font-semibold hover:bg-cyan-700">
              Lanjut ke Pembayaran
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
