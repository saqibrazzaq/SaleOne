using api.Exceptions;
using AutoMapper;
using data.Dtos;
using data.Entities;
using data.Repository;
using data.Utility.Paging;

namespace api.Services
{
    public class CourierService : ICourierService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;

        public CourierService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public int Count()
        {
            return _repositoryManager.CourierRepository.FindAll(false)
                .Count();
        }

        public CourierRes Create(CourierReqEdit dto)
        {
            var entity = _mapper.Map<Courier>(dto);
            _repositoryManager.CourierRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<CourierRes>(entity);
        }

        public void Delete(int courierId)
        {
            var entity = FindCourierIfExists(courierId, true);
            _repositoryManager.CourierRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private Courier FindCourierIfExists(int courierId, bool trackChanges)
        {
            var entity = _repositoryManager.CourierRepository.FindByCondition(
                x => x.CourierId == courierId, trackChanges)
                .FirstOrDefault();
            if (entity == null) { throw new NotFoundException("No courier found with id " + courierId); }

            return entity;
        }

        public CourierRes Get(int courierId)
        {
            var entity = FindCourierIfExists(courierId, false);
            var dto = _mapper.Map<CourierRes>(entity);
            return dto;
        }

        public ApiOkPagedResponse<IEnumerable<CourierRes>, MetaData> Search(CourierReqSearch dto)
        {
            var pagedEntities = _repositoryManager.CourierRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<CourierRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<CourierRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public CourierRes Update(int courierId, CourierReqEdit dto)
        {
            var entity = FindCourierIfExists(courierId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<CourierRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<DeliveryPlanRes>, MetaData> SearchDeliveryPlans(
            DeliveryPlanReqSearch dto)
        {
            var pagedEntities = _repositoryManager.DeliveryPlanRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<DeliveryPlanRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<DeliveryPlanRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public DeliveryPlanRes GetDeliveryPlan(int deliveryPlanId)
        {
            var entity = FindDeliveryPlanIfExists(deliveryPlanId, false);
            var dto = _mapper.Map<DeliveryPlanRes>(entity);
            return dto;
        }

        private DeliveryPlan FindDeliveryPlanIfExists(int deliveryPlanId, bool trackChanges)
        {
            var entity = _repositoryManager.DeliveryPlanRepository.FindByCondition(
                x => x.DeliveryPlanId == deliveryPlanId, trackChanges)
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No delivery plan found with id " + deliveryPlanId);

            return entity;
        }

        public int CountDeliveryPlans(int courierId)
        {
            return _repositoryManager.DeliveryPlanRepository.FindByCondition(
                x => x.CourierId == courierId, false)
                .Count();
        }

        public DeliveryPlanRes CreateDeliveryPlan(DeliveryPlanReqEdit dto)
        {
            var entity = _mapper.Map<DeliveryPlan>(dto);
            _repositoryManager.DeliveryPlanRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<DeliveryPlanRes>(entity);
        }

        public DeliveryPlanRes UpdateDeliveryPlan(int deliveryPlanId, DeliveryPlanReqEdit dto)
        {
            var entity = FindDeliveryPlanIfExists(deliveryPlanId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<DeliveryPlanRes>(entity);
        }

        public void DeleteDeliveryPlan(int deliveryPlanId)
        {
            var entity = FindDeliveryPlanIfExists(deliveryPlanId, true);
            _repositoryManager.DeliveryPlanRepository.Delete(entity);
            _repositoryManager.Save();
        }
    }
}
