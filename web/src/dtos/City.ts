import Common from "../utility/Common";
import { PagedReq } from "./PagedReq";
import { StateRes } from "./State";

export interface CityRes {
  cityId?: number;
  name?: string;
  stateId?: number;

  state?: StateRes;
}

export interface CityResWithAddressesCount extends CityRes {
  addressesCount?: number;
}

export interface CityResDetails extends CityRes {
  addressesCount?: number;
  stateName?: string;
  countryId?: number;
  countryName?: string;
}

export class CityReqEdit {
  name?: string = "";
  stateId?: number = 0;
  constructor(stateId?: number) {
    this.stateId = stateId;
  }
}

export class CityReqSearch extends PagedReq {
  stateId?: number;

  constructor(
    {
      pageNumber = 1,
      pageSize = Common.DEFAULT_PAGE_SIZE,
      orderBy,
      searchText = "",
    }: PagedReq,
    stateId = 0
  ) {
    super({
      pageNumber: pageNumber,
      pageSize: pageSize,
      orderBy: orderBy,
      searchText: searchText,
    });
    this.stateId = stateId;
  }
}