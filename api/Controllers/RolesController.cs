using api.ActionFilters;
using AutoMapper;
using data.Dtos;
using data.Entities;
using data.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = Constants.AllAdminRoles)]
    public class RolesController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<AppIdentityUser> _userManager;
        private readonly IMapper _mapper;
        public RolesController(RoleManager<IdentityRole> roleManager,
            IMapper mapper,
            UserManager<AppIdentityUser> userManager)
        {
            _roleManager = roleManager;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var entities = _roleManager.Roles;
            var res = _mapper.Map<IEnumerable<RoleRes>>(entities);
            return Ok(res);
        }

        [HttpGet("{roleId}")]
        public async Task<IActionResult> Get(string roleId)
        {
            var entity = await _roleManager.FindByIdAsync(roleId);
            var dto = _mapper.Map<RoleRes>(entity);
            return Ok(dto);
        }

        //[HttpPut("{roleId}")]
        //[ServiceFilter(typeof(ValidationFilterAttribute))]
        //public async Task<IActionResult> Update(string roleId, RoleReqEdit dto)
        //{
        //    var entity = await _roleManager.FindByIdAsync(roleId);
        //    CannotModifyRoles(entity);
        //    _mapper.Map(dto, entity);
        //    var res = await _roleManager.UpdateAsync(entity);
        //    if (res.Succeeded == false)
        //    {
        //        throw new Exception(res.Errors.FirstOrDefault().Description);
        //    }
        //    return NoContent();
        //}

        //[HttpPost]
        //[ServiceFilter(typeof(ValidationFilterAttribute))]
        //public async Task<IActionResult> Create(RoleReqEdit dto)
        //{
        //    var entity = _mapper.Map<IdentityRole>(dto);
        //    var res = await _roleManager.CreateAsync(entity);
        //    if (res.Succeeded == false)
        //    {
        //        throw new Exception(res.Errors.FirstOrDefault().Description);
        //    }
        //    return NoContent();
        //}

        //[HttpDelete("{roleId}")]
        //public async Task<IActionResult> Delete(string roleId)
        //{
        //    var entity = await _roleManager.FindByIdAsync(roleId);
        //    ValidateRoleForDelete(entity);
        //    var res = await _roleManager.DeleteAsync(entity);
        //    if (res.Succeeded == false)
        //    {
        //        throw new Exception(res.Errors.FirstOrDefault().Description);
        //    }
        //    return NoContent();
        //}

        //private async Task ValidateRoleForDelete(IdentityRole entity)
        //{
        //    CannotModifyRoles(entity);

        //    var usersCount = await _userManager.GetUsersInRoleAsync(entity.Name);
        //    if (usersCount.Count > 0)
        //    {
        //        throw new Exception("Cannot delete " + entity.Name + ". There are " +
        //            usersCount + " users.");
        //    }
        //}

        //private void CannotModifyRoles(IdentityRole entity)
        //{
        //    if (entity.Name.Equals("owner", StringComparison.OrdinalIgnoreCase))
        //    {
        //        throw new Exception("Cannot update or delete Owner role");
        //    }

        //    if (entity.Name.Equals("admin", StringComparison.OrdinalIgnoreCase))
        //    {
        //        throw new Exception("Cannot update or delete Admin role");
        //    }
        //}

        
    }
}
