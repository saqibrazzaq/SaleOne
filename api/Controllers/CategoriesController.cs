using api.ActionFilters;
using api.Services;
using data.Dtos;
using data.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoriesController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public IActionResult Default()
        {
            var res = _categoryService.Search(new CategoryReqSearch());
            return Ok(res);
        }

        [HttpGet("securetest")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult SecureTest()
        {
            return Ok("This method is secure");
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] CategoryReqSearch dto)
        {
            var res = _categoryService.Search(dto);
            return Ok(res);
        }

        [HttpGet("searchWithProductsCount")]
        public IActionResult SearchWithProductsCount([FromQuery] CategoryReqSearch dto)
        {
            var res = _categoryService.SearchWithProductsCount(dto);
            return Ok(res);
        }

        [HttpGet("{categoryId}")]
        public IActionResult Get(int categoryId)
        {
            var res = _categoryService.Get(categoryId);
            return Ok(res);
        }

        [HttpGet("detail/{categoryId}")]
        public IActionResult GetDetail(int categoryId)
        {
            var res = _categoryService.GetDetail(categoryId);
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Create(CategoryReqEdit dto)
        {
            var res = _categoryService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{categoryId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Update(int categoryId, CategoryReqEdit dto)
        {
            var res = _categoryService.Update(categoryId, dto);
            return Ok(res);
        }

        [HttpDelete("{categoryId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Delete(int categoryId)
        {
            _categoryService.Delete(categoryId);
            return NoContent();
        }
    }
}
