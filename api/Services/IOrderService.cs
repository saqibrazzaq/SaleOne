using data.Dtos;
using data.Utility.Paging;

namespace api.Services
{
    public interface IOrderService
    {
        ApiOkPagedResponse<IEnumerable<OrderRes>, MetaData>SearchOrders(
            OrderReqSearch dto);
        ApiOkPagedResponse<IEnumerable<OrderItemRes>, MetaData>SearchOrderItems(
            OrderItemReqSearch dto);
        int Count();
        int Count(string username);
        OrderRes GetOrder(int orderId);
        OrderItemRes GetOrderItem(int orderItemId);
        Task<OrderRes> CreateOrder(OrderReqEdit dto);
        
    }
}
