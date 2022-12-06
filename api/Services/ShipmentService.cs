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
        public ShipmentService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public ShipmentRes Create(ShipmentReqEdit dto)
        {
            var entity = _mapper.Map<Shipment>(dto);
            _repositoryManager.ShipmentRepository.Create(entity);
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

        public ApiOkPagedResponse<IEnumerable<ShipmentRes>, MetaData> Search(ShipmentReqSearch dto, bool trackChanges)
        {
            var pagedEntities = _repositoryManager.ShipmentRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<ShipmentRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<ShipmentRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ApiOkPagedResponse<IEnumerable<ShipmentItemRes>, MetaData> SearchShipmentItems(ShipmentItemReqSearch dto, bool trackChanges)
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
    }
}
