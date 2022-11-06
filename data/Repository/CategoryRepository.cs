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
    public class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        private readonly AppDbContext _db;
        public CategoryRepository(AppDbContext context) : base(context)
        {
            _db = context;
        }

        public PagedList<Category> Search(CategoryReqSearch dto, bool trackChanges)
        {
            var entities = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = FindAll(trackChanges: false)
                .Search(dto)
                .Count();
            return new PagedList<Category>(entities, count,
                dto.PageNumber, dto.PageSize);
        }

        public PagedList<CategoryResWithProductsCount> SearchWithProductsCount(CategoryReqSearch dto, bool trackChanges)
        {
            var entities = GetQuery_SearchWithProductsCount()
                .SearchWithProductsCount(dto)
                .SortWithProductsCount(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            var count = GetQuery_SearchWithProductsCount()
                .SearchWithProductsCount(dto)
                .Count();
            return new PagedList<CategoryResWithProductsCount>(entities, count,
                dto.PageNumber, dto.PageSize);
        }

        private IQueryable<CategoryResWithProductsCount> GetQuery_SearchWithProductsCount()
        {
            var query = (
                from category in _db.Categories
                join product in _db.Products on category.CategoryId equals product.CategoryId into grouping
                from p in grouping.DefaultIfEmpty()
                group p by new { category.CategoryId, category.Name } into g
                select new CategoryResWithProductsCount()
                {
                    CategoryId = g.Key.CategoryId,
                    Name = g.Key.Name,
                    ProductsCount = g.Count(x => x != null)
                }
                );
            return query;
        }
    }
}
