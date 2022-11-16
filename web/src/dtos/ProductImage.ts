import { ProductRes } from "./Product";

export interface ProductImageRes {
  productImageId?: number;
  imageUrl?: string;
  cloudinaryId?: string;
  isMainImage?: boolean;
  productId?: number;

  product?: ProductRes;
}

export class ProductImageReqEdit {
  isMainImage?: boolean = false;
  productId?: number = 0;

  constructor(productId?: number) {
    this.productId = productId;
  }
}