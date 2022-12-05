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

        [HttpGet("searchWithDeliveryPlansCount")]
        public IActionResult SearchWithDeliveryPlansCount([FromQuery] CourierReqSearch dto)
        {
            var res = _courierService.SearchWithDeliveryPlansCount(dto);
            return Ok(res);
        }

        [HttpGet("{courierId}")]
        public IActionResult Get(int courierId)
        {
            var res = _courierService.Get(courierId);
            return Ok(res);
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _courierService.Count();
            return Ok(res);
        }

        [HttpGet("deliveryplans/count/{courierId}")]
        public IActionResult CountDeliveryPlans(int courierId)
        {
            var res = _courierService.CountDeliveryPlans(courierId);
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

        [HttpGet("deliveryplans/search")]
        public IActionResult SearchDeliveryPlans([FromQuery] DeliveryPlanReqSearch dto)
        {
            var res = _courierService.SearchDeliveryPlans(dto);
            return Ok(res);
        }

        [HttpGet("deliveryplans/{deliveryPlanId}")]
        public IActionResult GetDeliveryPlan(int deliveryPlanId)
        {
            var res = _courierService.GetDeliveryPlan(deliveryPlanId);
            return Ok(res);
        }

        [HttpPost("deliveryplans")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult CreateDeliveryPlan(DeliveryPlanReqEdit dto)
        {
            var res = _courierService.CreateDeliveryPlan(dto);
            return Ok(res);
        }

        [HttpPut("deliveryplans/{deliveryPlanId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult UpdateDeliveryPlan(int deliveryPlanId, DeliveryPlanReqEdit dto)
        {
            var res = _courierService.UpdateDeliveryPlan(deliveryPlanId, dto);
            return Ok(res);
        }

        [HttpDelete("deliveryplans/{deliveryPlanId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult DeleteDeliveryPlan(int deliveryPlanId)
        {
            _courierService.DeleteDeliveryPlan(deliveryPlanId);
            return NoContent();
        }
    }
}
