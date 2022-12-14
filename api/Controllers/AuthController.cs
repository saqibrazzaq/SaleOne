using api.ActionFilters;
using api.Services;
using common;
using data.Dtos.Auth;
using data.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public AuthController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost("login")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
        {
            var res = await _userService.Login(dto);
            setRefreshTokenCookie(res.RefreshToken);
            return Ok(res);
        }

        [HttpPost("refresh-token")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> RefreshToken(
            [FromBody] TokenDto dto)
        {
            //dto.RefreshToken = Request.Cookies[Constants.RefreshTokenCookieName];
            var res = await _userService.RefreshToken(dto);
            setRefreshTokenCookie(res.RefreshToken);

            return Ok(res);
        }

        [HttpPost("register")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Register(
            [FromBody] RegisterRequestDto dto)
        {
            var res = await _userService.Register(dto);
            return Ok(res);
        }

        [HttpGet("send-forgot-password-email")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> SendForgotPasswordEmail(
            [FromQuery] SendForgotPasswordEmailRequestDto dto)
        {
            await _userService.SendForgotPasswordEmail(dto);
            return Ok();
        }

        [HttpPost("reset-password")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> ResetPassword
            ([FromBody] ResetPasswordRequestDto dto)
        {
            await _userService.ResetPassword(dto);
            return Ok();
        }

        private void setRefreshTokenCookie(string? refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTimeOffset.UtcNow.AddDays(int.Parse(
                    SecretUtility.JWTRefreshTokenValidityInDays)),
                SameSite = SameSiteMode.None,
                Secure = true
            };

            // Delete the refresh token cookie, if no token is passed
            if (string.IsNullOrEmpty(refreshToken))
            {
                Response.Cookies.Delete(Constants.RefreshTokenCookieName);
            }
            else
            {
                // Set the refresh token cookie
                Response.Cookies.Append(Constants.RefreshTokenCookieName,
                    refreshToken, cookieOptions);
            }

        }
    }
}
