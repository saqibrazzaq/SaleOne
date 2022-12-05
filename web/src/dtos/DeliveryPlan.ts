import Common from "../utility/Common";
import { CourierRes } from "./Courier";
import { PagedReq } from "./PagedReq";

export interface DeliveryPlanRes {
  deliveryPlanId?: number;
  courierId?: number;
  courier?: CourierRes;
  name?: string;
  description?: string;
  fee?: number;
}

export class DeliveryPlanReqEdit {
  courierId?: number = 0;
  name?: string = "";
  description?: string = "";
  fee?: number = 0;

  constructor(courierId: number) {
    this.courierId = courierId;
  }
}

export class DeliveryPlanReqSearch extends PagedReq {
  courierId?: number;

  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    {courierId = 0}
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.courierId = courierId;
  }
}