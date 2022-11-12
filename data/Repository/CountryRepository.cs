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
    public class CountryRepository : RepositoryBase<Country>, ICountryRepository
    {
        private readonly AppDbContext _appDbContext;
        public CountryRepository(AppDbContext context) : base(context)
        {
            _appDbContext = context;
        }

        public PagedList<Country> SearchCountries(CountryReqSearch dto, bool trackChanges)
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
            return new PagedList<Country>(entities, count,
                dto.PageNumber, dto.PageSize);
        }
        public PagedList<CountryResWithStatesCount> SearchCountriesWithStatesCount(CountryReqSearch dto, bool trackChanges)
        {
            var entities = GetQuery_SearchCountriesWithStatesCount()
                .SearchWithStatesCount(dto)
                .SortWithStatesCount(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = GetQuery_SearchCountriesWithStatesCount()
                .SearchWithStatesCount(dto)
                .Count();
            return new PagedList<CountryResWithStatesCount>(entities, count,
                dto.PageNumber, dto.PageSize);
        }

        private IQueryable<CountryResWithStatesCount> GetQuery_SearchCountriesWithStatesCount()
        {
            var query = (
                from c in _appDbContext.Countries
                join s in _appDbContext.States on c.CountryId equals s.CountryId into grouping
                from p in grouping.DefaultIfEmpty()
                group p by new { c.CountryId, c.Code, c.Name } into g
                select new CountryResWithStatesCount()
                {
                    CountryId = g.Key.CountryId,
                    Code = g.Key.Code,
                    Name = g.Key.Name,
                    StatesCount = g.Count(x => x != null)
                }
                        );
            return query;
        }

        public CountryResWithStatesCount GetCountryWithStatesCount(int countryId)
        {
            var query = (
                from c in _appDbContext.Countries
                join s in _appDbContext.States on c.CountryId equals s.CountryId into grouping
                from p in grouping.DefaultIfEmpty()
                group p by new { c.CountryId, c.Code, c.Name } into g
                select new CountryResWithStatesCount()
                {
                    CountryId = g.Key.CountryId,
                    Code = g.Key.Code,
                    Name = g.Key.Name,
                    StatesCount = g.Count(x => x != null)
                }
                        )
                        .Where(x => x.CountryId == countryId)
                        .FirstOrDefault();

            return query;
        }
    }
}
