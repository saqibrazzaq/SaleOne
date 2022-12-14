import Common from "../utility/Common";
import { CategoryRes } from "./Category";
import { PagedReq } from "./PagedReq";
import { ProductImageRes } from "./ProductImage";

export interface ProductRes {
  productId?: number;
  name?: string;
  code?: string;
  description?: string;
  position?: number;
  quantity?: number;
  rate?: number;
  categoryId?: number;
  unitId?: number;

  category?: CategoryRes;

  productImages?: ProductImageRes[];
}

export class ProductReqEdit {
  name?: string = "";
  code?: string = "";
  description?: string = "";
  position?: number = 10;
  quantity?: number = 0;
  rate?: number = 0;
  categoryId?: number = 0;
  unitId?: number = 0;

  constructor(categoryId?: number) {
    this.categoryId = categoryId;
  }
}

export enum StockStatus {
  InStock = 1,
  OutOfStock = 0,
  AllProducts = -1,
}

export class ProductReqSearch extends PagedReq {
  categoryId?: number;
  categoryCode?: string;
  stockStatus?: number;

  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    { categoryId = 0, categoryCode = "", stockStatus = StockStatus.AllProducts }
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.categoryId = categoryId;
    this.categoryCode = categoryCode;
    this.stockStatus = stockStatus;
  }
}
