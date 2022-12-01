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
  rate?: number;
  basePrice?: number;
  unitId?: number;
  unit?: UnitRes;
}

export class OrderItemReqSearch extends PagedReq {
  orderId?: number;

  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    { orderId = 0 }
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.orderId = orderId;
  }
}
