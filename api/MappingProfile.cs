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

            // Country
            CreateMap<Country, CountryRes>();
            CreateMap<CountryReqEdit, Country>();

            // State
            CreateMap<State, StateRes>();
            CreateMap<StateReqEdit, State>();

            // City
            CreateMap<City, CityRes>();
            CreateMap<CityReqEdit, City>();

            // Address
            CreateMap<Address, AddressRes>();
            CreateMap<AddressReqEdit, Address>();

            // User Address
            CreateMap<UserAddress, UserAddressRes>();
            CreateMap<UserAddressReqEdit, UserAddress>();
        }
    }
}
