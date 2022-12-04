import Common from "../utility/Common";
import { DeliveryPlanRes } from "./DeliveryPlan";
import { PagedReq } from "./PagedReq";

export class CourierRes {
  courierId?: number;
  name?: string;
  description?: string;

  deliveryPlans?: DeliveryPlanRes[];
}

export class CourierResWithDeliveryPlansCount extends CourierRes {
  deliveryPlansCount?: number;
}

export class CourierReqEdit {
  name?: string = "";
  description?: string = "";
}

export class CourierReqSearch extends PagedReq {
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