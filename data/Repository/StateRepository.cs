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
    public class StateRepository : RepositoryBase<State>, IStateRepository
    {
        private readonly AppDbContext _appDbContext;
        public StateRepository(AppDbContext context) : base(context)
        {
            _appDbContext = context;
        }

        public StateResWithCountryAndCitiesCount GetStateWithCountryAndCitiesCount(int stateId)
        {
            var query = (
                from state in _appDbContext.States
                join country in _appDbContext.Countries on state.CountryId equals country.CountryId
                join city in _appDbContext.Cities on state.StateId equals city.StateId into grouping
                from p in grouping.DefaultIfEmpty()
                group p by new { state.StateId, state.Name, state.Code, state.CountryId, CountryName = country.Name } into g
                select new StateResWithCountryAndCitiesCount()
                {
                    StateId = g.Key.StateId,
                    Code = g.Key.Code,
                    Name = g.Key.Name,
                    CountryId = g.Key.CountryId,
                    CountryName = g.Key.CountryName,
                    CitiesCount = g.Count(x => x != null)
                }
                )
                .Where(x => x.StateId == stateId)
                .FirstOrDefault();
            return query;
        }

        public PagedList<State> SearchStates(
            StateReqSearch dto, bool trackChanges)
        {
            var entities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges)
                .Search(dto)
                .Count();
            return new PagedList<State>(entities, count,
                dto.PageNumber, dto.PageSize);
        }

        public PagedList<StateResWithCitiesCount> SearchStatesWithCitiesCount(
            StateReqSearch dto, bool trackChanges)
        {
            var entities = GetQuery_SearchStatesWithCitiesCount()
                .SearchStatesWithCitiesCount(dto)
                .SortStatesWithCitiesCount(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = GetQuery_SearchStatesWithCitiesCount()
                .SearchStatesWithCitiesCount(dto)
                .Count();
            return new PagedList<StateResWithCitiesCount>(entities, count,
                dto.PageNumber, dto.PageSize);
        }

        private IQueryable<StateResWithCitiesCount> GetQuery_SearchStatesWithCitiesCount()
        {
            var query = (
                from s in _appDbContext.States
                join c in _appDbContext.Cities on s.StateId equals c.StateId into grouping
                from p in grouping.DefaultIfEmpty()
                group p by new { s.StateId, s.Code, s.Name, s.CountryId } into g
                select new StateResWithCitiesCount()
                {
                    StateId = g.Key.StateId,
                    Code = g.Key.Code,
                    Name = g.Key.Name,
                    CountryId = g.Key.CountryId,
                    CitiesCount = g.Count(x => x != null)
                }
                );
            return query;
        }
    }
}
