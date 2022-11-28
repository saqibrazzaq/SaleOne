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

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("search-orders")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Search(OrderReqSearch dto)
        {
            var res = _orderService.SearchOrders(dto);
            return Ok(res);
        }

        [HttpGet]
        [Authorize(Roles = Constants.AllRoles)]
        public IActionResult Default()
        {
            var res = _orderService.SearchOrders(new OrderReqSearch());
            return Ok(res);
        }

        [HttpPost]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateOrder(OrderReqEdit dto)
        {
            var res = await _orderService.CreateOrder(dto);
            return Ok(res);
        }
    }
}
