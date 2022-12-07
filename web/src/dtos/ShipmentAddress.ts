import { CityRes } from "./City";

export interface ShipmentAddressRes {
  shipmentAddressId?: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  line1?: string;
  line2?: string;

  cityId?: number;
  city?: CityRes;
}

export class ShipmentAddressReqEdit {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  line1?: string;
  line2?: string;

  cityId?: number;
}

