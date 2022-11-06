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
    public interface ICategoryRepository : IRepositoryBase<Category>
    {
        PagedList<Category> Search(CategoryReqSearch dto, bool trackChanges);
        PagedList<CategoryResWithProductsCount> SearchWithProductsCount(
            CategoryReqSearch dto, bool trackChanges);

    }
}
