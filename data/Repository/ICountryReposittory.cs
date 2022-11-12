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
    public interface ICountryRepository : IRepositoryBase<Country>
    {
        PagedList<Country> SearchCountries(CountryReqSearch dto, bool trackChanges);
        PagedList<CountryResWithStatesCount> SearchCountriesWithStatesCount(CountryReqSearch dto, bool trackChanges);
        CountryResWithStatesCount GetCountryWithStatesCount(int countryId);
    }
}
