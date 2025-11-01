"use client";


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Eye } from "lucide-react";
import ProtectedRoute from "@/app/middleware/ProtectedRoute";
import { useAuth } from "@/app/services/Auth";
import { hkGrotesk } from "@/app/fonts/fonts";
import { adminApi } from "@/app/api/api";

interface OrderItem {
  paket_title: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Order {
  order_code: string;
  user_name: string;
  user_email: string;
  billing_name: string;
  billing_phone: string;
  billing_address: string;
  check_in?: string;
  check_out?: string;
  guest?: number;
  extra_info?: string;
  status: string;
  total_price: string;
  created_at: string;
  payment_status?: string;
  items: OrderItem[];
  
}

export default function CartViewPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [summary, setSummary] = useState({
    total_orders: 0,
    pending: 0,
    paid: 0,
    settlement: 0,
  });
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const fetchOrders = async (page = 1) => {
    setLoading(true);

    try {
      const res = await adminApi.get(`/orders?page=${page}`);

      const formattedOrders = res.data.orders.map((order: Order) => ({
        ...order,
        status: order.payment_status || order.status,
      }));

      setOrders(formattedOrders);
      setPagination(res.data.pagination);
      setSummary(res.data.summary);
    } catch (err) {
      console.error("Gagal memuat data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  const onPageChange = (page: number) => {
    fetchOrders(page);
  };

  const filteredOrders = orders.filter(
    (o) =>
      o.billing_name?.toLowerCase().includes(search.toLowerCase()) ||
      o.order_code?.toLowerCase().includes(search.toLowerCase()) ||
      o.status?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className={`p-5 space-y-6 ${hkGrotesk.className}`}>
        {/* Header */}
        <h1 className="text-2xl font-semibold text-black drop-shadow-xs">
          Daftar Pesanan Paket Tour
        </h1>

        

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Total Orders", value: summary.total_orders, color: "text-cyan-700" },
            { label: "Pending", value: summary.pending, color: "text-amber-500" },
            { label: "Paid", value: summary.paid, color: "text-green-600" },
            { label: "Settlement", value: summary.settlement, color: "text-blue-600" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-lg shadow text-center">
              <p className="text-md font-medium text-gray-800">{item.label}</p>
              <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Search bar */}
        <div className="flex">
          <input
            type="text"
            placeholder="Cari nama, kode order, atau status..."
            className="px-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-md shadow-md overflow-hidden">
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-cyan-700" size={30} />
            </div>
          ) : (
           
                  <table className="min-w-full table-auto text-sm text-gray-700 border-collapse">
            <thead className="text-xs uppercase bg-cyan-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Kode Order</th>
                  <th className="px-4 py-3 text-left">Nama & Paket</th>
                  <th className="px-4 py-3 text-center">Qty</th>
                  <th className="px-4 py-3 text-right">Total</th>
                  <th className="px-4 py-3 text-right">Subtotal</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Tanggal</th>
                  <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-6 text-gray-500 italic"
                    >
                      Tidak ada pesanan paket tour yang ditemukan.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, idx) => {
                    const firstItem = order.items?.[0];
                    const paketTitle = firstItem?.paket_title || "-";
                    const quantity = firstItem?.quantity || 0;
                    const subtotal = firstItem?.subtotal || 0;

                    return (
                      <tr
                        key={idx}
                        className="border-b border-slate-200 hover:bg-gray-50 transition-colors align-top"
                      >
                        <td className="px-4 py-3 font-medium whitespace-nowrap">
                          {order.order_code}
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-semibold">{order.billing_name}</p>
                          <p className="text-xs text-gray-700 italic break-words">
                            {paketTitle}
                          </p>
                        </td>
                        <td className="px-4 py-3 font-semibold text-center">
                          {quantity}
                        </td>
                        <td className="px-4 py-3 font-medium text-right text-gray-800 whitespace-nowrap">
                          Rp {parseInt(order.total_price).toLocaleString("id-ID")}
                        </td>
                        <td className="px-4 py-3 font-semibold text-right text-gray-800 whitespace-nowrap">
                          Rp {subtotal.toLocaleString("id-ID")}
                        </td>
                        <td
                          className={`px-4 py-3 font-semibold text-center ${
                            order.status === "pending"
                              ? "text-amber-500"
                              : order.status === "settlement"
                              ? "text-green-600"
                              : "text-gray-800"
                          }`}
                        >
                          {order.status}
                        </td>
                       <td className="px-4 py-3 text-center text-gray-700 whitespace-nowrap">
  {order.created_at
    ? new Date(order.created_at).toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Jakarta",
      })
    : "-"}
</td>

                        <td className="px-4 py-3 text-center font-medium">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="inline-flex items-center gap-1 text-cyan-700 hover:text-cyan-900 transition"
                          >
                            <Eye size={18} />
                            Detail
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>
        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-3 pt-4">
          <button
            disabled={pagination.current_page <= 1}
            onClick={() => onPageChange(pagination.current_page - 1)}
            className="px-3 py-1 bg-gray-100 rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm">
            Page {pagination.current_page} of {pagination.last_page}
          </span>

          <button
            disabled={pagination.current_page >= pagination.last_page}
            onClick={() => onPageChange(pagination.current_page + 1)}
            className="px-3 py-1 bg-gray-100 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>

        {/* Modal Detail */}
        <AnimatePresence>
          {selectedOrder && (
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white w-full max-w-2xl rounded-md shadow-md overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {/* Header Modal */}
                <div className="bg-cyan-800 text-white px-6 py-3 flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    Detail Pesanan: {selectedOrder.order_code}
                  </h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-white hover:text-gray-200 text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>

                {/* Konten Modal */}
                <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">
                  {/* Info Pelanggan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-800">Nama</p>
                      <p className="font-semibold text-gray-800">
                        {selectedOrder.billing_name}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Email</p>
                      <p className="font-semibold text-gray-800">
                        {selectedOrder.user_email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Telepon</p>
                      <p className="font-semibold text-gray-800">
                        {selectedOrder.billing_phone}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Alamat</p>
                      <p className="font-semibold text-gray-800 break-words">
                        {selectedOrder.billing_address}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Check In</p>
                      <p className="font-semibold text-gray-800">
                        {selectedOrder.check_in
                        ? new Date(selectedOrder.check_in).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                      : "-"}
                      </p>
                    </div>
                     <div>
    <p className="text-sm font-medium text-gray-800">Check Out</p>
    <p className="font-semibold text-gray-800">
      {selectedOrder.check_out
        ? new Date(selectedOrder.check_out).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "-"}
    </p>
  </div>
   <div>
    <p className="text-sm font-medium text-gray-800">Jumlah Tamu</p>
    <p className="font-semibold text-gray-800">
      {selectedOrder.guest || "-"}
    </p>
  </div>
  {selectedOrder.extra_info && (
    <div className="sm:col-span-2">
      <p className="text-sm font-medium text-gray-800">Catatan Tambahan</p>
      <p className="font-semibold text-gray-800 break-words">
        {selectedOrder.extra_info}
      </p>
    </div>
  )}
                    <div className="sm:col-span-2">
                      <p className="text-sm font-medium text-gray-800">Status</p>
                      <span
                        className={`inline-block mt-1 px-4 py-1 text-sm font-semibold rounded-full ${
                          selectedOrder.status === "settlement"
                            ? "bg-green-100 text-green-700"
                            : selectedOrder.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {selectedOrder.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Item Pesanan */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Item Pesanan
                    </h3>
                    {selectedOrder.items.length === 0 ? (
                      <p className="text-gray-500">Tidak ada item</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm rounded-lg overflow-hidden">
                          <thead className="bg-cyan-800 text-white">
                            <tr>
                              <th className="px-4 py-2 text-left">Paket</th>
                              <th className="px-4 py-2 text-center">Qty</th>
                              <th className="px-4 py-2 text-right">Harga</th>
                              <th className="px-4 py-2 text-right">Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedOrder.items.map((item, idx) => (
                              <tr
                                key={idx}
                                className="border-t hover:bg-gray-50 transition font-medium"
                              >
                                <td className="px-4 py-2">{item.paket_title}</td>
                                <td className="px-4 py-2 text-center">
                                  {item.quantity}
                                </td>
                                <td className="px-4 py-2 text-right">
                                  Rp {item.price.toLocaleString("id-ID")}
                                </td>
                                <td className="px-4 py-2 text-right font-semibold">
                                  Rp {item.subtotal.toLocaleString("id-ID")}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Total & Tombol Tutup */}
                  <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-slate-300">
                    <div className="text-gray-800 font-semibold mb-5 sm:mb-0">
                      Total Pesanan:{" "}
                      <span className="text-cyan-800">
                        Rp{" "}
                        {parseInt(selectedOrder.total_price).toLocaleString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="px-6 py-2 font-medium rounded-md bg-cyan-700 hover:bg-cyan-800 text-white transition"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ProtectedRoute>
  );
}



