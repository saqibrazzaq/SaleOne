import { CartRes } from "./Cart";
import { ProductRes } from "./Product";
import { UnitRes } from "./Unit";

export interface CartItemRes {
  cartItemId?: number;
  cartId?: number;
  cart?: CartRes;
  productId?: number;
  product?: ProductRes;
  quantity?: number;
  rate?: number;
  basePrice?: number;
  unitId?: number;
  unit?: UnitRes;
}

export class CartItemReqAddToCart {
  productId?: number = 0;
  quantity?: number = 1;

  constructor(productId?: number, quantity?: number) {
    this.productId = productId;
    this.quantity = quantity;
  }
}

export class CartItemReqEdit {
  quantity?: number = 1;

  constructor(quantity?: number) {
    this.quantity = quantity;
  }
}