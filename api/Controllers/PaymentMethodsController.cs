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
    public class PaymentMethodsController : ControllerBase
    {
        private readonly IPaymentMethodService _paymentMethodService;

        public PaymentMethodsController(IPaymentMethodService paymentMethodService)
        {
            _paymentMethodService = paymentMethodService;
        }

        [HttpGet]
        public IActionResult Default()
        {
            var res = _paymentMethodService.GetAll();
            return Ok(res);
        }

        [HttpGet("{paymentMethodId}")]
        public IActionResult Get(int paymentMethodId)
        {
            var res = _paymentMethodService.Get(paymentMethodId);
            return Ok(res);
        }

        [HttpPost]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Create(PaymentMethodReqEdit dto)
        {
            var res = _paymentMethodService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{paymentMethodId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Update(int paymentMethodId, PaymentMethodReqEdit dto)
        {
            var res = _paymentMethodService.Update(paymentMethodId, dto);
            return Ok(res);
        }

        [HttpDelete("{paymentMethodId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Delete(int paymentMethodId)
        {
            _paymentMethodService.Delete(paymentMethodId);
            return NoContent();
        }
    }
}
