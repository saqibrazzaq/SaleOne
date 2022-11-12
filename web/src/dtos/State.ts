import Common from "../utility/Common";
import { CountryRes } from "./Country";
import { PagedReq } from "./PagedReq";

export interface StateRes {
  stateId?: number;
  name?: string;
  code?: string;
  countryId?: number;
  country?: CountryRes;
}

export interface StateResWithCitiesCount extends StateRes {
  citiesCount?: number;
}

export interface StateResWithCountryAndCitiesCount extends StateRes {
  citiesCount?: number;
  countryName?: string;
}

export class StateReqEdit {
  name?: string = "";
  code?: string = "";
  countryId?: number = 0;
  constructor(countryId?: number) {
    this.countryId = countryId;
  }
}

export class StateReqSearch extends PagedReq {
  countryId?: number;

  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    countryId = 0
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.countryId = countryId;
  }
}
