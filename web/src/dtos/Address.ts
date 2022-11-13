import { CityRes } from "./City";

export interface AddressRes {
  addressId?: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  line1?: string;
  line2?: string;

  cityId?: number;
  city?: CityRes;
}

export class AddressReqEdit {
  firstName?: string = "";
  lastName?: string = "";
  phoneNumber?: string = "";
  line1?: string = "";
  line2?: string = "";

  cityId?: number = 0;
  city?: CityRes;
  constructor(cityId?: number) {
    this.cityId = cityId;
  }
}