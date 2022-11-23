import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";

export interface UnitRes {
  unitId?: number;
  name?: string;
}

export class UnitReqEdit {
  name?: string = "";
}

export class UnitReqSearch extends PagedReq {
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
