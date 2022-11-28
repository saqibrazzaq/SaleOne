using api.Exceptions;
using AutoMapper;
using data.Dtos;
using data.Entities;
using data.Migrations;
using data.Repository;
using data.Utility.Paging;

namespace api.Services
{
    public class OrderService : IOrderService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly ICartService _cartService;
        private readonly IUserService _userService;
        public OrderService(IRepositoryManager repositoryManager,
            IMapper mapper,
            ICartService cartService,
            IUserService userService)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _cartService = cartService;
            _userService = userService;
        }

        public int Count()
        {
            return _repositoryManager.OrderRepository.FindAll(false)
                .Count();
        }

        public int Count(string username)
        {
            return _repositoryManager.OrderRepository.FindByCondition(
                x => x.UserId == username,
                false)
                .Count();
        }

        public async Task<OrderRes> CreateOrder(OrderReqEdit dto)
        {
            var entity = await CartToOrder(dto);
            _repositoryManager.OrderRepository.Create(entity);
            _cartService.EmptyCart(false);
            _repositoryManager.Save();
            return _mapper.Map<OrderRes>(entity);
        }

        private async Task<Order> CartToOrder(OrderReqEdit dto)
        {
            var cart = _cartService.Get();
            var order = new Order();
            order.PaymentMethodId = dto.PaymentMethodId;
            order.Addresses = GetShippingAndBillingAddresses(dto);
            order.OrderItems = GetOrderItemsFromCart(cart);
            order.BaseSubTotal = cart.BaseSubTotal;
            order.UserId = (await _userService.GetLoggedInUser()).Id;

            return order;
        }

        private ICollection<OrderItem>? GetOrderItemsFromCart(CartRes cart)
        {
            return _mapper.Map<IList<OrderItem>>(cart.CartItems);
        }

        private List<OrderAddress> GetShippingAndBillingAddresses(OrderReqEdit dto)
        {
            var addresses = new List<OrderAddress>();
            var shippingAddress = GetOrderAddress(dto.AddressIdForShipping, AddressType.Shipping);
            var billingAddress = GetOrderAddress(dto.AddressIdForBilling, AddressType.Billing);
            addresses.Add(shippingAddress);
            addresses.Add(billingAddress);

            return addresses;
        }

        private OrderAddress GetOrderAddress(int addressId, AddressType addressType)
        {
            var address = FindAddressIfExists(addressId);
            var orderAddress = _mapper.Map<OrderAddress>(address);
            if (addressType == AddressType.Shipping) orderAddress.IsShippingAddress = true;
            if (addressType == AddressType.Billing) orderAddress.IsBillingAddress = true;

            return orderAddress;
        }

        private Address FindAddressIfExists(int addressId)
        {
            var entity = _repositoryManager.AddressRepository.FindByCondition(
                x => x.AddressId == addressId,
                false
                ).FirstOrDefault();
            if (entity == null) throw new NotFoundException("No address found with id " + addressId);

            return entity;
        }

        public OrderRes GetOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public OrderItemRes GetOrderItem(int orderItemId)
        {
            throw new NotImplementedException();
        }

        public ApiOkPagedResponse<IEnumerable<OrderItemRes>, MetaData> SearchOrderItems(OrderItemReqSearch dto)
        {
            throw new NotImplementedException();
        }

        public ApiOkPagedResponse<IEnumerable<OrderRes>, MetaData> SearchOrders(OrderReqSearch dto)
        {
            throw new NotImplementedException();
        }
    }
}
