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
    public static class ShipmentRepositoryExtensions
    {
        public static IQueryable<Shipment> Search(this IQueryable<Shipment> items,
            ShipmentReqSearch searchParams)
        {
            var itemsToReturn = items
                //.Include(x => x.States)
                .AsQueryable();

            if (searchParams.OrderId != 0)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.OrderId == searchParams.OrderId);
            }

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

        public static IQueryable<Shipment> Sort(this IQueryable<Shipment> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.BookingDate);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Shipment>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.BookingDate);

            return items.OrderBy(orderQuery);
        }
    }
}
