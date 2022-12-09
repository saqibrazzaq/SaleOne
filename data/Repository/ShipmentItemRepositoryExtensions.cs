using data.Dtos;
using data.Entities;
using data.Utility.Paging;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;

namespace data.Repository
{
    public static class ShipmentItemRepositoryExtensions
    {
        public static IQueryable<ShipmentItem> Search(this IQueryable<ShipmentItem> items,
            ShipmentItemReqSearch searchParams)
        {
            var itemsToReturn = items
                //.Include(x => x.ShipmentAddress)
                .AsQueryable();

            itemsToReturn = itemsToReturn.Where(
                x => x.ShipmentId == searchParams.ShipmentId);

            //if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            //{
            //    string searchText = searchParams.SearchText.ToLower();
            //    itemsToReturn = itemsToReturn.Where(
            //        x => (x.Name ?? "").Contains(searchParams.SearchText) ||
            //        (x.Description ?? "").Contains(searchParams.SearchText)
            //    );
            //}

            return itemsToReturn;
        }

        public static IQueryable<ShipmentItem> Sort(this IQueryable<ShipmentItem> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.ShipmentItemId);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<ShipmentItem>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.ShipmentItemId);

            return items.OrderBy(orderQuery);
        }
    }
}
