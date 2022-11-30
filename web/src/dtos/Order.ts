import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";
import { UserRes } from "./User";

export interface OrderRes {
  orderId?: number;
  userId?: string;
  baseSubTotal?: number;
  orderDate?: Date;
  status?: number
  paymentMethodId?: number;

  user?: UserRes;
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
  status?: number;

  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    { userId = "", status = undefined }
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.userId = userId;
    this.status = status
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
