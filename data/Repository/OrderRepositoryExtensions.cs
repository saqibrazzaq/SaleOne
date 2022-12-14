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
    public static class OrderRepositoryExtensions
    {
        public static IQueryable<Order> Search(this IQueryable<Order> items,
            OrderReqSearch searchParams)
        {
            var itemsToReturn = items
                .Include(x => x.User)
                .Include(x => x.PaymentMethod)
                .AsQueryable();

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                //string searchText = searchParams.SearchText.ToLower();
                //itemsToReturn = itemsToReturn.Where(
                //    x => (x.UserId ?? "").Contains(searchParams.SearchText)
                //);
            }

            if (string.IsNullOrWhiteSpace(searchParams.UserId) == false)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.UserId == searchParams.UserId);
            }

            if (searchParams.Status != 0)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.Status == searchParams.Status);
            }

            return itemsToReturn;
        }

        public static IQueryable<Order> Sort(this IQueryable<Order> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderByDescending(e => e.OrderId);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Order>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderByDescending(e => e.OrderId);

            return items.OrderBy(orderQuery);
        }
    }
}
