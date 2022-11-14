using data.Dtos;

namespace api.Services
{
    public interface IProductImageService
    {
        int Count(int productId);
        ProductImageRes Get(int productImageId);
        ProductImageRes Create(ProductImageReqEdit dto);
        void Delete(int productImageId);
    }
}
