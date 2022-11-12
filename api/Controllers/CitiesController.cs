using api.ActionFilters;
using api.Services;
using data.Dtos;
using data.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly ICityService _cityService;

        public CitiesController(ICityService cityService)
        {
            _cityService = cityService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] CityReqSearch dto)
        {
            var res = _cityService.SearchCities(dto);
            return Ok(res);
        }

        [HttpGet("searchCitiesWithAddressesCount")]
        public IActionResult SearchCitiesWithAddressesCount([FromQuery] CityReqSearch dto)
        {
            var res = _cityService.SearchCitiesWithAddressesCount(dto);
            return Ok(res);
        }

        [HttpGet("{cityId}")]
        public IActionResult FindById(int cityId)
        {
            var res = _cityService.FindById(cityId);
            return Ok(res);
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _cityService.Count();
            return Ok(res);
        }

        [HttpGet("GetCityDetails/{cityId}")]
        public IActionResult GetCityDetails(int cityId)
        {
            var res = _cityService.GetCityDetails(cityId);
            return Ok(res);
        }

        [HttpPost]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Create(CityReqEdit dto)
        {
            var res = _cityService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{cityId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Update(int cityId, CityReqEdit dto)
        {
            var res = _cityService.Update(cityId, dto);
            return Ok(res);
        }

        [HttpDelete("{cityId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Delete(int cityId)
        {
            _cityService.Delete(cityId);
            return NoContent();
        }
    }
}
