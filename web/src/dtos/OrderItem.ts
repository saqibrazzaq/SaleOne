import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";
import { ProductRes } from "./Product";
import { UnitRes } from "./Unit";

export interface OrderItemRes {
  orderItemId?: number;
  orderId?: number;
  productId?: number;
  product?: ProductRes;
  quantity?: number;
  shippedQuantity?: number;
  rate?: number;
  basePrice?: number;
  unitId?: number;
  unit?: UnitRes;
}

export class OrderItemReqEdit {
  orderId?: number = 0;
  productId?: number = 0;
  quantity?: number = 1;
  rate?: number = 1;
  basePrice?: number = 1;
  unitId?: number = 0;
}

export class OrderItemReqSearch extends PagedReq {
  orderId?: number;
  unshippedItems?: boolean;

  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    { orderId = 0, unshippedItems = false, }
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.orderId = orderId;
    this.unshippedItems = unshippedItems;
  }
}
