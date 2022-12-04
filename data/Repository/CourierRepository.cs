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
    public class CourierRepository : RepositoryBase<Courier>, ICourierRepository
    {
        private readonly AppDbContext _appDbContext;
        public CourierRepository(AppDbContext context) : base(context)
        {
            _appDbContext = context;
        }

        public PagedList<Courier> Search(CourierReqSearch dto, bool trackChanges)
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
            return new PagedList<Courier>(entities, count,
                dto.PageNumber, dto.PageSize);
        }

        public PagedList<CourierResWithDeliveryPlansCount> SearchCouriersWithDeliveryPlansCount(
            CourierReqSearch dto, bool trackChanges)
        {
            var entities = GetQuery_SearchCouriersWithDeliveryPlansCount()
                .SearchWithDeliveryPlansCount(dto)
                .SortWithDeliveryPlansCount(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = GetQuery_SearchCouriersWithDeliveryPlansCount()
                .SearchWithDeliveryPlansCount(dto)
                .Count();
            return new PagedList<CourierResWithDeliveryPlansCount>(entities, count,
                dto.PageNumber, dto.PageSize);
        }

        private IQueryable<CourierResWithDeliveryPlansCount> GetQuery_SearchCouriersWithDeliveryPlansCount()
        {
            var query = (
                from c in _appDbContext.Couriers
                join d in _appDbContext.DeliveryPlans on c.CourierId equals d.CourierId into grouping
                from p in grouping.DefaultIfEmpty()
                group p by new { c.CourierId, c.Name } into g
                select new CourierResWithDeliveryPlansCount()
                {
                    CourierId = g.Key.CourierId,
                    Name = g.Key.Name,
                    DeliveryPlansCount = g.Count(x => x != null)
                }
                        );
            return query;
        }
    }
}
