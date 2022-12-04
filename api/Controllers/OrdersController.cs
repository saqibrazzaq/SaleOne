using api.ActionFilters;
using api.Services;
using data.Dtos;
using data.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IUserService _userService;
        public OrdersController(IOrderService orderService, 
            IUserService userService)
        {
            _orderService = orderService;
            _userService = userService;
        }

        [HttpGet]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Default()
        {
            var res = _orderService.SearchOrders(new OrderReqSearch());
            return Ok(res);
        }

        [HttpGet("search")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Search([FromQuery] OrderReqSearch dto)
        {
            var res = _orderService.SearchOrders(dto);
            return Ok(res);
        }

        [HttpGet("{orderId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Get(int orderId)
        {
            var res = _orderService.Get(orderId);
            return Ok(res);
        }

        [HttpGet("myorders")]
        [Authorize(Roles = Constants.AllRoles)]
        public async Task<IActionResult> MyOrders([FromQuery] OrderReqSearch dto)
        {
            dto.UserId = (await _userService.GetLoggedInUser()).Id;
            var res = _orderService.SearchOrders(dto);
            return Ok(res);
        }

        [HttpGet("myorders/{orderId}")]
        [Authorize(Roles = Constants.AllRoles)]
        public async Task<IActionResult> GetMyOrder(int orderId)
        {
            var res = await _orderService.GetMyOrder(orderId);
            return Ok(res);
        }

        [HttpGet("myorders/items-search")]
        [Authorize(Roles = Constants.AllRoles)]
        public async Task<IActionResult> MyOrderItems([FromQuery] OrderItemReqSearch dto)
        {
            var res = await _orderService.SearchMyOrderItems(dto);
            return Ok(res);
        }

        [HttpGet("search-items")]
        [Authorize(Roles = Constants.AllRoles)]
        public IActionResult SearchItems([FromQuery] OrderItemReqSearch dto)
        {
            var res = _orderService.SearchOrderItems(dto);
            return Ok(res);
        }

        [HttpGet("recalculate-order-totals/{orderId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult RecalculateOrderTotals(int orderId)
        {
            _orderService.RecalculateOrderTotals(orderId); 
            return NoContent();
        }

        [HttpPost]
        [Authorize(Roles = Constants.AllRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateOrder(OrderReqEdit dto)
        {
            var res = await _orderService.CreateOrder(dto);
            return Ok(res);
        }

        [HttpPut("update-status/{orderId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult UpdateStatus(int orderId, OrderReqUpdateStatus dto)
        {
            var res = _orderService.UpdateStatus(orderId, dto);
            return Ok(res);
        }

        [HttpPut("myorders/update-payment-method/{orderId}")]
        [Authorize(Roles = Constants.AllRoles)]
        public async Task<IActionResult> UpdatePaymentMethod(int orderId, OrderReqUpdatePaymentMethod dto)
        {
            var res = await _orderService.UpdatePaymentMethodForMyOrder(orderId, dto);
            return Ok(res);
        }

        [HttpPost("add-order-item")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult AddOrderItem(OrderItemReqEdit dto)
        {
            var res = _orderService.AddOrderItem(dto);
            return Ok(res);
        }

        [HttpPut("update-order-item/{orderItemId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult UpdateOrderItem(int orderItemId, OrderItemReqEdit dto)
        {
            var res = _orderService.UpdateOrderItem(orderItemId, dto);
            return Ok(res);
        }

        [HttpDelete("delete-order-item/{orderItemId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult DeleteOrderItem(int orderItemId)
        {
            _orderService.DeleteOrderItem(orderItemId);
            return NoContent();
        }

        [HttpGet("count-by-payment-method/{paymentMethodId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult CountByPaymentMethod(int paymentMethodId)
        {
            var res = _orderService.CountByPaymentMethod(paymentMethodId);
            return Ok(res);
        }
    }
}
