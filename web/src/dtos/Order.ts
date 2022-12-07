import Common from "../utility/Common";
import { CityRes } from "./City";
import { PagedReq } from "./PagedReq";
import { PaymentMethodRes } from "./PaymentMethod";
import { UserRes } from "./User";

export interface OrderRes {
  orderId?: number;
  userId?: string;
  baseSubTotal?: number;
  quantity?: number;
  shippedQuantity?: number;
  orderDate?: Date;
  status?: number;
  paymentMethodId?: number;

  paymentMethod?: PaymentMethodRes;
  user?: UserRes;
  addresses?: OrderAddressRes[];
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
    { userId = "", status = 0 }
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.userId = userId;
    this.status = status;
  }
}

export enum OrderStatus {
  Pending = 1,
  Confirmed = 2,
  Shipping = 3,
  Delivered = 4,
  Cancelled = 5,
  Complete = 10,
}

export class OrderReqUpdateStatus {
  status?: number = 0;

  constructor(status?: number) {
    this.status = status;
  }
}

export class OrderReqUpdatePaymentMethod {
  paymentMethodId?: number;

  constructor(paymentMethodId?: number) {
    this.paymentMethodId = paymentMethodId;
  }
}

export interface OrderAddressRes {
  orderAddressId?: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  line1?: string;
  line2?: string;

  cityId?: number;
  city?: CityRes;

  isShippingAddress?: boolean;
  isBillingAddress?: boolean;
}