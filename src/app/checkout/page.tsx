"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hkGrotesk } from "@/app/fonts/fonts";
import Navbar from "@/app/components/navbar";
import { Transition } from "@headlessui/react";
import BillingFormCheckout from "@/app/components/billingFormCheckout/page";
import OrderCheckout from "@/app/components/orderCheckout/page";
import {
  CartItem,
  getCartCheckout,
  checkoutOrder,
  payXenditInvoice,
} from "@/app/services/Checkout";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("xendit");
  const [showAlert, setShowAlert] = useState(false);

  const [xenditUrl, setXenditUrl] = useState<string | null>(null);

  const [billing, setBilling] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    check_in: "",
    check_out: "",
    guest: 1,
    extra_info: "",
  });

  const fetchCart = async () => {
    setLoading(true);
    try {
      const cartData = await getCartCheckout();
      setCart(cartData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // const validateBilling = () => {
  //   return Object.values(billing).every((v) => v.trim() !== "");
  // };
//   const validateBilling = () => {
//   const requiredFields = ["name", "email", "phone", "address", "check_in", "check_out", "guest"];
//   return requiredFields.every((key) => (billing as any)[key]?.toString().trim() !== "");
// };
const validateBilling = () => {
  const requiredFields: (keyof typeof billing)[] = [
    "name",
    "email",
    "phone",
    "address",
    "check_in",
    "check_out",
    "guest",
    "extra_info",
  ];

  return requiredFields.every((key) => {
    const value = billing[key];
    return value !== undefined && value.toString().trim() !== "";
  });
};


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };
  const handleCheckout = async () => {
  if (!validateBilling()) {
    setShowAlert(true);
    return;
  }

  setCheckoutLoading(true);
  try {
    const order = await checkoutOrder({
      payment_method:
        paymentMethod === "xendit" ? "xendit_invoice" : "direct_bank",
      billing_name: billing.name,
      billing_email: billing.email,
      billing_phone: billing.phone,
      billing_address: billing.address,
      check_in: billing.check_in,
      check_out: billing.check_out,
      guest: billing.guest,
      extra_info: billing.extra_info,
    });

    if (!order) throw new Error("Checkout gagal.");

    const orderCode = order.order_code;

    if (paymentMethod === "xendit" && orderCode) {
      const url = await payXenditInvoice(orderCode);

      // simpan URL ke state agar UI hijau muncul
      if (url) setXenditUrl(url);

      return; // tetap berada di halaman ini
    }

    // jika bukan xendit, baru redirect ke dashboard
    router.push(`/users/dashboard?order=${orderCode}`);
  } catch (error) {
    console.error("Checkout error:", error);
  } finally {
    setCheckoutLoading(false);
  }
};

  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item.paket.price.toString());
    return sum + price * item.quantity;
  }, 0);


  return (
    <div className={`mt-32 max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 relative ${hkGrotesk.className}`}>
      <div className="absolute top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <BillingFormCheckout billing={billing} handleInputChange={handleInputChange} />

      <OrderCheckout
        cart={cart}
        totalPrice={totalPrice}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        checkoutLoading={checkoutLoading}
        handleCheckout={handleCheckout}
        xenditUrl={xenditUrl}
      />

      <Transition show={showAlert}>
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
  <div className="bg-white p-8 rounded-xl text-center shadow-lg max-w-sm mx-4">
    <h2 className="text-red-600 text-xl font-bold mb-3">
      Form Billing Belum Lengkap
    </h2>
    <p className="text-gray-700 text-base leading-relaxed mb-6">
      Harap lengkapi data pada form billing terlebih dahulu sebelum melanjutkan
      proses registrasi paket tour Anda.
    </p>
    <button
      onClick={() => setShowAlert(false)}
      className="bg-cyan-700 px-6 py-2.5 rounded-lg text-white font-medium hover:bg-cyan-800 transition"
    >
      Tutup
    </button>
  </div>
</div>

      </Transition>
    </div>
  );
}







// "use client";

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Navbar from "@/app/components/navbar";
// import { Transition } from "@headlessui/react";
// import { CheckCircle } from "lucide-react";
// import { hkGrotesk } from "@/app/fonts/fonts";

// interface CartItem {
//   id: number;
//   paket: {
//     id: number;
//     title: string;
//     price: string | number;
//   };
//   quantity: number;
// }

// export default function CheckoutPage() {
//   const router = useRouter();
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [checkoutLoading, setCheckoutLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("xendit");
//   const [showAlert, setShowAlert] = useState(false);

//   const [billing, setBilling] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   });

//   const [xenditUrl, setXenditUrl] = useState<string | null>(null);

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;
//   const API_BASE =
//     process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";

//   // ✅ Ambil cart
//   const fetchCart = async () => {
//     if (!token) return;
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API_BASE}/user/cart`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setCart(res.data);
//     } catch (err) {
//       console.error("Gagal fetch cart:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setBilling({ ...billing, [e.target.name]: e.target.value });
//   };

//   const validateBilling = () => {
//     return (
//       billing.name.trim() &&
//       billing.email.trim() &&
//       billing.phone.trim() &&
//       billing.address.trim()
//     );
//   };

// const handleCheckout = async () => {
//   if (!token) {
//     router.push("/auth/users/login");
//     return;
//   }

//   // 🚨 Validasi billing
//   if (!validateBilling()) {
//     setShowAlert(true);
//     return;
//   }

//   setCheckoutLoading(true);
//   setXenditUrl(null);

//   try {
//     const payload = {
//       payment_method:
//         paymentMethod === "xendit" ? "xendit_invoice" : "direct_bank",
//       billing_name: billing.name,
//       billing_email: billing.email,
//       billing_phone: billing.phone,
//       billing_address: billing.address,
//     };

//     // 🔹 Buat order di backend
//     const res = await axios.post(`${API_BASE}/user/checkout`, payload, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     const orderCode = res.data?.order?.order_code;

//     // =============================
//     //  XENDIT PAYMENT 
//     // =============================
//     if (paymentMethod === "xendit" && orderCode) {
//       const payRes = await axios.get(`${API_BASE}/pay-xendit/${orderCode}`);
//       const url = payRes.data?.invoice_url;

//       if (url) {
//         // ✅ Gunakan redirect di tab yang sama (bukan tab baru)
//         window.location.href = url;
//         return; // 🔥 stop di sini — biarkan Xendit yang handle redirect balik
//       } else {
//         alert("Gagal mendapatkan URL Xendit.");
//         router.push(`/checkout?status=failed&order=${orderCode}`);
//       }
//     } 
//     // =============================
//     // Non-Xendit Payment 
//     // =============================
//     else {
//       alert("Order berhasil dibuat tanpa Xendit");
//       router.push(`/users/dashboard?status=success&order=${orderCode}`);
//     }

//   } catch (err) {
//     console.error("Checkout gagal:", err);
//     alert("Terjadi kesalahan saat checkout. Coba lagi.");
//     router.push("/checkout?status=failed");
//   } finally {
//     setCheckoutLoading(false);
//   }
// };


//   // ✅ Hitung total harga
//   const totalPrice = cart.reduce((sum, item) => {
//     const price = parseFloat(item.paket?.price?.toString() || "0");
//     return sum + price * (item.quantity || 0);
//   }, 0);

//   return (
//     <div className="mt-32 max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
//       <div className="absolute top-0 left-0 w-full z-50">
//         <Navbar />
//       </div>

//       {/* 🧾 Left: Billing */}
//       <div
//         className={`bg-white p-6 rounded-lg shadow-md border border-slate-200 ${hkGrotesk.className}`}
//       >
//         <h2 className="text-xl font-bold mb-6 drop-shadow-xs">Detail Billing</h2>

//         {/* 🔹 Name */}
//         <label className="block mb-3">
//           <span className="text-gray-800 font-medium">
//             Full Name{" "}
//             <span className="after:content-['*'] after:text-red-500"></span>
//           </span>
//           <input
//             type="text"
//             name="name"
//             value={billing.name}
//             onChange={handleInputChange}
//             className="mt-2 px-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
//           />
//         </label>

//         {/* 🔹 Address */}
//         <label className="block mb-3">
//           <span className="text-gray-800 font-medium">
//             Address{" "}
//             <span className="after:content-['*'] after:text-red-500"></span>
//           </span>
//           <input
//             type="text"
//             name="address"
//             value={billing.address}
//             onChange={handleInputChange}
//             className="mt-2 px-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
//           />
//         </label>

//         {/* 🔹 Phone */}
//         <label className="block mb-3">
//           <span className="text-gray-800 font-medium">
//             Phone{" "}
//             <span className="after:content-['*'] after:text-red-500"></span>
//           </span>
//           <input
//             type="text"
//             name="phone"
//             value={billing.phone}
//             onChange={handleInputChange}
//             className="mt-2 px-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
//           />
//         </label>

//         {/* 🔹 Email */}
//         <label className="block mb-3">
//           <span className="text-gray-800 font-medium">
//             Email Address{" "}
//             <span className="after:content-['*'] after:text-red-500"></span>
//           </span>
//           <input
//             type="email"
//             name="email"
//             value={billing.email}
//             onChange={handleInputChange}
//             className="mt-2 px-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
//           />
//         </label>
//       </div>

//       {/* 🧾 Right: Order Summary */}
//       <div
//         className={`bg-white p-6 rounded-lg shadow-md border border-slate-200 ${hkGrotesk.className}`}
//       >
//         <h2 className="text-xl font-bold mb-6 drop-shadow-xs">Your Order</h2>

//         <div className="mb-4">
//           {cart.map((item) => {
//             const price = parseFloat(item.paket?.price?.toString() || "0");
//             const subtotal = price * (item.quantity || 0);
//             return (
//               <div
//                 key={item.id}
//                 className="flex justify-between mb-2 text-black"
//               >
//                 <span>
//                   {item.paket?.title} × {item.quantity}
//                 </span>
//                 <span>Rp{subtotal.toLocaleString("id-ID")}</span>
//               </div>
//             );
//           })}
//         </div>

//         <div className="flex justify-between border-t border-slate-500 pt-2 mb-2">
//           <span>Subtotal</span>
//           <span>Rp{totalPrice.toLocaleString("id-ID")}</span>
//         </div>
//         <div className="flex justify-between font-bold border-t border-slate-500 pt-4 mb-4">
//           <span>Total</span>
//           <span>Rp{totalPrice.toLocaleString("id-ID")}</span>
//         </div>

//         {/* 💳 Payment */}
//         <div className="mt-5">
//           <label className="flex items-center text-gray-800">
//             <input
//               type="radio"
//               name="payment"
//               value="xendit"
//               checked={paymentMethod === "xendit"}
//               onChange={() => setPaymentMethod("xendit")}
//               className="mr-2"
//             />
//             Xendit Payment Gateway
//           </label>
//         </div>

//         <button
//           onClick={handleCheckout}
//           disabled={checkoutLoading}
//           className="mt-8 w-full bg-cyan-700 text-white py-3 rounded-lg font-semibold hover:bg-cyan-800 transition"
//         >
//           {checkoutLoading ? "Processing..." : "Place Order"}
//         </button>

//         {/* 🔗 Link Xendit */}
//         {xenditUrl && (
//           <div className="mt-6 p-5 border border-green-300 rounded-md shadow-md bg-green-50">
//             <div className="flex items-center gap-2 mb-2">
//               <CheckCircle className="text-green-600 w-5 h-5" />
//               <p className="font-semibold text-green-700">
//                 Order berhasil dibuat!
//               </p>
//             </div>

//             <p className="text-gray-800 mb-3">
//               Klik tombol di bawah untuk melanjutkan ke pembayaran:
//             </p>

//             <a
//               href={xenditUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition font-medium"
//             >
//               Bayar Sekarang
//             </a>
//           </div>
//         )}
//       </div>

//       {/* 🚨 Modal Alert */}
//       <Transition
//         show={showAlert}
//         enter="transition transform duration-300 ease-out"
//         enterFrom="opacity-0 scale-90"
//         enterTo="opacity-100 scale-100"
//       >
//         <div
//           className={`fixed inset-0 px-4 md:px-0 lg:px-0 flex items-center justify-center bg-slate-500/20 z-50 ${hkGrotesk.className}`}
//         >
//           <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
//             <h2 className="mt-1 text-lg font-semibold mb-4 text-red-600">
//               Form Billing belum lengkap
//             </h2>
//             <p className="text-gray-800 font-medium mb-7">
//               Silakan isi semua form billing yang bertanda{" "}
//               <span className="text-red-500">*</span> sebelum melanjutkan.
//             </p>
//             <button
//               onClick={() => setShowAlert(false)}
//               className="bg-cyan-700 text-white font-medium px-5 py-2 rounded-md hover:bg-cyan-800 transition"
//             >
//               Tutup
//             </button>
//           </div>
//         </div>
//       </Transition>
//     </div>
//   );
// }


