import { OrderStatus } from "../dtos/Order";

export default class Common {
  static readonly DEFAULT_PAGE_SIZE = 5;
  static readonly DEFAULT_PROFILE_PICTURE =
    "https://res.cloudinary.com/saqibrazzaq-com/image/upload/v1655799546/mypizzastore/profile/Circle-icons-profile.svg_pag9mo.png";

  static readonly ORDER_STATUS = [
    OrderStatus.Pending,
    OrderStatus.Confirmed,
    OrderStatus.Shipping,
    OrderStatus.Delivered,
    OrderStatus.Complete,
    OrderStatus.Cancelled,
  ];

  static formatDate(date: Date) {
    return date.toISOString().substring(0, 16);
  }
}
