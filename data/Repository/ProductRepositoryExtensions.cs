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
    public static class ProductRepositoryExtensions
    {
        public static IQueryable<Product> Search(this IQueryable<Product> items,
            ProductReqSearch searchParams)
        {
            var itemsToReturn = items
                .Include(x => x.Category)
                .AsQueryable();

            if (searchParams.CategoryId > 0)
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.CategoryId == searchParams.CategoryId);
            }

            if (!string.IsNullOrWhiteSpace(searchParams.CategoryCode))
            {
                itemsToReturn = itemsToReturn.Where(
                    x => x.Category.Code == searchParams.CategoryCode);
            }

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                string searchText = searchParams.SearchText.ToLower();
                itemsToReturn = itemsToReturn.Where(
                    x => (x.Name ?? "").Contains(searchParams.SearchText) ||
                    (x.Code ?? "").Contains(searchParams.SearchText) ||
                    (x.Description ?? "").Contains(searchParams.SearchText)
                );
            }

            return itemsToReturn;
        }

        public static IQueryable<Product> Sort(this IQueryable<Product> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Position);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Product>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Position);

            return items.OrderBy(orderQuery);
        }
    }
}
