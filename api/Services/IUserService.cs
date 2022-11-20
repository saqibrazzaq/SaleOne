using data.Dtos;
using data.Dtos.Auth;

namespace api.Services
{
    public interface IUserService
    {
        Task<AuthenticationResponseDto> Login(LoginRequestDto dto);
        Task<AuthenticationResponseDto> Register(RegisterRequestDto dto);
        Task<TokenDto> RefreshToken(TokenDto dto);
        Task<UserRes> GetLoggedInUser();
        Task SendForgotPasswordEmail(SendForgotPasswordEmailRequestDto dto);
        Task ResetPassword(ResetPasswordRequestDto dto);
        Task SendVerificationEmail();
        Task VerifyEmail(VerifyEmailRequestDto dto);
    }
}
