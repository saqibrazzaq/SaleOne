export interface PaymentMethodRes {
  paymentMethodId?: number;
  name?: string;
  description?: string;
}

export class PaymentMethodReqEdit {
  name?: string = "";
  description?: string = "";
}