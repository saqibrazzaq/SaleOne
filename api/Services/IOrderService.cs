using data.Dtos;
using data.Entities;
using data.Utility.Paging;

namespace api.Services
{
    public interface IOrderService
    {
        ApiOkPagedResponse<IEnumerable<OrderRes>, MetaData>SearchOrders(
            OrderReqSearch dto);
        ApiOkPagedResponse<IEnumerable<OrderItemRes>, MetaData>SearchOrderItems(
            OrderItemReqSearch dto);
        Task<ApiOkPagedResponse<IEnumerable<OrderItemRes>, MetaData>> SearchMyOrderItems(
            OrderItemReqSearch dto);
        int Count();
        int Count(string username);
        int CountByPaymentMethod(int paymentMethodId);
        OrderRes Get(int orderId);
        OrderAddressRes GetShippingAddress(int orderId);
        Task<OrderRes> GetMyOrder(int orderId);
        OrderItemRes GetOrderItem(int orderItemId);
        Task<OrderRes> CreateOrder(OrderReqEdit dto);
        OrderRes UpdateStatus(int orderId, OrderReqUpdateStatus dto);
        Task<OrderRes> UpdatePaymentMethodForMyOrder(int orderId, OrderReqUpdatePaymentMethod dto);
        OrderRes UpdatePaymentMethod(int orderId, OrderReqUpdatePaymentMethod dto);
        OrderItemRes AddOrderItem(OrderItemReqEdit dto);
        OrderItemRes UpdateOrderItem(int orderItemId, OrderItemReqEdit dto);
        void DeleteOrderItem(int orderItemId);
        void RecalculateOrderTotals(int orderId);
        Order FindOrderIfExists(int orderId, bool trackChanges);
    }
}
