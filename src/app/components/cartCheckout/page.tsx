"use client";

interface CartCheckoutProps {
  subtotal: number;
  loading: boolean;
  onCheckout: () => void;
}

const CartCheckout = ({ subtotal, loading, onCheckout }: CartCheckoutProps) => (
  <div className="w-full lg:w-1/3 p-5 flex flex-col shadow-md rounded-lg border-2 border-slate-200">
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
      onClick={onCheckout}
      disabled={loading}
      className={`w-full bg-cyan-700 text-white rounded-lg py-3 font-semibold hover:bg-cyan-800 transition ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {loading ? "Memproses..." : "Checkout"}
    </button>
  </div>
);

export default CartCheckout;
