﻿using api.Exceptions;
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

        public OrderRes GetOrder(int orderId)
        {
            var entity = FindOrderIfExists(orderId, false);
            var dto = _mapper.Map<OrderRes>(entity);
            return dto;
        }

        private Order FindOrderIfExists(int orderId, bool trackChanges)
        {
            var entity = _repositoryManager.OrderRepository.FindByCondition(
                x => x.OrderId == orderId, trackChanges,
                include: i => i.Include(x => x.User))
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

        public ApiOkPagedResponse<IEnumerable<OrderRes>, MetaData> SearchOrders(OrderReqSearch dto)
        {
            var pagedEntities = _repositoryManager.OrderRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<OrderRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<OrderRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }
    }
}