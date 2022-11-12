using data.Dtos;
using data.Utility.Paging;

namespace api.Services
{
    public interface IStateService
    {
        ApiOkPagedResponse<IEnumerable<StateRes>, MetaData>
            SearchStates(StateReqSearch dto);
        ApiOkPagedResponse<IEnumerable<StateResWithCitiesCount>, MetaData>
            SearchStatesWithCitiesCount(StateReqSearch dto);
        int Count();
        int Count(int countryId);
        StateRes FindById(int stateId);
        StateResWithCountryAndCitiesCount GetStateWithCountryAndCitiesCount(int stateId);
        StateRes Create(StateReqEdit dto);
        StateRes Update(int stateId, StateReqEdit dto);
        void Delete(int stateId);
    }
}
