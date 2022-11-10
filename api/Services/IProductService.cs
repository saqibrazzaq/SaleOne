using data.Dtos;
using data.Utility.Paging;

namespace api.Services
{
    public interface IProductService
    {
        ApiOkPagedResponse<IEnumerable<ProductRes>, MetaData>
            Search(ProductReqSearch dto);
        int Count();
        ProductRes Get(int productId);
        ProductRes Create(ProductReqEdit dto);
        ProductRes Update(int productId, ProductReqEdit dto);
        void Delete(int productId);
    }
}
