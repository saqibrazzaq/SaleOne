using data.Entities;
using data.Utility;
using Microsoft.AspNetCore.Identity;
using System.Net.NetworkInformation;

namespace api.Services
{
    public class AuthDataSeedService : IAuthDataSeedService
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<AppIdentityUser> _userManager;
        public AuthDataSeedService(RoleManager<IdentityRole> roleManager, 
            UserManager<AppIdentityUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public async Task Seed()
        {
            await AddDefaultRoles();
            AddDefaultUsers();
        }

        private async void AddDefaultUsers()
        {
            // Create/get user
            var ownerUser = await _userManager.FindByNameAsync(Constants.DefaultOwnerUsername);
            if (ownerUser == null)
            {
                var res = await _userManager.CreateAsync(new AppIdentityUser
                {
                    UserName = Constants.DefaultOwnerUsername,
                    Email = Constants.DefaultOwnerEmailAddress
                });
                if (res.Succeeded)
                {
                    ownerUser = await _userManager.FindByNameAsync(Constants.DefaultOwnerUsername);
                }
            }

            // set password
            var hasPassword = await _userManager.HasPasswordAsync(ownerUser);
            if (hasPassword == false)
            {
                var res = await _userManager.AddPasswordAsync(ownerUser, Constants.DefaultOwnerPassword);
            }

            // Set roles
            var roles = await _userManager.GetRolesAsync(ownerUser);
            var roleCount = roles.Where(x => x == Constants.OwnerRole).Count();
            if (roleCount == 0)
            {
                await _userManager.AddToRoleAsync(ownerUser, Constants.OwnerRole);
            }

        }

        private async Task AddDefaultRoles()
        {
            // Default roles which should exist
            var roleNames = Constants.AllRoles.Split(',');
            foreach (var roleName in roleNames)
            {
                // Add role, if it does not already exist
                var roleEntity = await _roleManager.FindByNameAsync(roleName);
                if (roleEntity == null)
                    await _roleManager.CreateAsync(new IdentityRole(roleName));
            }
        }
    }
}
