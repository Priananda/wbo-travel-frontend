"use client";

import { motion, AnimatePresence } from "framer-motion";

interface AlertCommentProps {
  show: boolean;
  title: string;
  message: string;
  onClose: () => void;
  showConfirm?: boolean;
  onConfirm?: () => void;
}

export default function AlertComment({
  show,
  title,
  message,
  onClose,
  showConfirm = false,
  onConfirm,
}: AlertCommentProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-5">{message}</p>

            {/* Jika showConfirm true → tampilkan dua tombol */}
            {showConfirm ? (
              <div className="flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border border-cyan-700 text-gray-800 hover:bg-slate-100"
                >
                  Tidak
                </button>
                <button
                  onClick={onConfirm}
                  className="px-7 py-2 rounded-lg bg-cyan-700 text-white hover:bg-cyan-800"
                >
                  Ya
                </button>
              </div>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-cyan-700 text-white hover:bg-cyan-800"
              >
                Tutup
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
