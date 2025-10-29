"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { hkGrotesk } from "@/app/fonts/fonts";

interface AlertModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export default function AlertModal({ show, onClose, title = "Peringatan", message }: AlertModalProps) {
  // Tutup modal dengan tombol ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm ${hkGrotesk.className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-sm text-center"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white hover:text-slate-300"
            >
              <X size={23} />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-5">{title}</h2>
            <p className="text-gray-800 font-medium mb-5">{message}</p>

            <button
              onClick={onClose}
              className="px-6 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-800 transition-colors font-medium"
            >
              Tutup
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
