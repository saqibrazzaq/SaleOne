using data.Dtos;
using data.Utility.Paging;

namespace api.Services
{
    public interface IUnitService
    {
        ApiOkPagedResponse<IEnumerable<UnitRes>, MetaData>
            Search(UnitReqSearch dto);
        int Count();
        UnitRes Get(int unitId);
        UnitRes Create(UnitReqEdit dto);
        UnitRes Update(int unitId, UnitReqEdit dto);
        void Delete(int unitId);
    }
}
