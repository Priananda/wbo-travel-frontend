"use client";

import Image from "next/image";
import { CartItem } from "@/app/services/Cart";

interface CartTableProps {
  cart: CartItem[];
  apiBase: string;
  onRemove: (id: number) => void;
}

const CartTable = ({ cart, apiBase, onRemove }: CartTableProps) => (
  <div className="flex-1 p-3 bg-white shadow-md rounded-lg border-2 border-slate-200 overflow-x-auto scroll-hidden">
    <table className="w-full text-left">
      <thead className="bg-cyan-700/10">
        <tr>
          <th className="py-3 px-4 font-semibold text-black">Produk</th>
          <th className="py-3 px-4 font-semibold text-black">Harga</th>
          <th className="py-3 px-4 font-semibold text-black">Jumlah</th>
          <th className="py-3 px-4 font-semibold text-black">Subtotal</th>
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
            <tr key={item.id}>
              <td className="py-3 px-4 flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src={
                      item.paket.image
                        ? `${apiBase}/storage/${item.paket.image}`
                        : "/placeholder.jpg"
                    }
                    fill
                    alt={item.paket.title}
                    className="object-cover"
                  />
                </div>
                <span className="font-medium text-gray-800">
                  {item.paket.title}
                </span>
              </td>

              <td className="py-3 px-4 font-medium text-gray-800">
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
                  onClick={() => onRemove(item.id)}
                  className="text-3xl text-red-600 hover:text-red-800"
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
);

export default CartTable;
