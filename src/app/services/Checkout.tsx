import { userApi, api } from "@/app/api/api";

export interface CheckoutPayload {
  payment_method: string;
  billing_name: string;
  billing_email: string;
  billing_phone: string;
  billing_address: string;
}

export interface CartItem {
  id: number;
  quantity: number;
  paket: {
    id: number;
    title: string;
    price: string | number;
  };
}

export const getCartCheckout = async (): Promise<CartItem[]> => {
  const res = await userApi.get("/cart");
  return res.data || [];
};

export const checkoutOrder = async (payload: CheckoutPayload) => {
  const res = await userApi.post("/checkout", payload);
  return res.data?.order || null;
};

export const payXenditInvoice = async (orderCode: string) => {
  const res = await api.get(`/pay-xendit/${orderCode}`);
  return res.data?.invoice_url || null;
};
