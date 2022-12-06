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
    public class ShipmentItemRepository : RepositoryBase<ShipmentItem>, IShipmentItemRepository
    {
        public ShipmentItemRepository(AppDbContext context) : base(context)
        {
        }

        public PagedList<ShipmentItem> Search(ShipmentItemReqSearch dto, bool trackChanges)
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
            return new PagedList<ShipmentItem>(entities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}
