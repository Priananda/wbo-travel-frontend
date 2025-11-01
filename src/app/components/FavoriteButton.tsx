"use client";
import { useState } from "react";

export default function FavoriteButton() {
  const [likedPackages, setLikedPackages] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLike = () => {
    setLikedPackages(!likedPackages);

    if (!likedPackages) {
      // tampilkan modal 3 detik
      setShowModal(true);
      setTimeout(() => setShowModal(false), 3000);
    }
  };

  return (
    <>
      {/* Tombol Like */}
      <button
        onClick={handleLike}
        className={`absolute top-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer 
          transition-transform transform hover:scale-110 ${
            likedPackages ? "animate-likePackages" : ""
          }`}
      >
        <span
          className={`text-xl transition-transform duration-300 ${
            likedPackages ? "scale-125 text-red-500" : "scale-100 text-gray-400"
          }`}
        >
          {likedPackages ? "❤️" : "🤍"}
        </span>
      </button>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0"></div>

          {/* <div className="relative bg-white rounded-lg shadow-lg px-6 py-4 animate-fade-in-out">
            <p className={`text-gray-800 font-medium text-center ${hkGrotesk.className}`}>
              ❤️ Terima kasih sudah menyukai!
            </p>
          </div> */}
        </div>
      )}
    </>
  );
}
