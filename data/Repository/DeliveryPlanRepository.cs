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
    public class DeliveryPlanRepository : RepositoryBase<DeliveryPlan>, IDeliveryPlanRepository
    {
        public DeliveryPlanRepository(AppDbContext context) : base(context)
        {
        }

        public PagedList<DeliveryPlan> Search(DeliveryPlanReqSearch dto, bool trackChanges)
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
            return new PagedList<DeliveryPlan>(entities, count,
                dto.PageNumber, dto.PageSize);
        }
    }
}
