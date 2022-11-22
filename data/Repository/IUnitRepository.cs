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
    public interface IUnitRepository : IRepositoryBase<Unit>
    {
        PagedList<Unit> Search(UnitReqSearch dto, bool trackChanges);
    }
}
