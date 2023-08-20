import { CartItem } from "@/model/cart-item";

export type OrderStatus = "pending" | "done";

export interface User {
  name: string;
  email: string;
}

export interface OrderForm {
  user: User;
  order: CartItem[];
  status: OrderStatus;
  total: number;
}
