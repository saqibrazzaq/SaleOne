using api.Exceptions;
using AutoMapper;
using data.Dtos;
using data.Entities;
using data.Repository;

namespace api.Services
{
    public class PaymentMethodService : IPaymentMethodService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IOrderService _orderService;
        public PaymentMethodService(IRepositoryManager repositoryManager,
            IMapper mapper,
            IOrderService orderService)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _orderService = orderService;
        }

        public PaymentMethodRes Create(PaymentMethodReqEdit dto)
        {
            var entity = _mapper.Map<PaymentMethod>(dto);
            _repositoryManager.PaymentMethodRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<PaymentMethodRes>(entity);
        }

        public void Delete(int paymentMethodId)
        {
            var entity = FindPaymentMethodIfExists(paymentMethodId, true);
            ValidateDeletePaymentMethod(entity);
            _repositoryManager.PaymentMethodRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private void ValidateDeletePaymentMethod(PaymentMethod entity)
        {
            var ordersCount = _orderService.CountByPaymentMethod(entity.PaymentMethodId);
            if (ordersCount > 0) 
                throw new BadRequestException("Cannot delete Payment Method. It has " 
                    + ordersCount + " orders.");
        }

        private PaymentMethod FindPaymentMethodIfExists(int paymentMethodId, bool trackChanges)
        {
            var entity = _repositoryManager.PaymentMethodRepository.FindByCondition(
                x => x.PaymentMethodId == paymentMethodId,
                trackChanges
                ).FirstOrDefault();
            if (entity == null) throw new NotFoundException("No payment method found with id " + paymentMethodId);

            return entity;
        }

        public PaymentMethodRes Get(int paymentMethodId)
        {
            var entity = FindPaymentMethodIfExists(paymentMethodId, false);
            return _mapper.Map<PaymentMethodRes>(entity);
        }

        public IEnumerable<PaymentMethodRes> GetAll()
        {
            var entities = _repositoryManager.PaymentMethodRepository.FindAll(false);
            return _mapper.Map<IEnumerable<PaymentMethodRes>>(entities);
        }

        public PaymentMethodRes Update(int paymentMethodId, PaymentMethodReqEdit dto)
        {
            var entity = FindPaymentMethodIfExists(paymentMethodId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<PaymentMethodRes>(entity);
        }
    }
}
