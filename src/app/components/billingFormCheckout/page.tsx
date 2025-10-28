"use client";

import { hkGrotesk } from "@/app/fonts/fonts";

interface Props {
  billing: {
    name: string;
    email: string;
    phone: string;
    address: string;
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

      {["name", "address", "phone", "email"].map((field) => (
        <label className="block mb-3" key={field}>
          <span className="text-gray-800 font-medium capitalize">
            {field}{" "}
            <span className="after:content-['*'] after:text-red-500"></span>
          </span>
          <input
            type={field === "email" ? "email" : "text"}
            name={field}
            value={(billing as any)[field]}
            onChange={handleInputChange}
            className="mt-2 px-4 py-2 w-full border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-300"
          />
        </label>
      ))}
    </div>
  );
}
