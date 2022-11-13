using api.Exceptions;
using AutoMapper;
using data.Dtos;
using data.Entities;
using data.Repository;
using data.Utility.Paging;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class CityService : ICityService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        
        public CityService(IRepositoryManager repositoryManager,
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public int Count()
        {
            return _repositoryManager.CityRepository.FindAll(false)
                .Count();
        }

        public int Count(int stateId)
        {
            return _repositoryManager.CityRepository.FindByCondition(
                x => x.StateId == stateId,
                false)
                .Count();
        }

        public CityRes Create(CityReqEdit dto)
        {
            var entity = _mapper.Map<City>(dto);
            _repositoryManager.CityRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<CityRes>(entity);
        }

        public void Delete(int cityId)
        {
            var entity = FindCityIfExists(cityId, true);
            PerformValidationsForDelete(cityId);
            _repositoryManager.CityRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private void PerformValidationsForDelete(int cityId)
        {
            var addressesCount = _repositoryManager.AddressRepository.FindByCondition(
                x => x.CityId == cityId,
                false)
                .Count();
            if (addressesCount > 0)
                throw new InvalidOperationException("Cannot delete city, It has " +
                    addressesCount + " addresses.");
        }

        private City FindCityIfExists(int cityId, bool trackChanges)
        {
            var entity = _repositoryManager.CityRepository.FindByCondition(
                x => x.CityId == cityId,
                trackChanges,
                include: i => i.Include(x => x.State.Country))
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No city found with id " + cityId);

            return entity;
        }

        public CityRes FindById(int cityId)
        {
            var entity = FindCityIfExists(cityId, false);
            return _mapper.Map<CityRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<CityRes>, MetaData> SearchCities(CityReqSearch dto)
        {
            var pagedEntities = _repositoryManager.CityRepository.
                SearchCities(dto, false);
            var dtos = _mapper.Map<IEnumerable<CityRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<CityRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public CityRes Update(int cityId, CityReqEdit dto)
        {
            var entity = FindCityIfExists(cityId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<CityRes>(entity);
        }

        public CityResDetails GetCityDetails(int cityId)
        {
            var entity = _repositoryManager.CityRepository.GetCityDetails(cityId);
            if (entity == null) throw new NotFoundException("No city found with id " + cityId);
            return entity;
        }

        public ApiOkPagedResponse<IEnumerable<CityResWithAddressesCount>, MetaData> 
            SearchCitiesWithAddressesCount(CityReqSearch dto)
        {
            var pagedEntities = _repositoryManager.CityRepository.
                SearchCitiesWithAreasCount(dto, false);
            var dtos = _mapper.Map<IEnumerable<CityResWithAddressesCount>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<CityResWithAddressesCount>, MetaData>(dtos,
                pagedEntities.MetaData);
        }
    }
}
