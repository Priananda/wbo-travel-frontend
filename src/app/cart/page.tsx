"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { hkGrotesk } from "@/app/fonts/fonts";
import Navbar from "@/app/components/navbar";
import Loading from "@/app/components/loading";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  quantity: number;
  paket: {
    id: number;
    title: string;
    price: string;
    description: string;
    image: string;
  };
}

export default function CartPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true); // untuk loading awal fetch cart
  const [checkoutLoading, setCheckoutLoading] = useState(false); // untuk loading tombol checkout

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") ||
    "http://127.0.0.1:8000";

  // 🔹 Fetch Cart
  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE}/api/user/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (error) {
      console.error("Gagal mengambil cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🔹 Hapus item dari cart
  const handleRemoveItem = async (cartId: number) => {
    if (!token) return;
    try {
      await axios.delete(`${API_BASE}/api/user/cart/destroy/${cartId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart((prev) => prev.filter((item) => item.id !== cartId));
      router.push("/packages");
    } catch (error) {
      console.error("Gagal menghapus item:", error);
    }
  };

  // 🔹 Handle klik checkout dengan loading
  const handleCheckout = () => {
    setCheckoutLoading(true);

    // Bisa dikasih delay kecil biar UX mulus (misal 1 detik)
    setTimeout(() => {
      router.push("/checkout");
    }, 1000);
  };

  // 🔹 Hitung subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.paket.price) * item.quantity,
    0
  );

  // 🔹 Jika masih loading data cart
  if (loading) return <Loading />;

  return (
    <div className="max-w-[94%] mx-auto p-6 relative">
      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Loading overlay saat klik checkout */}
      {checkoutLoading && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <Loading />
        </div>
      )}

      <div className={`${hkGrotesk.className}`}>
        <h1 className="text-3xl mt-36 font-bold mb-6 text-black drop-shadow-sm">
          Cart Paket Tour
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tabel Cart */}
          <div className="flex-1 p-3 bg-white shadow-md rounded-lg border-2 border-slate-200 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-cyan-700/10">
                <tr>
                  <th className="py-3 px-4 font-semibold text-black">Produk</th>
                  <th className="py-3 px-4 font-semibold text-black">Harga</th>
                  <th className="py-3 px-4 font-semibold text-black">Jumlah</th>
                  <th className="py-3 px-4 font-semibold text-black">
                    Subtotal
                  </th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-400">
                      Keranjang masih kosong
                    </td>
                  </tr>
                ) : (
                  cart.map((item) => (
                    <tr key={item.id} className="transition duration-200">
                      <td className="py-3 px-4 flex items-center gap-4">
                        <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                          <Image
                            src={
                              item.paket.image
                                ? `${API_BASE}/storage/${item.paket.image}`
                                : "/placeholder.jpg"
                            }
                            alt={item.paket.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium text-gray-800 line-clamp-1">
                          {item.paket.title}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800 ">
                        Rp {Number(item.paket.price).toLocaleString("id-ID")}
                      </td>
                      <td className="py-3 px-4 text-center font-medium text-gray-800">
                        {item.quantity}
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-800">
                        Rp{" "}
                        {(
                          Number(item.paket.price) * item.quantity
                        ).toLocaleString("id-ID")}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-3xl cursor-pointer pr-5 text-red-600 hover:text-red-800 font-semibold transition"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Ringkasan Cart */}
          <div className="w-full lg:w-1/3 p-5 flex flex-col shadow-md rounded-lg border-2 border-slate-200 ">
            <h2 className="text-xl font-bold mb-7 text-gray-800">
              Ringkasan Paket Tour
            </h2>
            <div className="flex justify-between mb-5 font-medium text-gray-800">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between mb-7 font-bold text-gray-800 text-lg">
              <span>Total</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className={`w-full cursor-pointer bg-cyan-700 text-white rounded-lg py-3 font-semibold hover:bg-cyan-800 transition ${
                checkoutLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {checkoutLoading ? "Memproses..." : "Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import Image from "next/image";
// import { hkGrotesk } from "@/app/fonts/fonts";
// import Navbar from "@/app/components/navbar";
// import { useRouter } from "next/navigation";
// interface CartItem {
//   id: number;
//   quantity: number;
//   paket: {
//     id: number;
//     title: string;
//     price: string;
//     description: string;
//     image: string;
//   };
// }

// export default function CartPage() {
//   const router = useRouter();
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   const API_BASE =
//     process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "") || "http://127.0.0.1:8000";

//   const fetchCart = async () => {
//     if (!token) return;
//     try {
//       const res = await axios.get(`${API_BASE}/api/user/cart`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCart(res.data);
//     } catch (error) {
//       console.error("Gagal mengambil cart:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const handleRemoveItem = async (cartId: number) => {
//     if (!token) return;
//     try {
//       await axios.delete(`${API_BASE}/api/user/cart/destroy/${cartId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCart((prev) => prev.filter((item) => item.id !== cartId));
//        router.push("/packages");
//     } catch (error) {
//       console.error("Gagal menghapus item:", error);
//     }
//   };

//   const subtotal = cart.reduce(
//     (acc, item) => acc + Number(item.paket.price) * item.quantity,
//     0
//   );

//   return (
//     <div className="max-w-[94%] mx-auto p-6">
//      <div className="absolute top-0 left-0 w-full z-50">
//           <Navbar />
//      </div>
     
//      <div className={`${hkGrotesk.className}`}>
//       <h1 className="text-3xl mt-36 font-bold mb-6 text-black drop-shadow-sm">Cart Paket Tour</h1>
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Cart Table */}
//         <div className="flex-1 p-3 bg-white shadow-md rounded-lg border-2 border-slate-200 overflow-hidden">
//           <table className="w-full text-left">
//             <thead className="bg-cyan-700/10">
//               <tr>
//                 <th className="py-3 px-4 font-semibold text-black">Produk</th>
//                 <th className="py-3 px-4 font-semibold text-black">Harga</th>
//                 <th className="py-3 px-4 font-semibold text-black">Jumlah</th>
//                 <th className="py-3 px-4 font-semibold text-black">Subtotal</th>
//                 <th className="py-3 px-4"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.length === 0 ? (
//                 <tr>
//                   <td colSpan={5} className="text-center py-8 text-gray-400">
//                     Keranjang masih kosong
//                   </td>
//                 </tr>
//               ) : (
//                 cart.map((item) => (
//                   <tr
//                     key={item.id}
//                     className="transition duration-200"
//                   >
//                     <td className="py-3 px-4 flex items-center gap-4">
//                       <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
//                         <Image
//                           src={
//                             item.paket.image
//                               ? `${API_BASE}/storage/${item.paket.image}`
//                               : "/placeholder.jpg"
//                           }
//                           alt={item.paket.title}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                       <span className="font-medium text-gray-800 line-clamp-1">
//                         {item.paket.title}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4 font-medium text-gray-800 ">
//                       Rp {Number(item.paket.price).toLocaleString("id-ID")}
//                     </td>
//                     <td className="py-3 px-4 text-center font-medium text-gray-800">{item.quantity}</td>
//                     <td className="py-3 px-4 font-semibold text-gray-800">
//                       Rp {(Number(item.paket.price) * item.quantity).toLocaleString("id-ID")}
//                     </td>
//                     <td className="py-3 px-4">
//                       <button
//                         onClick={() => handleRemoveItem(item.id)}
//                         className="text-3xl cursor-pointer pr-5 text-red-600 hover:text-red-800 font-semibold transition"
//                       >
//                         ×
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Cart Summary */}
//         <div className="w-full lg:w-1/3 p-5 flex flex-col shadow-md rounded-lg border-2 border-slate-200 ">
//           <h2 className="text-xl font-bold mb-7 text-gray-800">Ringkasan Paket Tour</h2>
//           <div className="flex justify-between mb-5 font-medium text-gray-800">
//             <span>Subtotal</span>
//             <span>Rp {subtotal.toLocaleString("id-ID")}</span>
//           </div>
//           <div className="flex justify-between mb-7 font-bold text-gray-800 text-lg">
//             <span>Total</span>
//             <span>Rp {subtotal.toLocaleString("id-ID")}</span>
//           </div>
//           <button onClick={() => router.push("/checkout")}
//            className="w-full cursor-pointer bg-cyan-700 text-white rounded-lg py-3 font-semibold hover:bg-cyan-800 transition">
//             Checkout
//           </button>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// }
