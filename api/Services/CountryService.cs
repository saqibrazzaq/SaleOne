using api.Exceptions;
using AutoMapper;
using data.Dtos;
using data.Entities;
using data.Repository;
using data.Utility.Paging;

namespace api.Services
{
    public class CountryService : ICountryService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public CountryService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public int Count()
        {
            return _repositoryManager.CountryRepository.FindAll(false)
                .Count();
        }

        public CountryRes Create(CountryReqEdit dto)
        {
            var entity = _mapper.Map<Country>(dto);
            _repositoryManager.CountryRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<CountryRes>(entity);
        }

        public void Delete(int id)
        {
            var entity = FindCountryIfExists(id, true);
            _repositoryManager.CountryRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private Country FindCountryIfExists(int id, bool trackChanges)
        {
            var entity = _repositoryManager.CountryRepository.FindByCondition(
                x => x.CountryId == id,
                trackChanges)
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No country found with id " + id);

            return entity;
        }

        public CountryRes Get(int countryId)
        {
            var entity = FindCountryIfExists(countryId, false);
            return _mapper.Map<CountryRes>(entity);
        }

        public CountryResWithStatesCount GetCountryWithStatesCount(int countryId)
        {
            var entity = _repositoryManager.CountryRepository
                .GetCountryWithStatesCount(countryId);
            if (entity == null) throw new NotFoundException("No country found with id " + countryId);

            return entity;
        }

        public ApiOkPagedResponse<IEnumerable<CountryRes>, MetaData>
            SearchCountries(CountryReqSearch dto)
        {
            var pagedEntities = _repositoryManager.CountryRepository.
                SearchCountries(dto, false);
            var dtos = _mapper.Map<IEnumerable<CountryRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<CountryRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ApiOkPagedResponse<IEnumerable<CountryResWithStatesCount>, MetaData>
            SearchCountriesWithStatesCount(CountryReqSearch dto)
        {
            var pagedEntities = _repositoryManager.CountryRepository.
                SearchCountriesWithStatesCount(dto, false);
            var dtos = _mapper.Map<IEnumerable<CountryResWithStatesCount>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<CountryResWithStatesCount>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public CountryRes Update(int id, CountryReqEdit dto)
        {
            var entity = FindCountryIfExists(id, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<CountryRes>(entity);
        }


    }
}
