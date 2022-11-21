using data.Dtos;
using data.Dtos.Auth;
using data.Utility.Paging;

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
        int Count();
        Task ChangePassword(ChangePasswordRequestDto dto);
        Task<ApiOkPagedResponse<IEnumerable<UserRes>, MetaData>>
            SearchUsers(UserReqSearch dto, bool trackChanges);
        Task<UserRes> Get(string? email);
        Task Delete(string? email);
    }
}
