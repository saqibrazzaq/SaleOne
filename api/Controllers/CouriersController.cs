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
    public class CouriersController : ControllerBase
    {
        private readonly ICourierService _courierService;

        public CouriersController(ICourierService courierService)
        {
            _courierService = courierService;
        }

        [HttpGet]
        public IActionResult Default()
        {
            var res = _courierService.Search(new CourierReqSearch());
            return Ok(res);
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] CourierReqSearch dto)
        {
            var res = _courierService.Search(dto);
            return Ok(res);
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _courierService.Count();
            return Ok(res);
        }

        [HttpPost]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Create(CourierReqEdit dto)
        {
            var res = _courierService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{courierId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Update(int courierId, CourierReqEdit dto)
        {
            var res = _courierService.Update(courierId, dto);
            return Ok(res);
        }

        [HttpDelete("{courierId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Delete(int courierId)
        {
            _courierService.Delete(courierId);
            return NoContent();
        }

        [HttpGet("deliveryplan/search")]
        public IActionResult SearchDeliveryPlans([FromQuery] DeliveryPlanReqSearch dto)
        {
            var res = _courierService.SearchDeliveryPlans(dto);
            return Ok(res);
        }

        [HttpGet("deliveryplan/{deliveryPlanId}")]
        public IActionResult GetDeliveryPlan(int deliveryPlanId)
        {
            var res = _courierService.GetDeliveryPlan(deliveryPlanId);
            return Ok(res);
        }

        [HttpPost("deliveryplan")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult CreateDeliveryPlan(DeliveryPlanReqEdit dto)
        {
            var res = _courierService.CreateDeliveryPlan(dto);
            return Ok(res);
        }

        [HttpPut("deliveryplan/{deliveryPlanId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult UpdateDeliveryPlan(int deliveryPlanId, DeliveryPlanReqEdit dto)
        {
            var res = _courierService.UpdateDeliveryPlan(deliveryPlanId, dto);
            return Ok(res);
        }

        [HttpDelete("deliveryplan/{deliveryPlanId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult DeleteDeliveryPlan(int deliveryPlanId)
        {
            _courierService.DeleteDeliveryPlan(deliveryPlanId);
            return NoContent();
        }
    }
}
