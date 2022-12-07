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
    [Authorize(Roles = Constants.AllAdminRoles)]
    public class ShipmentsController : ControllerBase
    {
        private readonly IShipmentService _shipmentService;

        public ShipmentsController(IShipmentService shipmentService)
        {
            _shipmentService = shipmentService;
        }

        [HttpGet]
        public IActionResult Default()
        {
            var res = _shipmentService.Search(new ShipmentReqSearch());
            return Ok(res);
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] ShipmentReqSearch dto)
        {
            var res = _shipmentService.Search(dto);
            return Ok(res);
        }

        [HttpGet("searchitems")]
        public IActionResult SearchItems([FromQuery] ShipmentItemReqSearch dto)
        {
            var res = _shipmentService.SearchShipmentItems(dto);
            return Ok(res);
        }

        [HttpGet("{shipmentId}")]
        public IActionResult Get(int shipmentId)
        {
            var res = _shipmentService.Get(shipmentId);
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Create(ShipmentReqEdit dto)
        {
            var res = _shipmentService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{shipmentId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Update(int shipmentId, ShipmentReqEdit dto)
        {
            var res = _shipmentService.Update(shipmentId, dto);
            return Ok(res);
        }

        [HttpDelete("{shipmentId}")]
        public IActionResult Delete(int shipmentId)
        {
            _shipmentService.Delete(shipmentId);
            return NoContent();
        }

        [HttpGet("item/{shipmentItemId}")]
        public IActionResult GetItem(int shipmentItemId)
        {
            var res = _shipmentService.GetShipmentItem(shipmentItemId);
            return Ok(res);
        }

        [HttpPost("item")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult CreateItem(ShipmentItemReqEdit dto)
        {
            var res = _shipmentService.CreateShipmentItem(dto);
            return Ok(res);
        }

        [HttpPut("item/{shipmentItemId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult UpdateItem(int shipmentItemId, ShipmentItemReqEdit dto)
        {
            var res = _shipmentService.UpdateShipmentItem(shipmentItemId, dto);
            return Ok(res); 
        }

        [HttpDelete("item/{shipmentItemId}")]
        public IActionResult DeleteItem(int shipmentItemId)
        {
            _shipmentService.DeleteShipmentItem(shipmentItemId);
            return NoContent();
        }
    }
}
