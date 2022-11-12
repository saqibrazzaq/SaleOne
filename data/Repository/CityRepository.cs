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
    public class CityRepository : RepositoryBase<City>, ICityRepository
    {
        private readonly AppDbContext _db;
        public CityRepository(AppDbContext context) : base(context)
        {
            _db = context;
        }

        public CityResDetails GetCityDetails(int cityId)
        {
            var query = (
                from city in _db.Cities
                join state in _db.States on city.StateId equals state.StateId
                join country in _db.Countries on state.CountryId equals country.CountryId
                join address in _db.Addresses on city.CityId equals address.CityId into grouping
                from p in grouping.DefaultIfEmpty()
                group p by new
                {
                    city.CityId,
                    city.Name,
                    city.StateId,
                    StateName = state.Name,
                    country.CountryId,
                    CountryName = country.Name
                } into g
                select new CityResDetails()
                {
                    CityId = g.Key.CityId,
                    Name = g.Key.Name,
                    StateId = g.Key.StateId,
                    StateName = g.Key.StateName,
                    CountryId = g.Key.CountryId,
                    CountryName = g.Key.CountryName,
                    AddressesCount = g.Count(x => x != null)
                }
                )
                .Where(x => x.CityId == cityId)
                .FirstOrDefault();
            return query;
        }

        public PagedList<City> SearchCities(CityReqSearch dto, bool trackChanges)
        {
            var entities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges: false)
                .Search(dto)
                .Count();
            return new PagedList<City>(entities, count,
                dto.PageNumber, dto.PageSize);
        }

        public PagedList<CityResWithAddressesCount> SearchCitiesWithAreasCount(CityReqSearch dto, bool trackChanges)
        {
            var entities = GetQuery_SearchCitiesWithAreasCount()
                .SearchCitiesWithAreaCount(dto)
                .SortCitiesWithAreaCount(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = GetQuery_SearchCitiesWithAreasCount()
                .SearchCitiesWithAreaCount(dto)
                .Count();
            return new PagedList<CityResWithAddressesCount>(entities, count,
                dto.PageNumber, dto.PageSize);
        }

        private IQueryable<CityResWithAddressesCount> GetQuery_SearchCitiesWithAreasCount()
        {
            var query = (
                from city in _db.Cities
                join address in _db.Addresses on city.CityId equals address.CityId into grouping
                from p in grouping.DefaultIfEmpty()
                group p by new { city.CityId, city.Name, city.StateId } into g
                select new CityResWithAddressesCount()
                {
                    CityId = g.Key.CityId,
                    Name = g.Key.Name,
                    StateId = g.Key.StateId,
                    AddressesCount = g.Count(x => x != null)
                }
                );
            return query;
        }
    }
}
