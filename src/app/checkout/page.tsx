"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface CartItem {
  id: number;
  paket: {
    id: number;
    title: string;
    price: string | number;
  };
  quantity: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("xendit");

  const [billing, setBilling] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  // ✅ state untuk menampilkan link invoice setelah checkout
  const [xenditUrl, setXenditUrl] = useState<string | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000/api";

  // ✅ Ambil cart
  const fetchCart = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/user/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(res.data);
    } catch (err) {
      console.error("Gagal fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!token) {
      router.push("/auth/users/login");
      return;
    }

    setCheckoutLoading(true);
    setXenditUrl(null); // reset dulu
    try {
      const payload = {
        payment_method:
          paymentMethod === "xendit" ? "xendit_invoice" : "direct_bank",
        billing_name: billing.name,
        billing_email: billing.email,
        billing_phone: billing.phone,
        billing_address: billing.address,
        notes: billing.notes,
      };

      // 1️⃣ Buat order di backend
      const res = await axios.post(`${API_BASE}/user/checkout`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const orderCode = res.data.order?.order_code;
      console.log("Order berhasil dibuat:", orderCode);

      // 2️⃣ Buat invoice Xendit
      if (paymentMethod === "xendit" && orderCode) {
        const payRes = await axios.get(`${API_BASE}/pay-xendit/${orderCode}`);
        const url = payRes.data?.invoice_url;

        if (url) {
          setXenditUrl(url); // ✅ tampilkan URL ke user
        } else {
          alert("Gagal mendapatkan URL Xendit");
        }
      } else {
        alert("Order berhasil dibuat tanpa Xendit");
        router.push("/checkout/success");
      }
    } catch (err) {
      console.error("Checkout gagal:", err);
      alert("Terjadi kesalahan saat checkout. Coba lagi.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // ✅ Hitung total
  const totalPrice = cart.reduce((sum, item) => {
    const price = parseFloat(item.paket?.price?.toString() || "0");
    return sum + price * (item.quantity || 0);
  }, 0);


  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 🧾 Left: Billing */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-6">Billing Details</h2>

        <label className="block mb-3">
          Full Name *
          <input
            type="text"
            name="name"
            value={billing.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
          />
        </label>
        <label className="block mb-3">
          Alamat *
          <input
            type="text"
            name="address"
            value={billing.address}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
          />
        </label>
        <label className="block mb-3">
          Phone *
          <input
            type="text"
            name="phone"
            value={billing.phone}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
          />
        </label>
        <label className="block mb-3">
          Email Address *
          <input
            type="email"
            name="email"
            value={billing.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
          />
        </label>
        <label className="block mb-3">
          Catatan (optional)
          <textarea
            name="notes"
            value={billing.notes}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
            rows={3}
          />
        </label>
      </div>

      {/* 💰 Right: Summary */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-6">Your Order</h2>

        <div className="mb-4">
          {cart.map((item) => {
            const price = parseFloat(item.paket?.price?.toString() || "0");
            const subtotal = price * (item.quantity || 0);
            return (
              <div key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.paket?.title} × {item.quantity}
                </span>
                <span>Rp{subtotal.toLocaleString("id-ID")}</span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between border-t pt-2 mb-2">
          <span>Subtotal</span>
          <span>Rp{totalPrice.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between font-bold border-t pt-2 mb-4">
          <span>Total</span>
          <span>Rp{totalPrice.toLocaleString("id-ID")}</span>
        </div>

        {/* 💳 Payment */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="xendit"
              checked={paymentMethod === "xendit"}
              onChange={() => setPaymentMethod("xendit")}
              className="mr-2"
            />
            Xendit Payment Gateway
          </label>
        </div>

        {/* 🟩 Button */}
        <button
          onClick={handleCheckout}
          disabled={checkoutLoading}
          className="w-full bg-cyan-700 text-white py-3 rounded-lg font-semibold hover:bg-cyan-800 transition"
        >
          {checkoutLoading ? "Processing..." : "Place Order"}
        </button>

        {/* 🔗 Tampilkan link Xendit */}
        {xenditUrl && (
          <div className="mt-6 p-4 border border-green-300 rounded-md bg-green-50">
            <p className="font-semibold text-green-700 mb-2">
              ✅ Order berhasil dibuat!
            </p>
            <p className="text-gray-700 mb-2">
              Klik tombol di bawah untuk melanjutkan ke pembayaran:
            </p>
            <a
              href={xenditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Bayar Sekarang
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
