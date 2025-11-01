import { api } from "@/app/api/api";

interface PaketTour {
  id: number;
  title: string;
  slug: string;
  price: string | number;
  duration_days?: number;
  duration_nights?: number;
  image: string;
  created_at: string;
}

interface PaketResponse {
  data: PaketTour[];
  current_page: number;
  last_page: number;
  total: number;
}

export const fetchPackagesDashboard = async (
  page = 1,
  perPage = 4
): Promise<PaketTour[]> => {
  try {
    const response = await api.get<PaketResponse>("/paket-tours", {
      params: { page, per_page: perPage },
    });
    return response.data.data;
  } catch (error) {
    console.error("Gagal mengambil paket tour:", error);
    return [];
  }
};
