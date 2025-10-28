import { userApi } from "@/app/api/api";

// Interfaces
export interface PaketTour {
  id: number;
  title: string;
  description?: string;
  image?: string;
  price?: number;
}

export interface CartItem {
  id: number;
  paket_tour?: PaketTour;
  price: number;
}

// Fetch semua item cart
export const fetchCart = async (): Promise<CartItem[]> => {
  const res = await userApi.get("/cart");
  return res.data;
};

// Tambah item ke cart
export const addToCart = async (paket_tour_id: number, quantity = 1, price: number): Promise<CartItem> => {
  const res = await userApi.post("/cart/add", { paket_tour_id, quantity, price });
  return res.data;
};

// Hapus item cart
export const removeCartItem = async (cartId: number): Promise<void> => {
  await userApi.delete(`/cart/destroy/${cartId}`);
};
