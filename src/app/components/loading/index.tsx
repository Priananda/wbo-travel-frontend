"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-slate-700/60 flex items-center justify-center z-50">
      <div className="animate-spin h-12 w-12 border-5 border-white border-t-teal-700 rounded-full"></div>
    </div>
  );
}
