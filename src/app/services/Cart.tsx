import {userApi} from "@/app/api/api";

export interface CartItem {
  id: number;
  quantity: number;
  paket: {
    id: number;
    title: string;
    price: string;
    description: string;
    image: string;
  };
}

export const getCart = async (): Promise<CartItem[]> => {
  const res = await userApi.get("/cart");
  return res.data;
};

export const removeCartItem = async (cartId: number): Promise<void> => {
  await userApi.delete(`/cart/destroy/${cartId}`);
};
