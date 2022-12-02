using AutoMapper;
using data.Dtos;
using data.Entities;
using Microsoft.AspNetCore.Identity;
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

            // Unit
            CreateMap<Unit, UnitRes>();
            CreateMap<UnitReqEdit, Unit>();

            // Product images
            CreateMap<ProductImage, ProductImageRes>();
            CreateMap<ProductImageReqEdit, ProductImage>();

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

            // User
            CreateMap<AppIdentityUser, UserRes>();

            // Role
            CreateMap<IdentityRole, RoleRes>();

            // Cart
            CreateMap<Cart, CartRes>();
            CreateMap<CartItem, CartItemRes>();

            // Payment method
            CreateMap<PaymentMethod, PaymentMethodRes>();
            CreateMap<PaymentMethodReqEdit, PaymentMethod>();

            // Order address
            CreateMap<Address, OrderAddress>();

            // Order
            CreateMap<Order, OrderRes>();
            CreateMap<OrderItem, OrderItemRes>();
            CreateMap<OrderItemReqEdit, OrderItem>();
            CreateMap<OrderAddress, OrderAddressRes>();

            // Cart item to order item
            CreateMap<CartItemRes, OrderItem>();


        }
    }
}
