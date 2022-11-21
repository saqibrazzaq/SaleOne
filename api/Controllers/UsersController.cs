using api.ActionFilters;
using api.Services;
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

    }
}
