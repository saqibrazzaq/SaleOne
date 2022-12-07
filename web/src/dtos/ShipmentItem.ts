import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";
import { ProductRes } from "./Product";
import { ShipmentRes } from "./Shipment";
import { UnitRes } from "./Unit";

export interface ShipmentItemRes {
  shipmentItemId?: number;
  shipmentId?: number;
  shipment?: ShipmentRes;
  productId?: number;
  product?: ProductRes;
  quantity?: number;
  unitId?: number;
  unit?: UnitRes;
}

export class ShipmentItemReqEdit {
  shipmentId?: number = 0;
  productId?: number = 0;
  quantity?: number = 0;
  unitId?: number = 0;
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
