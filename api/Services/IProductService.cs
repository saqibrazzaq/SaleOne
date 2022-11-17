using data.Dtos;
using data.Utility.Paging;

namespace api.Services
{
    public interface IProductService
    {
        ApiOkPagedResponse<IEnumerable<ProductRes>, MetaData>
            Search(ProductReqSearch dto);
        int Count();
        int Count(int categoryId);
        ProductRes Get(int productId);
        ProductRes Create(ProductReqEdit dto);
        ProductRes Update(int productId, ProductReqEdit dto);
        void Delete(int productId);

        // Images
        int CountImages(int productId);
        ProductImageRes GetImage(int productImageId);
        ProductImageRes CreateImage(int productId, IFormFile file, string tempFolderPath);
        void DeleteImage(int productImageId);
        void UpdateMainImage(ProductImageReqEditMainImage dto);
    }
}
