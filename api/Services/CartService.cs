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
            
            cart = AddItemToCart(cart, dto.ProductId);

            var product = _productService.Get(dto.ProductId);
            var item = cart.CartItems.Where(x => x.ProductId == dto.ProductId)
                .FirstOrDefault();
            item.CartId = cart.CartId;
            item.ProductId = dto.ProductId;
            item.Quantity = dto.Quantity;
            item.Rate = product.Rate;
            item.BasePrice = product.Rate * dto.Quantity;
            item.UnitId = product.UnitId;
            
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

        private Cart AddItemToCart(Cart cart, int productId)
        {
            var cartItem = cart.CartItems
                .Where(x => x.ProductId == productId)
                .FirstOrDefault();
            if (cartItem == null) cart.CartItems.Add(new CartItem()
            {
                ProductId = productId,
            });

            return cart;
        }

        public CartRes DeleteItem(int productId)
        {
            var cart = FindCartIfExists(true);
            var cartItem = cart.CartItems.Where(x => x.ProductId == productId)
                .FirstOrDefault();
            if (cartItem != null)
            {
                cart.CartItems.Remove(cartItem);
                cart = CalculateTotals(cart);
            }

            return _mapper.Map<CartRes>(cart);
        }
    }
}
