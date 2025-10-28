"use client";

import { CartItem } from "@/app/services/Checkout";
import { hkGrotesk } from "@/app/fonts/fonts";
import { CheckCircle } from "lucide-react";

interface Props {
  cart: CartItem[];
  totalPrice: number;
  paymentMethod: string;
  setPaymentMethod: (v: string) => void;
  checkoutLoading: boolean;
  handleCheckout: () => void;
  xenditUrl: string | null;
}

export default function OrderCheckout({
  cart,
  totalPrice,
  paymentMethod,
  setPaymentMethod,
  checkoutLoading,
  handleCheckout,
  xenditUrl,
}: Props) {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md border border-slate-200 ${hkGrotesk.className}`}
    >
      <h2 className="text-xl font-bold mb-6 drop-shadow-xs">Your Order</h2>

      <div className="mb-4">
        {cart.map((item) => {
          const price = parseFloat(item.paket.price.toString());
          const subtotal = price * item.quantity;
          return (
            <div
              key={item.id}
              className="flex justify-between mb-2 text-black"
            >
              <span>
                {item.paket.title} × {item.quantity}
              </span>
              <span>Rp{subtotal.toLocaleString("id-ID")}</span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between font-bold border-t border-slate-500 pt-4">
        <span>Total</span>
        <span>Rp{totalPrice.toLocaleString("id-ID")}</span>
      </div>

      <label className="flex items-center text-gray-800 mt-6">
        <input
          type="radio"
          checked={paymentMethod === "xendit"}
          onChange={() => setPaymentMethod("xendit")}
          className="mr-2"
        />
        Xendit Payment Gateway
      </label>

      <button
        onClick={handleCheckout}
        disabled={checkoutLoading}
        className="mt-8 w-full bg-cyan-700 text-white py-3 rounded-lg font-semibold hover:bg-cyan-800 transition"
      >
        {checkoutLoading ? "Processing..." : "Place Order"}
      </button>

      {xenditUrl && (
        <div className="mt-6 p-5 border border-green-300 rounded-md shadow-md bg-green-50">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="text-green-600 w-5 h-5" />
            <p className="font-semibold text-green-700">
              Order berhasil dibuat!
            </p>
          </div>
          <a
            href={xenditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition font-medium"
          >
            Bayar Sekarang
          </a>
        </div>
      )}
    </div>
  );
}
