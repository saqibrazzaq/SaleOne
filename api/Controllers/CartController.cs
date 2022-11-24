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
    [Authorize(Roles = Constants.AllRoles)]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        public IActionResult Default()
        {
            var res = _cartService.Get();
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult AddToCart(CartItemReqAddToCart dto)
        {
            var res = _cartService.AddToCart(dto);
            return Ok(res);
        }

        [HttpDelete("{productId}")]
        public IActionResult DeleteItem(int productId)
        {
            var res = _cartService.DeleteItem(productId);
            return Ok(res);
        }
    }
}
