import { CartItemRes } from "./CartItem";

export interface CartRes {
  cartId?: number;
  baseSubTotal?: number;

  cartItems?: CartItemRes[];
}