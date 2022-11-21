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
    public class UserAddressesController : ControllerBase
    {
        private readonly IUserAddressService _userAddressService;

        public UserAddressesController(IUserAddressService userAddressService)
        {
            _userAddressService = userAddressService;
        }

        [HttpGet]
        public async Task<IActionResult> Default()
        {
            var res = await _userAddressService.GetAll();
            return Ok(res);
        }

        [HttpGet("{userAddressId}")]
        public IActionResult Get(int userAddressId)
        {
            var res = _userAddressService.Get(userAddressId);
            return Ok(res);
        }

        [HttpGet("getPrimary")]
        public async Task<IActionResult> GetPrimary()
        {
            var res = await _userAddressService.GetPrimary();
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Create(UserAddressReqEdit dto)
        {
            var res = await _userAddressService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{userAddressId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Update(int userAddressId, UserAddressReqEdit dto)
        {
            var res = await _userAddressService.Update(userAddressId, dto);
            return Ok(res);
        }

        [HttpDelete("{userAddressId}")]
        public IActionResult Delete(int userAddressId)
        {
            _userAddressService.Delete(userAddressId);
            return NoContent();
        }
    }
}
