using api.ActionFilters;
using api.Services;
using data.Dtos;
using data.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IWebHostEnvironment _environment;
        public ProductsController(IProductService productService, 
            IWebHostEnvironment environment)
        {
            _productService = productService;
            _environment = environment;
        }

        [HttpGet]
        public IActionResult Default()
        {
            var res = _productService.Search(new ProductReqSearch());
            return Ok(res);
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] ProductReqSearch dto)
        {
            var res = _productService.Search(dto);
            return Ok(res);
        }

        [HttpGet("images/count/{productId}")]
        public IActionResult GetImagesCount(int productId)
        {
            var res = _productService.CountImages(productId);
            return Ok(res);
        }

        [HttpGet("images/{productImageId}")]
        public IActionResult GetImage(int productImageId)
        {
            var res = _productService.GetImage(productImageId);
            return Ok(res);
        }

        [HttpPost("images/{productId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult CreateImage(int productId)
        {
            var res = _productService.CreateImage(productId, Request.Form.Files[0], TempFolderPath);
            return Ok(res);
        }

        public string TempFolderPath
        {
            get
            {
                return Path.Combine(_environment.WebRootPath, Constants.TempFolderName);
            }
        }

        [HttpDelete("images/{productImageId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult DeleteImage(int productImageId)
        {
            _productService.DeleteImage(productImageId);
            return NoContent();
        }

        [HttpGet("{productId}")]
        public IActionResult Get(int productId)
        {
            var res = _productService.Get(productId);
            return Ok(res);
        }

        [HttpPost]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Create(ProductReqEdit dto)
        {
            var res = _productService.Create(dto);
            return Ok(res);
        }

        [HttpPut("{productId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Update(int productId, ProductReqEdit dto)
        {
            var res = _productService.Update(productId, dto);
            return Ok(res);
        }

        [HttpDelete("{productId}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Delete(int productId)
        {
            _productService.Delete(productId);
            return NoContent();
        }

        [HttpGet("count")]
        public IActionResult Count()
        {
            var res = _productService.Count();
            return Ok(res);
        }
    }
}
