using data.Dtos;
using data.Entities;
using data.Utility.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;

namespace data.Repository
{
    public static class DeliveryPlanRepositoryExtensions
    {
        public static IQueryable<DeliveryPlan> Search(this IQueryable<DeliveryPlan> items,
            DeliveryPlanReqSearch searchParams)
        {
            var itemsToReturn = items
                //.Include(x => x.States)
                .AsQueryable();

            itemsToReturn = itemsToReturn.Where(
                x => x.CourierId == searchParams.CourierId);

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                string searchText = searchParams.SearchText.ToLower();
                itemsToReturn = itemsToReturn.Where(
                    x => (x.Name ?? "").Contains(searchParams.SearchText) ||
                    (x.Description ?? "").Contains(searchParams.SearchText)
                );
            }

            return itemsToReturn;
        }

        public static IQueryable<DeliveryPlan> Sort(this IQueryable<DeliveryPlan> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Name);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<DeliveryPlan>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Name);

            return items.OrderBy(orderQuery);
        }
    }
}
