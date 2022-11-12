using api.Exceptions;
using AutoMapper;
using data.Dtos;
using data.Entities;
using data.Repository;
using data.Utility.Paging;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class StateService : IStateService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public StateService(IRepositoryManager repositoryManager,
            IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public int Count()
        {
            return _repositoryManager.StateRepository.FindAll(false)
                .Count();
        }

        public int Count(int countryId)
        {
            return _repositoryManager.StateRepository.FindByCondition(
                x => x.CountryId == countryId,
                false)
                .Count();
        }

        public StateRes Create(StateReqEdit dto)
        {
            var entity = _mapper.Map<State>(dto);
            _repositoryManager.StateRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<StateRes>(entity);
        }

        public void Delete(int stateId)
        {
            var entity = FindStateIfExists(stateId, true);
            _repositoryManager.StateRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private State FindStateIfExists(int stateId, bool trackChanges)
        {
            var entity = _repositoryManager.StateRepository.FindByCondition(
                x => x.StateId == stateId,
                trackChanges,
                include: i => i.Include(x => x.Country))
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No state found with id " + stateId);

            return entity;
        }

        public StateRes FindById(int stateId)
        {
            var entity = FindStateIfExists(stateId, false);
            return _mapper.Map<StateRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<StateRes>, MetaData> SearchStates(StateReqSearch dto)
        {
            var pagedEntities = _repositoryManager.StateRepository.
                SearchStates(dto, false);
            var dtos = _mapper.Map<IEnumerable<StateRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<StateRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ApiOkPagedResponse<IEnumerable<StateResWithCitiesCount>, MetaData>
            SearchStatesWithCitiesCount(StateReqSearch dto)
        {
            var pagedEntities = _repositoryManager.StateRepository.
                SearchStatesWithCitiesCount(dto, false);
            var dtos = _mapper.Map<IEnumerable<StateResWithCitiesCount>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<StateResWithCitiesCount>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public StateRes Update(int stateId, StateReqEdit dto)
        {
            var entity = FindStateIfExists(stateId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<StateRes>(entity);
        }

        public StateResWithCountryAndCitiesCount GetStateWithCountryAndCitiesCount(int stateId)
        {
            var entity = _repositoryManager.StateRepository.GetStateWithCountryAndCitiesCount(stateId);
            if (entity == null) throw new NotFoundException("No state found with id " + stateId);
            return entity;
        }
    }
}
