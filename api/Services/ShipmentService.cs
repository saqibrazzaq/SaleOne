using api.Exceptions;
using AutoMapper;
using data.Dtos;
using data.Entities;
using data.Repository;
using data.Utility.Paging;

namespace api.Services
{
    public class ShipmentService : IShipmentService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IOrderService _orderService;
        public ShipmentService(IRepositoryManager repositoryManager,
            IMapper mapper,
            IOrderService orderService)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _orderService = orderService;
        }

        public ShipmentRes Create(ShipmentReqCreate dto)
        {
            var entity = _mapper.Map<Shipment>(dto);
            _repositoryManager.ShipmentRepository.Create(entity);
            var orderShippingAddress = _orderService.GetShippingAddress(entity.OrderId);
            entity.ShipmentAddress = _mapper.Map<ShipmentAddress>(orderShippingAddress);
            _repositoryManager.Save();
            return _mapper.Map<ShipmentRes>(entity);
        }

        public ShipmentItemRes CreateShipmentItem(ShipmentItemReqEdit dto)
        {
            var entity = _mapper.Map<ShipmentItem>(dto);
            _repositoryManager.ShipmentItemRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<ShipmentItemRes>(entity);
        }

        public void Delete(int shipmentId)
        {
            var entity = FindShipmentIfExists(shipmentId, true);
            _repositoryManager.ShipmentRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private Shipment FindShipmentIfExists(int shipmentId, bool trackChanges)
        {
            var entity = _repositoryManager.ShipmentRepository.FindByCondition(
                x => x.ShipmentId == shipmentId, trackChanges)
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No shipment found with id " + shipmentId);

            return entity;
        }

        public void DeleteShipmentItem(int shipmentItemId)
        {
            var entity = FindShipmentItemIfExists(shipmentItemId, true);
            _repositoryManager.ShipmentItemRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private ShipmentItem FindShipmentItemIfExists(int shipmentItemId, bool trackChanges)
        {
            var entity = _repositoryManager.ShipmentItemRepository.FindByCondition(
                x => x.ShipmentItemId == shipmentItemId, trackChanges)
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No shipment item found with id " + shipmentItemId);

            return entity;
        }

        public ShipmentRes Get(int shipmentId)
        {
            var entity = FindShipmentIfExists (shipmentId, false);
            return _mapper.Map<ShipmentRes>(entity);
        }

        public ShipmentItemRes GetShipmentItem(int shipmentItemId)
        {
            var entity = FindShipmentItemIfExists(shipmentItemId, false);
            return _mapper.Map<ShipmentItemRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<ShipmentRes>, MetaData> Search(ShipmentReqSearch dto)
        {
            var pagedEntities = _repositoryManager.ShipmentRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<ShipmentRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<ShipmentRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ApiOkPagedResponse<IEnumerable<ShipmentItemRes>, MetaData> SearchShipmentItems(ShipmentItemReqSearch dto)
        {
            var pagedEntities = _repositoryManager.ShipmentItemRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<ShipmentItemRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<ShipmentItemRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ShipmentRes Update(int shipmentId, ShipmentReqEdit dto)
        {
            var entity = FindShipmentIfExists(shipmentId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<ShipmentRes>(entity);
        }

        public ShipmentItemRes UpdateShipmentItem(int shipmentItemId, ShipmentItemReqEdit dto)
        {
            var entity = FindShipmentItemIfExists(shipmentItemId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<ShipmentItemRes>(entity);
        }

        public ShipmentRes CreateFromOrder(int orderId)
        {
            var order = _orderService.FindOrderIfExists(orderId, true);
            var unshippedItems = GetUnshippedOrderItems(orderId);
            if (unshippedItems.Count() == 0) throw new BadRequestException("No items to ship from order " + orderId);
            var address = _mapper.Map<ShipmentAddress>(_orderService.GetShippingAddress(orderId));
            var shipment = new Shipment()
            {
                OrderId = orderId,
                ShipmentAddress = address
            };
            var shipmentItems = new List<ShipmentItem>();
            foreach(var orderItem in unshippedItems)
            {
                shipmentItems.Add(new ShipmentItem()
                {
                    OrderItemId = orderItem.OrderItemId,
                    Quantity = orderItem.Quantity - orderItem.ShippedQuantity
                });
                orderItem.ShippedQuantity = orderItem.Quantity;
            }
            shipment.ShipmentItems= shipmentItems;
            _repositoryManager.ShipmentRepository.Create(shipment);
            order.ShippedQuantity = order.Quantity;
            _repositoryManager.Save();
            return _mapper.Map<ShipmentRes>(shipment);

        }

        private IEnumerable<OrderItem> GetUnshippedOrderItems(int orderId)
        {
            var items = _repositoryManager.OrderItemRepository.FindByCondition(
                x => x.OrderId == orderId && x.Quantity > x.ShippedQuantity, true);
            return items;
        }
    }
}
