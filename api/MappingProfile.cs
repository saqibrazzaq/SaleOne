using AutoMapper;
using data.Dtos;
using data.Entities;
using System.Runtime.CompilerServices;

namespace api
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Category
            CreateMap<Category, CategoryRes>();
            CreateMap<CategoryReqEdit, Category>();

            // Product
            CreateMap<Product, ProductRes>();
            CreateMap<ProductReqEdit, Product>();
        }
    }
}
