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
    public interface ICityRepository : IRepositoryBase<City>
    {
        PagedList<City> SearchCities(CityReqSearch dto, bool trackChanges);
        PagedList<CityResWithAddressesCount> SearchCitiesWithAreasCount(CityReqSearch dto, bool trackChanges);
        CityResDetails GetCityDetails(int cityId);
    }
}
