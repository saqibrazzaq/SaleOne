﻿using api.Exceptions;
using AutoMapper;
using data.Dtos;
using data.Dtos.Auth;
using data.Entities;
using data.Utility;
using mailer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace api.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<AppIdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IWebHostEnvironment _environment;
        private readonly IEmailSender _emailSender;
        public UserService(UserManager<AppIdentityUser> userManager, 
            RoleManager<IdentityRole> roleManager, 
            IConfiguration configuration, 
            IMapper mapper, 
            IHttpContextAccessor contextAccessor, 
            IWebHostEnvironment environment, 
            IEmailSender emailSender)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _mapper = mapper;
            _contextAccessor = contextAccessor;
            _environment = environment;
            _emailSender = emailSender;
        }


        public async Task<AuthenticationResponseDto> Login(LoginRequestDto dto)
        {
            // Authenticate user
            var userEntity = await AuthenticateUser(dto.Email, dto.Password);

            // If user/pwd are correct
            if (userEntity != null)
            {
                // Create response with access token
                var authRes = new AuthenticationResponseDto
                {
                    Email = userEntity.Email,
                    DisplayName = userEntity.UserName,
                    Roles = await _userManager.GetRolesAsync(userEntity),
                    EmailConfirmed = userEntity.EmailConfirmed,
                    AccountId = Guid.Parse(userEntity.Id)
                };

                // Generate access/refresh tokens
                authRes.RefreshToken = GenerateRefreshToken();
                authRes.AccessToken = await GenerateAccessToken(userEntity);
                // Update user
                userEntity.RefreshToken = authRes.RefreshToken;
                userEntity.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(
                    int.Parse(_configuration["JWT:RefreshTokenValidityInDays"]));
                var result = await _userManager.UpdateAsync(userEntity);

                return authRes;
            }
            else throw new UnAuthorizedUserException("Incorrect username/password");
        }

        public async Task<AuthenticationResponseDto> Register(RegisterRequestDto dto)
        {
            await CheckExistingEmailAndUsername(dto);

            // Create the user
            var userEntity = new AppIdentityUser
            {
                UserName = dto.Username,
                Email = dto.Email,
            };
            var result = await _userManager.CreateAsync(userEntity, dto.Password);

            if (result.Succeeded == false)
                throw new BadRequestException(GetFirstErrorFromIdentityResult(
                    result, nameof(Register)));

            // Add this user in User role
            var roleResult = await _userManager.AddToRoleAsync(
                userEntity, Constants.OwnerRole);
            if (roleResult.Succeeded == false)
                throw new BadRequestException(GetFirstErrorFromIdentityResult(
                    roleResult, nameof(Register)));

            //await SendVerificationEmailToUser(userEntity);

            return await Login(new LoginRequestDto { Email = dto.Email, Password = dto.Password });
        }

        private async Task CheckExistingEmailAndUsername(RegisterRequestDto dto)
        {
            // Email and username must not already exist
            if ((await checkIfEmailAlreadyExists(dto.Email)) == true)
                throw new BadRequestException($"Email {dto.Email} is already registered. Use Forgot password if you own this account.");
            if ((await checkIfUsernameAlreadyTaken(dto.Username)) == true)
                throw new BadRequestException($"Username {dto.Username} is already taken.");
        }

        private async Task<bool> checkIfEmailAlreadyExists(string? email)
        {
            var userEntity = await _userManager.FindByEmailAsync(email);
            // If email already exists, return true
            return userEntity != null ? true : false;
        }

        private async Task<bool> checkIfUsernameAlreadyTaken(string? username)
        {
            var userEntity = await _userManager.FindByNameAsync(username);
            // If username found, return true
            return userEntity != null ? true : false;
        }

        private string GetFirstErrorFromIdentityResult(IdentityResult result, string methodName)
        {
            var firstError = result.Errors.FirstOrDefault();
            if (firstError != null)
                return firstError.Description;
            else
                return methodName + " method failed";
        }

        public async Task<TokenDto> RefreshToken(TokenDto dto)
        {
            var principal = GetPrincipalFromExpiredToken(dto.AccessToken);
            if (principal == null || principal.Identity == null)
                throw new BadRequestException("Invalid access token or refresh token");

            string? username = principal.Identity.Name;

            var userEntity = await _userManager.FindByNameAsync(username);

            if (userEntity == null || userEntity.RefreshToken != dto.RefreshToken
                || userEntity.RefreshTokenExpiryTime <= DateTime.Now)
            {
                throw new BadRequestException("Invalid access token or refresh token");
            }

            var newAccessToken = CreateToken(principal.Claims.ToList());
            var newRefreshToken = GenerateRefreshToken();

            // Update user repository
            userEntity.RefreshToken = newRefreshToken;
            userEntity.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(
                   int.Parse(_configuration["JWT:RefreshTokenValidityInDays"]));
            var userResult = await _userManager.UpdateAsync(userEntity);
            if (userResult.Succeeded == false)
                throw new BadRequestException("Invalid token");

            return new TokenDto
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
                RefreshToken = newRefreshToken,
            };
        }

        public async Task SendForgotPasswordEmail(SendForgotPasswordEmailRequestDto dto)
        {
            // Verify email address
            var userEntity = await _userManager.FindByEmailAsync(dto.Email);
            if (userEntity == null)
                throw new NotFoundException("Email address not found.");

            // Create a token
            var forgotPasswordToken = await _userManager.GeneratePasswordResetTokenAsync(
                userEntity);
            // Generate forgot password email text
            string emailText = GenerateForgotPasswordEmailText(
                forgotPasswordToken);
            _emailSender.SendEmail(userEntity.Email,
                "Reset your password", emailText);
        }

        private string GenerateForgotPasswordEmailText(
            string token)
        {
            string emailText = $"Please use the token below for password reset. <br />" +
                $"{token} <br />";
            return emailText;
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken ||
                !jwtSecurityToken.Header.Alg.Equals(
                    SecurityAlgorithms.HmacSha256,
                    StringComparison.InvariantCultureIgnoreCase))
                throw new SecurityTokenException("Invalid token");

            return principal;

        }

        private async Task<AppIdentityUser?> AuthenticateUser(string? email, string? password)
        {
            // Find user
            var userEntity = await _userManager.FindByEmailAsync(email);
            if (userEntity == null)
                return null;

            // Check password
            var isAuthenticated = await _userManager.CheckPasswordAsync(userEntity, password);

            return isAuthenticated ? userEntity : null;
        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private async Task<string> GenerateAccessToken(AppIdentityUser user)
        {
            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            foreach (var userRole in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var token = CreateToken(authClaims);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private JwtSecurityToken CreateToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
            _ = int.TryParse(_configuration["JWT:TokenValidityInMinutes"], out int tokenValidityInMinutes);

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(tokenValidityInMinutes),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }

        public async Task<UserRes> GetLoggedInUser()
        {
            var userEntity = await _userManager.FindByNameAsync(UserName);
            if (userEntity == null)
                throw new NotFoundException("User not found");

            var userDto = _mapper.Map<UserRes>(userEntity);
            userDto.Roles = await _userManager.GetRolesAsync(userEntity);
            return userDto;
        }

        private string? UserName
        {
            get
            {
                if (_contextAccessor.HttpContext != null &&
                    _contextAccessor.HttpContext.User.Identity != null &&
                    string.IsNullOrWhiteSpace(_contextAccessor.HttpContext.User.Identity.Name) == false)
                    return _contextAccessor.HttpContext.User.Identity.Name;
                else
                    throw new UnauthorizedAccessException("User not logged in");
            }
        }
    }
}
