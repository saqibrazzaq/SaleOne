using AutoMapper;
using data.Dtos;
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
        private readonly IMapper _mapper;
        public RolesController(RoleManager<IdentityRole> roleManager, 
            IMapper mapper)
        {
            _roleManager = roleManager;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var roles = _roleManager.Roles;
            var res = _mapper.Map<IEnumerable<RoleRes>>(roles);
            return Ok(res);
        }
    }
}
