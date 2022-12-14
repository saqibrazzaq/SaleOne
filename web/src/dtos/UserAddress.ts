import { AddressReqEdit, AddressRes } from "./Address";

export interface UserAddressRes {
  userAddressId?: number;
  addressId?: number;
  address?: AddressRes;
  userId?: string;
  isPrimary?: boolean;
}

export class UserAddressReqEdit {
  isPrimary?: boolean = false;
  address?: AddressReqEdit;

  constructor() {
    this.address = new AddressReqEdit(0);
  }
}