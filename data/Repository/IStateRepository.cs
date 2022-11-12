using data.Dtos;
using data.Entities;
using data.Utility.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repository
{
    public interface IStateRepository : IRepositoryBase<State>
    {
        PagedList<State> SearchStates(StateReqSearch dto, bool trackChanges);
        PagedList<StateResWithCitiesCount> SearchStatesWithCitiesCount(StateReqSearch dto, bool trackChanges);
        StateResWithCountryAndCitiesCount GetStateWithCountryAndCitiesCount(int stateId);
    }
}
