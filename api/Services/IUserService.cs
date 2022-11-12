using data.Dtos;
using data.Dtos.Auth;

namespace api.Services
{
    public interface IUserService
    {
        Task<AuthenticationResponseDto> Login(LoginRequestDto dto);
        Task<TokenDto> RefreshToken(TokenDto dto);
        Task<UserRes> GetLoggedInUser();
    }
}
