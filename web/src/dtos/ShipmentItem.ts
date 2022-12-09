import Common from "../utility/Common";
import { OrderItemRes } from "./OrderItem";
import { PagedReq } from "./PagedReq";
import { ProductRes } from "./Product";
import { ShipmentRes } from "./Shipment";
import { UnitRes } from "./Unit";

export interface ShipmentItemRes {
  shipmentItemId?: number;
  shipmentId?: number;
  shipment?: ShipmentRes;
  orderItemId?: OrderItemRes;
  quantity?: number;
}

export class ShipmentItemReqEdit {
  shipmentId?: number = 0;
  orderItemId?: number = 0;
  quantity?: number = 0;

  constructor(shipmentId?: number, orderItemId?: number, quantity?: number) {
    this.shipmentId = shipmentId;
    this.orderItemId = orderItemId;
    this.quantity = quantity;
  }
}

export class ShipmentItemReqSearch extends PagedReq {
  shipmentId?: number;
  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    { shipmentId = 0 }
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.shipmentId = shipmentId;
  }
}
