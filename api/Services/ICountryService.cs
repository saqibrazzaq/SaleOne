using data.Dtos;
using data.Utility.Paging;

namespace api.Services
{
    public interface ICountryService
    {
        ApiOkPagedResponse<IEnumerable<CountryRes>, MetaData>
            SearchCountries(CountryReqSearch dto);
        ApiOkPagedResponse<IEnumerable<CountryResWithStatesCount>, MetaData>
            SearchCountriesWithStatesCount(CountryReqSearch dto);
        int Count();
        CountryRes Get(int countryId);
        CountryResWithStatesCount GetCountryWithStatesCount(int countryId);
        CountryRes Create(CountryReqEdit dto);
        CountryRes Update(int countryId, CountryReqEdit dto);
        void Delete(int countryId);

    }
}
