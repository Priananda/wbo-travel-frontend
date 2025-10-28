"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Loader2, CheckCircle, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "@/app/components/loading/index";
import { fetchCart, addToCart, removeCartItem, CartItem } from "@/app/services/AddToCart";

interface AddToCartProps {
  paketId: number;
  title: string;
  price: number;
  image?: string;
  description?: string;
}

export default function AddToCart({ paketId, title, price, image, description }: AddToCartProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false); 
  const [added, setAdded] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const loadCart = async () => {
    if (!token) return;
    try {
      const data = await fetchCart();
      setCart(data);
      setAdded(data.some((item) => item.paket_tour?.id === paketId));
    } catch (err) {
      console.error("Gagal mengambil cart:", err);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleAddToCart = async () => {
    if (!token) {
      router.push(`/auth/users/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    if (added || loading) return;

    try {
      setLoading(true);
      await addToCart(paketId, 1, price);
      await loadCart();
      setAdded(true);
    } catch (error) {
      console.error("Gagal menambahkan ke keranjang:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (cartId: number, paketTourId?: number) => {
    if (!token) return;
    try {
      setIsLoading(true);
      await removeCartItem(cartId);
      setCart((prev) => prev.filter((item) => item.id !== cartId));
      if (paketTourId === paketId) setAdded(false);
    } catch (error) {
      console.error("Gagal menghapus item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewCart = () => {
    setIsLoading(true);
    setTimeout(() => router.push("/cart"), 500);
  };

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => router.push("/checkout"), 800);
  };

  return (
    <div className="relative">
      {isLoading && <Loading />}

      {/* Floating Cart Icon */}
      {/* <div className="fixed md:absolute top-36 right-6 z-50 md:z-0">
        <button
          onClick={() => setIsCartOpen(!isCartOpen)}
          className="relative p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <ShoppingCart className="w-6 h-6 text-cyan-700" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {cart.length}
            </span>
          )}
        </button>
      </div> */}
    <div className="fixed md:absolute top-36 right-6  md:-top-70 md:-right-7 lg:-top-80 lg:-right-8  z-50 md:z-0">
    <button
    onClick={() => setIsCartOpen(!isCartOpen)}
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

      {/* Tombol Tambah ke Keranjang */}
      <button
        onClick={handleAddToCart}
        disabled={loading || added}
        className={`w-full font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
          added ? "bg-slate-500 text-white" : "bg-cyan-700 hover:bg-cyan-800 text-white"
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
            <ShoppingCart className="w-5 h-5" /> Tambahkan ke Keranjang
          </>
        )}
      </button>

      {/* Sidebar Keranjang */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl border-l border-gray-200 z-50 transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Paket Tour</h2>
          <button onClick={() => setIsCartOpen(false)}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-190px)]">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm text-center mt-10">Keranjang masih kosong.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {cart.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition hover:shadow-md"
                >
                  <div className="relative w-full h-40">
                    <Image
                      src={
                        item.paket_tour?.image
                          ? `${process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "http://127.0.0.1:8000"}/storage/${item.paket_tour.image}`
                          : image || "/placeholder.jpg"
                      }
                      alt={item.paket_tour?.title || title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col p-3 space-y-1">
                    <h3 className="font-semibold text-gray-800 line-clamp-1">{item.paket_tour?.title || title}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2">{item.paket_tour?.description || description || "Tanpa deskripsi"}</p>
                    <p className="text-cyan-700 font-semibold mt-1">
                      Rp{Number(item.price || item.paket_tour?.price || price || 0).toLocaleString("id-ID")}
                    </p>
                    <button
                      onClick={() => handleRemoveItem(item.id, item.paket_tour?.id)}
                      className="mt-2 flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg py-1 transition"
                    >
                      <X className="w-4 h-4" /> Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-gray-200 space-y-3">
            <button onClick={handleViewCart} className="w-full bg-cyan-700 text-white rounded-lg py-2 font-semibold hover:bg-cyan-800 transition">
              View Cart
            </button>
            <button onClick={handleCheckout} className="w-full bg-cyan-700 text-white rounded-lg py-2 font-semibold hover:bg-cyan-800 transition">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}









// "use client";

// import { useState, useEffect } from "react";
// import { ShoppingCart, Loader2, CheckCircle, X } from "lucide-react";
// import axios from "axios";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Loading from "@/app/components/loading/index";
// import { hkGrotesk } from "@/app/fonts/fonts";

// interface AddToCartProps {
//   paketId: number;
//   title: string;
//   price: number;
//   image?: string;
//   description?: string;
// }

// export default function AddToCart({
//   paketId,
//   title,
//   price,
//   image,
//   description,
// }: AddToCartProps) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false); // untuk tombol Tambah ke keranjang
//   const [added, setAdded] = useState(false);
//   const [cart, setCart] = useState<any[]>([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // untuk hapus/view cart/checkout

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const API_BASE =
//     process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";

//   const fetchCart = async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get(`${API_BASE}/user/cart`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCart(res.data);

//       const isAlreadyAdded = res.data.some(
//         (item: any) => item.paket_tour?.id === paketId
//       );
//       setAdded(isAlreadyAdded);
//     } catch (err) {
//       console.error("Gagal mengambil cart:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const handleAddToCart = async () => {
//     if (!token) {
//       // router.push("/auth/users/login");
//       // router.push(`/auth/users/login?redirect=/cart`);
//       router.push(`/auth/users/login?redirect=${encodeURIComponent(window.location.pathname)}`);

//       return;
//     }

//     if (added || loading) return;

//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${API_BASE}/user/cart/add`,
//         { paket_tour_id: paketId, quantity: 1, price },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.status === 200 || res.status === 201) {
//         await fetchCart();
//         setAdded(true);
//       }
//     } catch (error) {
//       console.error("Gagal menambahkan ke keranjang:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveItem = async (cartId: number, paketTourId?: number) => {
//     if (!token) return;
//     try {
//       setIsLoading(true); // aktifkan loading global
//       await axios.delete(`${API_BASE}/user/cart/destroy/${cartId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setCart((prev) => prev.filter((item) => item.id !== cartId));
//       if (paketTourId === paketId) setAdded(false);
//     } catch (error) {
//       console.error("Gagal menghapus item:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleViewCart = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       router.push("/cart");
//     }, 500); // sedikit delay agar animasi loading muncul
//   };

//   const handleCheckout = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       router.push("/checkout");
//     }, 800); // delay 0.8 detik sebelum redirect ke halaman checkout
//   };

//   return (
//     <div className="relative ">
//       {/* Loading overlay global */}
//       {isLoading && <Loading />}

//       {/* Floating Cart Icon */}
//       {/* <div className="absolute -top-80 -right-8  md:-top-80 md:-right-6 lg:-top-80 lg:-right-8  ">
//         <button
//           onClick={() => setIsCartOpen(!isCartOpen)}
//           className="relative p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
//         >
//           <ShoppingCart className="w-6 h-6 text-cyan-700" />
//           {cart.length > 0 && (
//             <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
//               {cart.length}
//             </span>
//           )}
//         </button>
//       </div> */}

//   <div className="fixed md:absolute top-36 right-6  md:-top-70 md:-right-7 lg:-top-80 lg:-right-8  z-50 md:z-0">
//   <button
//     onClick={() => setIsCartOpen(!isCartOpen)}
//     className="relative p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
//   >
//     <ShoppingCart className="w-6 h-6 text-cyan-700" />
//     {cart.length > 0 && (
//       <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
//         {cart.length}
//       </span>
//     )}
//   </button>
// </div>


//       {/* Tombol Tambah ke Keranjang */}
//       <button
//         onClick={handleAddToCart}
//         disabled={loading || added}
//         className={`w-full font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${
//           added
//             ? "bg-slate-500 text-white"
//             : "bg-cyan-700 hover:bg-cyan-800 text-white"
//         }`}
//       >
//         {loading ? (
//           <Loader2 className="w-5 h-5 animate-spin" />
//         ) : added ? (
//           <>
//             <CheckCircle className="w-5 h-5" /> Ditambahkan!
//           </>
//         ) : (
//           <>
//             <ShoppingCart className="w-5 h-5" /> Tambahkan ke Keranjang
//           </>
//         )}
//       </button>

//       {/* Sidebar Keranjang */}
//       <div
//         className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl border-l border-gray-200 z-50 transform transition-transform duration-300 ${
//           isCartOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           <h2 className="text-lg font-bold text-gray-800">Paket Tour</h2>
//           <button onClick={() => setIsCartOpen(false)}>
//             <X className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>

//         {/* Isi Keranjang */}
//         <div className="p-4 overflow-y-auto h-[calc(100vh-190px)]">
//           {cart.length === 0 ? (
//             <p className="text-gray-500 text-sm text-center mt-10">
//               Keranjang masih kosong.
//             </p>
//           ) : (
//             <div className="grid grid-cols-1 gap-4">
//               {cart.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition hover:shadow-md"
//                 >
//                   {/* Gambar */}
//                   <div className="relative w-full h-40">
//                     <Image
//                       src={
//                         item.paket_tour?.image
//                           ? `${
//                               process.env.NEXT_PUBLIC_API_BASE_URL?.replace(
//                                 "/api",
//                                 ""
//                               ) || "http://127.0.0.1:8000"
//                             }/storage/${item.paket_tour.image}`
//                           : image || "/placeholder.jpg"
//                       }
//                       alt={item.paket_tour?.title || title}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>

//                   {/* Info */}
//                   <div className="flex flex-col p-3 space-y-1">
//                     <h3 className="font-semibold text-gray-800 line-clamp-1">
//                       {item.paket_tour?.title || title}
//                     </h3>
//                     <p className="text-sm text-gray-500 line-clamp-2">
//                       {item.paket_tour?.description ||
//                         description ||
//                         "Tanpa deskripsi"}
//                     </p>
//                     <p className="text-cyan-700 font-semibold mt-1">
//                       Rp
//                       {Number(
//                         item.price ||
//                           item.paket_tour?.price ||
//                           price ||
//                           0
//                       ).toLocaleString("id-ID")}
//                     </p>

//                     <button
//                       onClick={() =>
//                         handleRemoveItem(item.id, item.paket_tour?.id)
//                       }
//                       className="mt-2 flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded-lg py-1 transition"
//                     >
//                       <X className="w-4 h-4" /> Hapus
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         {cart.length > 0 && (
//           <div className="p-4 border-t border-gray-200 space-y-3">
//             <button
//               onClick={handleViewCart}
//               className="w-full bg-cyan-700 text-white rounded-lg py-2 font-semibold hover:bg-cyan-800 transition"
//             >
//               View Cart
//             </button>
//             <button
//               onClick={handleCheckout}
//               className="w-full bg-cyan-700 text-white rounded-lg py-2 font-semibold hover:bg-cyan-800 transition"
//             >
//               Checkout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


