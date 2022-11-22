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
    public class UnitsController : ControllerBase
    {
        private readonly IUnitService _unitService;

        public UnitsController(IUnitService unitService)
        {
            _unitService = unitService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] UnitReqSearch dto)
        {
            var res = _unitService.Search(dto);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Default()
        {
            var res = _unitService.Search(new UnitReqSearch());
            return Ok(res);
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _unitService.Count();
            return Ok(res);
        }

        [HttpPost]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Create(UnitReqEdit dto)
        {
            var res = _unitService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{unitId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Update(int unitId, UnitReqEdit dto)
        {
            var res = _unitService.Update(unitId, dto);
            return Ok(res);
        }

        [HttpDelete("{unitId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Delete(int unitId)
        {
            _unitService.Delete(unitId);
            return NoContent();
        }
    }
}
