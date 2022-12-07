import Common from "../utility/Common";
import { DeliveryPlanRes } from "./DeliveryPlan";
import { OrderRes } from "./Order";
import { PagedReq } from "./PagedReq";
import { ShipmentAddressRes } from "./ShipmentAddress";
import { ShipmentItemRes } from "./ShipmentItem";

export interface ShipmentRes {
  shipmentId?: number;
  orderId?: number;
  order?: OrderRes;
  trackingNumber?: string;
  deliveryPlanId?: number;
  deliveryPlan?: DeliveryPlanRes;
  bookingDate?: Date;
  deliveryDate?: Date;
  shipmentAddressId?: number;
  shipmentAddress?: ShipmentAddressRes;

  shipmentItems?: ShipmentItemRes[];
}

export class ShipmentReqCreate {
  orderId?: number = 0;
  trackingNumber?: string = "";
  deliveryPlanId?: number = 0;
}

export class ShipmentReqEdit {
  orderId?: number = 0;
  trackingNumber?: string = "";
  deliveryPlanId?: number = 0;
  deliveryDate?: Date = new Date();
}

export class ShipmentItemReqSearch extends PagedReq {
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