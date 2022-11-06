using data.Dtos;
using data.Entities;
using data.Utility.Paging;
using System.Linq.Dynamic.Core;

namespace data.Repository
{
    public static class CategoryRepositoryExtensions
    {
        public static IQueryable<Category> Search(this IQueryable<Category> items,
            CategoryReqSearch searchParams)
        {
            var itemsToReturn = items
                //.Include(x => x.State.Country)
                .AsQueryable();

            //if (searchParams.StateId > 0)
            //{
            //    itemsToReturn = itemsToReturn.Where(
            //        x => x.StateId == searchParams.StateId);
            //}

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                string searchText = searchParams.SearchText.ToLower();
                itemsToReturn = itemsToReturn.Where(
                    x => (x.Name ?? "").Contains(searchParams.SearchText)
                );
            }

            return itemsToReturn;
        }

        public static IQueryable<Category> Sort(this IQueryable<Category> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Name);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<Category>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Name);

            return items.OrderBy(orderQuery);
        }

        public static IQueryable<CategoryResWithProductsCount> SearchWithProductsCount(
            this IQueryable<CategoryResWithProductsCount> items,
            CategoryReqSearch searchParams)
        {
            var itemsToReturn = items
                //.Include(x => x.Variants)
                .AsQueryable();

            //if (searchParams.StateId > 0)
            //{
            //    itemsToReturn = itemsToReturn.Where(
            //        x => x.StateId == searchParams.StateId);
            //}

            if (string.IsNullOrWhiteSpace(searchParams.SearchText) == false)
            {
                string searchText = searchParams.SearchText.ToLower();
                itemsToReturn = itemsToReturn.Where(
                    x => (x.Name ?? "").Contains(searchParams.SearchText)
                );
            }

            return itemsToReturn;
        }

        public static IQueryable<CategoryResWithProductsCount> SortWithProductsCount(
            this IQueryable<CategoryResWithProductsCount> items,
            string? orderBy)
        {
            if (string.IsNullOrWhiteSpace(orderBy))
                return items.OrderBy(e => e.Name);

            var orderQuery = OrderQueryBuilder.CreateOrderQuery<CategoryResWithProductsCount>(orderBy);

            if (string.IsNullOrWhiteSpace(orderQuery))
                return items.OrderBy(e => e.Name);

            return items.OrderBy(orderQuery);
        }
    }
}
