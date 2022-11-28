export interface OrderRes {
  orderId?: number;
  username?: string;
  baseSubTotal?: number;
  orderDate?: Date;
  paymentMethodId?: number;

}

export class OrderReqEdit {
  paymentMethodId?: number;
  addressIdForShipping?: number;
  addressIdForBilling?: number;

  constructor(paymentMethodId?: number, addressIdForShipping?: number,
    addressIdForBilling?: number) {
      this.paymentMethodId = paymentMethodId;
      this.addressIdForShipping = addressIdForShipping;
      this.addressIdForBilling = addressIdForBilling;
    }
}