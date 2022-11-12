import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";

export interface CountryRes {
  countryId?: number;
  name?: string;
  code?: string;
}

export interface CountryResWithStatesCount extends CountryRes {
  statesCount?: number;
}

export class CountryReqEdit {
  name?: string = "";
  code?: string = "";
}

export class CountryReqSearch extends PagedReq {
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