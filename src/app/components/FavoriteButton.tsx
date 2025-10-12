"use client";
import { useState } from "react";

export default function FavoriteButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      onClick={() => setLiked(!liked)}
      className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition"
    >
      {liked ? "❤️" : "🤍"}
    </button>
  );
}
