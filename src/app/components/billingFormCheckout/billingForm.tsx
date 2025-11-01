"use client";

import { hkGrotesk } from "@/app/fonts/fonts";

interface Props {
  billing: {
    name: string;
    email: string;
    phone: string;
    address: string;
    check_in: string;
    check_out: string;
    guest: number;
    extra_info: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function BillingFormCheckout({ billing, handleInputChange }: Props) {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-md border border-slate-200 ${hkGrotesk.className}`}
    >
      <h2 className="text-xl font-bold mb-6 drop-shadow-xs">Detail Billing</h2>

      {/* Data Umum */}
      {(["name", "address", "phone", "email"] as const).map((field) => (
  <label className="block mb-3" key={field}>
    <span className="text-gray-800 font-medium capitalize">
      {field} <span className="text-red-500">*</span>
    </span>
    <input
      type={field === "email" ? "email" : "text"}
      name={field}
      value={billing[field]}
      onChange={handleInputChange}
      className="mt-2 px-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
    />
  </label>
))}


      {/* Check In / Out */}
      <div className="grid grid-cols-2 gap-4">
        <label className="block mb-3">
          <span className="text-gray-800 font-medium">
            Check In <span className="text-red-500">*</span>
          </span>
          <input
            type="date"
            name="check_in"
            value={billing.check_in}
            onChange={handleInputChange}
            className="mt-2 px-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
          />
        </label>

        <label className="block mb-3">
          <span className="text-gray-800 font-medium">
          Check Out <span className="text-red-500">*</span>
          </span>
          <input
            type="date"
            name="check_out"
            value={billing.check_out}
            onChange={handleInputChange}
            className="mt-2 px-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
          />
        </label>
      </div>

      {/* Jumlah Tamu */}
      <label className="block mb-3">
        <span className="text-gray-800 font-medium">
          Guest <span className="text-red-500">*</span>
        </span>
        <input
          type="number"
          name="guest"
          min="1"
          value={billing.guest}
          onChange={handleInputChange}
          className="mt-2 px-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
        />
      </label>

      {/* Catatan Tambahan */}
      <label className="block mb-3">
        <span className="text-gray-800 font-medium">
          Extra Information <span className="">(Opsional)</span>
        </span>
        <textarea
          name="extra_info"
          value={billing.extra_info}
          onChange={handleInputChange}
          className="mt-2 px-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
          rows={3}
          placeholder="Tambahkan catatan"
        />
      </label>
    </div>
  );
}
