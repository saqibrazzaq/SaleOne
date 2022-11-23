using api.Exceptions;
using AutoMapper;
using data.Dtos;
using data.Entities;
using data.Repository;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class CartService : ICartService
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IProductService _productService;
        public CartService(IHttpContextAccessor contextAccessor,
            IRepositoryManager repositoryManager,
            IMapper mapper,
            IProductService productService)
        {
            _contextAccessor = contextAccessor;
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _productService = productService;
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

        public CartRes Get()
        {
            var entity = FindCartIfExists(false);
            return _mapper.Map<CartRes>(entity);
        }

        private Cart FindCartIfExists(bool trackChanges)
        {
            CreateCartIfNotExists();

            var entity = _repositoryManager.CartRepository.FindByCondition(
                x => x.Username == UserName, trackChanges
                )
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No cart found for " + UserName);

            entity.CartItems = _repositoryManager.CartItemRepository.FindByCondition(
                x => x.CartId == entity.CartId, false,
                include: i => i.Include(x => x.Product)
                ).ToList();
            if (entity.CartItems == null) entity.CartItems = new List<CartItem>();

            return entity;
        }

        private void CreateCartIfNotExists()
        {
            var entity = _repositoryManager.CartRepository.FindByCondition(
                x => x.Username == UserName,
                true
                )
                .FirstOrDefault();

            if (entity == null)
            {
                entity = new Cart() { Username = UserName };
                _repositoryManager.CartRepository.Create(entity);
                _repositoryManager.Save();
            }
        }

        public CartRes AddToCart(CartItemReqAddToCart dto)
        {
            var cart = FindCartIfExists(true);
            var product = _productService.Get(dto.ProductId);
            var item = new CartItem()
            {
                CartId = cart.CartId,
                ProductId = dto.ProductId,
                Quantity = dto.Quantity,
                Rate = product.Rate,
                BasePrice = product.Rate * dto.Quantity,
                UnitId = product.UnitId
            };
            cart.CartItems.Add(item);

            cart = CalculateTotals(cart);

            _repositoryManager.Save();

            return _mapper.Map<CartRes>(cart);
        }

        public CartRes UpdateItem(int cartItemId, CartItemReqEdit dto)
        {
            var cart = FindCartIfExists(true);
            var cartItem = FindCartItemIfExists(cart, cartItemId);
            var product = _productService.Get(cartItem.ProductId);
            cartItem.Quantity = dto.Quantity;
            cartItem.Rate = product.Rate;
            cartItem.BasePrice = product.Rate * dto.Quantity;

            cart = CalculateTotals(cart);

            _repositoryManager.Save();

            return _mapper.Map<CartRes>(cart);
        }

        private Cart CalculateTotals(Cart cart)
        {
            cart.BaseSubTotal = cart.CartItems
                .Sum(x => x.Rate * x.Quantity);
            return cart;
        }

        private CartItem FindCartItemIfExists(Cart cart, int cartItemId)
        {
            var cartItem = cart.CartItems
                .Where(x => x.CartItemId == cartItemId)
                .FirstOrDefault();
            if (cartItem == null) throw new NotFoundException("No item found with id " + cartItemId);

            return cartItem;
        }

        public CartRes DeleteItem(int cartItemId)
        {
            var cart = FindCartIfExists(true);
            var cartItem = FindCartItemIfExists(cart, cartItemId);

            cart.CartItems.Remove(cartItem);

            cart = CalculateTotals(cart);

            return _mapper.Map<CartRes>(cart);
        }
    }
}
