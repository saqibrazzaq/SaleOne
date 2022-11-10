import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";

export interface CategoryRes {
  categoryId?: number;
  name?: string;
  description?: string;
  code?: string;
  position?: number;
}

export interface CategoryResWithProductsCount extends CategoryRes {
  productsCount?: number;
}

export class CategoryReqEdit {
  name?: string = "";
  description?: string = "";
  code?: string = "";
  position?: number = 10;
}

export class CategoryReqSearch extends PagedReq {
  constructor({
    pageNumber = 1,
    pageSize = Common.DEFAULT_PAGE_SIZE,
    orderBy,
    searchText = "",
  }: PagedReq) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
  }
}