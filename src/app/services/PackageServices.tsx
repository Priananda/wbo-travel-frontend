import { api } from "@/app/api/api";

export interface PaketTour {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: string | number;
  duration_days?: number;
  duration_nights?: number;
  image: string;
  created_at: string;
  feature_duration_days?: number;
}

/**
 * Ambil daftar paket tour dari API Laravel
 * @param page Halaman saat ini
 * @param perPage Jumlah item per halaman
 * @param sort Jenis sorting ("default" | "latest" | "price_asc" | "price_desc")
 */
export async function fetchPackages(page = 1, perPage = 8, sort = "default") {
  try {
    const response = await api.get("/paket-tours", {
      params: { page, per_page: perPage, sort },
    });
    return response.data; 
  } catch (error) {
    console.error("Error fetching paket tours:", error);
    throw error;
  }
}
