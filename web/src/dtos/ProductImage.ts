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
  formData?: FormData;

  constructor(productId?: number, formData?: FormData) {
    this.productId = productId;
    this.formData = formData;
  }
}