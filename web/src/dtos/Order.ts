import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";

export interface OrderRes {
  orderId?: number;
  username?: string;
  baseSubTotal?: number;
  orderDate?: Date;
  status?: number
  paymentMethodId?: number;
}

export class OrderReqEdit {
  paymentMethodId?: number;
  addressIdForShipping?: number;
  addressIdForBilling?: number;

  constructor(
    paymentMethodId?: number,
    addressIdForShipping?: number,
    addressIdForBilling?: number
  ) {
    this.paymentMethodId = paymentMethodId;
    this.addressIdForShipping = addressIdForShipping;
    this.addressIdForBilling = addressIdForBilling;
  }
}

export class OrderReqSearch extends PagedReq {
  userId?: string;

  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    { userId = "" }
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.userId = userId;
  }
}

export enum OrderStatus {
  Cancelled = 0,
  Pending = 1,
  Confirmed = 2,
  Shipping = 3,
  Delivered = 4,
  Complete = 10,
}
