using api.ActionFilters;
using api.Services;
using data.Dtos;
using data.Dtos.Auth;
using data.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Constants.AllRoles)]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("send-verification-email")]
        public async Task<IActionResult> SendVerificationEmail()
        {
            await _userService.SendVerificationEmail();
            return Ok("Verification email sent.");
        }

        [HttpPost("verify-email")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailRequestDto dto)
        {
            await _userService.VerifyEmail(dto);
            return Ok();
        }

        [HttpGet("info")]
        public async Task<IActionResult> GetUser()
        {
            var res = await _userService.GetLoggedInUser();
            return Ok(res);
        }

        [HttpPost("change-password")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> ChangePassword(
            [FromBody] ChangePasswordRequestDto dto)
        {
            await _userService.ChangePassword(dto);
            return Ok();
        }

        [HttpGet("search")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> SearchUsers(
            [FromQuery] UserReqSearch dto)
        {
            var res = await _userService.SearchUsers(
                dto, trackChanges: false);
            return Ok(res);
        }

        [HttpDelete("{email}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> DeleteUser(string? email)
        {
            await _userService.Delete(email);
            return Ok();
        }

        [HttpGet("{email}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> Get(string? email)
        {
            var res = await _userService.Get(email);
            return Ok(res);
        }

    }
}
