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
    public class StatesController : ControllerBase
    {
        private readonly IStateService _stateService;

        public StatesController(IStateService stateService)
        {
            _stateService = stateService;
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] StateReqSearch dto)
        {
            var res = _stateService.SearchStates(dto);
            return Ok(res);
        }

        [HttpGet("searchStatesWithCitiesCount")]
        public IActionResult SearchStatesWithCitiesCount([FromQuery] StateReqSearch dto)
        {
            var res = _stateService.SearchStatesWithCitiesCount(dto);
            return Ok(res);
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _stateService.Count();
            return Ok(res);
        }

        [HttpGet("{stateId}")]
        public IActionResult FindById(int stateId)
        {
            var res = _stateService.FindById(stateId);
            return Ok(res);
        }

        [HttpGet("GetStateWithCountryAndCitiesCount/{stateId}")]
        public IActionResult GetStateWithCountryAndCitiesCount(int stateId)
        {
            var res = _stateService.GetStateWithCountryAndCitiesCount(stateId);
            return Ok(res);
        }

        [HttpPost]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Create(StateReqEdit dto)
        {
            var res = _stateService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{stateId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Update(int stateId, StateReqEdit dto)
        {
            var res = _stateService.Update(stateId, dto);
            return Ok(res);
        }

        [HttpDelete("{stateId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Delete(int stateId)
        {
            _stateService.Delete(stateId);
            return NoContent();
        }
    }
}
