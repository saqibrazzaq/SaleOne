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

        [HttpGet("search-orders")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Search([FromQuery] OrderReqSearch dto)
        {
            var res = _orderService.SearchOrders(dto);
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

        [HttpPost]
        [Authorize(Roles = Constants.AllRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> CreateOrder(OrderReqEdit dto)
        {
            var res = await _orderService.CreateOrder(dto);
            return Ok(res);
        }
    }
}
