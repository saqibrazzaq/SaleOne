using data.Dtos;
using data.Utility.Paging;

namespace api.Services
{
    public interface ICategoryService
    {
        ApiOkPagedResponse<IEnumerable<CategoryRes>, MetaData>
            Search(CategoryReqSearch dto);
        ApiOkPagedResponse<IEnumerable<CategoryResWithProductsCount>, MetaData>
            SearchWithProductsCount(CategoryReqSearch dto);
        int Count();
        CategoryRes GetById(int categoryId);
        CategoryRes Create(CategoryReqEdit dto);
        CategoryRes Update(int categoryId, CategoryReqEdit dto);
        void Delete(int categoryId);
    }
}
