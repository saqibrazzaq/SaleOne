using api.Exceptions;
using AutoMapper;
using data.Dtos;
using data.Entities;
using data.Repository;
using data.Utility.Paging;

namespace api.Services
{
    public class UnitService : IUnitService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public UnitService(IRepositoryManager repositoryManager, 
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public int Count()
        {
            return _repositoryManager.UnitRepository.FindAll(false)
                .Count();
        }

        public UnitRes Create(UnitReqEdit dto)
        {
            var entity = _mapper.Map<Unit>(dto);
            _repositoryManager.UnitRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<UnitRes>(entity);
        }

        public void Delete(int unitId)
        {
            var entity = FindUnitIfExists(unitId);
            _repositoryManager.UnitRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private Unit FindUnitIfExists(int unitId)
        {
            var entity = _repositoryManager.UnitRepository.FindByCondition(
                x => x.UnitId == unitId, false)
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No unit found with id " + unitId);

            return entity;
        }

        public UnitRes Get(int unitId)
        {
            var entity = FindUnitIfExists(unitId);
            var dto = _mapper.Map<UnitRes>(entity);
            return dto;
        }

        public ApiOkPagedResponse<IEnumerable<UnitRes>, MetaData> Search(UnitReqSearch dto)
        {
            var pagedEntities = _repositoryManager.UnitRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<UnitRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<UnitRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public UnitRes Update(int unitId, UnitReqEdit dto)
        {
            var entity = FindUnitIfExists(unitId);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<UnitRes>(entity);
        }
    }
}
