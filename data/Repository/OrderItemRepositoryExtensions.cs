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
    public static class OrderItemRepositoryExtensions
    {
        public static IQueryable<OrderItem> Search(this IQueryable<OrderItem> items,
            OrderItemReqSearch searchParams)
        {
            var itemsToReturn = items
                //.Include(x => x.States)
                .Where(x => x.OrderId == searchParams.OrderId)
                .AsQueryable();

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                //string searchText = searchParams.SearchText.ToLower();
                //itemsToReturn = itemsToReturn.Where(
                //    x => (x.Name ?? "").Contains(searchParams.SearchText) ||
                //    (x.Code ?? "").Contains(searchParams.SearchText)
                //);
            }

            return itemsToReturn;
        }

        public static IQueryable<OrderItem> Sort(this IQueryable<OrderItem> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.OrderItemId);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<OrderItem>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.OrderItemId);

            return items.OrderBy(orderQuery);
        }
    }
}
