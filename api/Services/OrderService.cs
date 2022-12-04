using api.Exceptions;
using AutoMapper;
using data.Dtos;
using data.Entities;
using data.Migrations;
using data.Repository;
using data.Utility.Paging;
using Microsoft.EntityFrameworkCore;

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

        public OrderRes Get(int orderId)
        {
            var entity = FindOrderIfExists(orderId, false);
            entity.Addresses.Add(GetOrderShippingAddress(orderId));
            entity.Addresses.Add(GetOrderBillingAddress(orderId));
            var dto = _mapper.Map<OrderRes>(entity);
            return dto;
        }

        public async Task<OrderRes> GetMyOrder(int orderId)
        {
            var entity = await FindMyOrderIfExists(orderId, false);
            entity.Addresses.Add(GetOrderShippingAddress(orderId));
            entity.Addresses.Add(GetOrderBillingAddress(orderId));
            var dto = _mapper.Map<OrderRes>(entity);
            return dto;
        }

        private OrderAddress GetOrderShippingAddress(int orderId)
        {
            var entity = _repositoryManager.OrderAddressRepository.FindByCondition(
                x => x.OrderId == orderId && x.IsShippingAddress == true,
                false,
                include: i => i.Include(x => x.City.State.Country))
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No shipping address found for id " + orderId);

            return entity;
        }

        private OrderAddress GetOrderBillingAddress(int orderId)
        {
            var entity = _repositoryManager.OrderAddressRepository.FindByCondition(
                x => x.OrderId == orderId && x.IsBillingAddress == true,
                false,
                include: i => i.Include(x => x.City.State.Country))
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No billing address found for id " + orderId);

            return entity;
        }

        private Order FindOrderIfExists(int orderId, bool trackChanges)
        {
            var entity = _repositoryManager.OrderRepository.FindByCondition(
                x => x.OrderId == orderId, trackChanges,
                include: i => i
                    .Include(x => x.User)
                    .Include(x => x.Addresses)
                    )
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No order found with id " + orderId);

            return entity;
        }

        private async Task<Order> FindMyOrderIfExists(int orderId, bool trackChanges)
        {
            var userId = (await _userService.GetLoggedInUser()).Id;
            var entity = _repositoryManager.OrderRepository.FindByCondition(
                x => x.OrderId == orderId && x.UserId == userId, 
                trackChanges,
                include: i => i
                    .Include(x => x.User)
                    .Include(x => x.Addresses)
                    )
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No order found with id " + orderId);

            return entity;
        }

        public OrderItemRes GetOrderItem(int orderItemId)
        {
            var entity = FindOrderItemIfExists(orderItemId, false);
            var dto = _mapper.Map<OrderItemRes>(entity);
            return dto;
        }

        private OrderItem FindOrderItemIfExists(int orderItemId, bool trackChanges)
        {
            var entity = _repositoryManager.OrderItemRepository.FindByCondition(
                x => x.OrderItemId == orderItemId, trackChanges)
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No order item found with id " + orderItemId);

            return entity;
        }

        public ApiOkPagedResponse<IEnumerable<OrderItemRes>, MetaData> SearchOrderItems(
            OrderItemReqSearch dto)
        {
            var pagedEntities = _repositoryManager.OrderItemRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<OrderItemRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<OrderItemRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public async Task<ApiOkPagedResponse<IEnumerable<OrderItemRes>, MetaData>> SearchMyOrderItems(
            OrderItemReqSearch dto)
        {
            await FindMyOrderIfExists(dto.OrderId, false);

            return SearchOrderItems(dto);
        }

        public ApiOkPagedResponse<IEnumerable<OrderRes>, MetaData> SearchOrders(OrderReqSearch dto)
        {
            var pagedEntities = _repositoryManager.OrderRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<OrderRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<OrderRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public OrderRes UpdateStatus(int orderId, OrderReqUpdateStatus dto)
        {
            ValidateStatus(dto.Status);
            var entity = FindOrderIfExists(orderId, true);
            entity.Status = dto.Status;
            _repositoryManager.Save();
            return _mapper.Map<OrderRes>(entity);
        }

        public async Task<OrderRes> UpdatePaymentMethodForMyOrder(int orderId, OrderReqUpdatePaymentMethod dto)
        {
            var entity = await FindMyOrderIfExists(orderId, true);
            entity.PaymentMethodId = dto.PaymentMethodId;
            _repositoryManager.Save();
            return _mapper.Map<OrderRes>(entity);
        }

        private void ValidateStatus(int status)
        {
            var found = false;
            foreach(var st in Enum.GetValues<OrderStatus>())
            {
                if ((int)st == status) found = true;
            }

            if (found == false) throw new BadRequestException("Invalid status " + status);
        }

        public OrderItemRes UpdateOrderItem(int orderItemId, OrderItemReqEdit dto)
        {
            var orderItem = FindOrderItemIfExists(orderItemId, true);
            var difference = -1*(orderItem.BasePrice) + (dto.Rate * dto.Quantity);
            UpdateOrderTotals(orderItem.OrderId, difference);
            _mapper.Map(dto, orderItem);
            orderItem.BasePrice = dto.Rate * dto.Quantity;
            _repositoryManager.Save();
            return _mapper.Map<OrderItemRes>(orderItem);
        }

        private void UpdateOrderTotals(int orderId, decimal difference)
        {
            var order = FindOrderIfExists(orderId, true);
            order.BaseSubTotal += difference;
        }

        public void DeleteOrderItem(int orderItemId)
        {
            var orderItem = FindOrderItemIfExists(orderItemId, true);
            UpdateOrderTotals(orderItem.OrderId, orderItem.BasePrice * -1);
            _repositoryManager.OrderItemRepository.Delete(orderItem);
            _repositoryManager.Save();
        }

        public void RecalculateOrderTotals(int orderId)
        {
            var order = FindOrderIfExists(orderId, true);
            decimal baseSubTotal = 0;
            var orderItems = _repositoryManager.OrderItemRepository.FindByCondition(
                x => x.OrderId == orderId, true);
            foreach(var orderItem in orderItems)
            {
                orderItem.BasePrice = orderItem.Rate * orderItem.Quantity;
                baseSubTotal += orderItem.BasePrice;
            }

            order.BaseSubTotal = baseSubTotal;

            _repositoryManager.Save();
        }

        public OrderItemRes AddOrderItem(OrderItemReqEdit dto)
        {
            var orderItem = _mapper.Map<OrderItem>(dto);
            orderItem.BasePrice = dto.Rate* dto.Quantity;
            UpdateOrderTotals(dto.OrderId, orderItem.BasePrice);
            _repositoryManager.OrderItemRepository.Create(orderItem);
            _repositoryManager.Save();
            return _mapper.Map<OrderItemRes>(orderItem);
        }

        public int CountByPaymentMethod(int paymentMethodId)
        {
            var count = _repositoryManager.OrderRepository.FindByCondition(
                x => x.PaymentMethodId == paymentMethodId, false)
                .Count();
            return count;
        }
    }
}
