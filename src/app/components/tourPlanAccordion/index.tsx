"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TourDayProps {
  day: string;
  title: string;
  items: string[];
}

export default function TourPlanAccordion({ day, title, items }: TourDayProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-slate-300 rounded-lg mb-3 bg-white shadow overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-gray-800"
      >
        <div className="flex items-center gap-3">
          <span className="bg-cyan-700 text-white px-3 py-1 rounded-md text-xs font-medium">
            {day}
          </span>
          <span className="text-black">{title}</span>
        </div>
        {open ? (
          <ChevronUp className="w-5 h-5 text-gray-800" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-800" />
        )}
      </button>

      {open && (
        <div className="p-5 bg-white border-t border-gray-200">
          <ul className="list-disc list-inside space-y-3 text-black">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
