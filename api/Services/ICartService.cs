using data.Dtos;

namespace api.Services
{
    public interface ICartService
    {
        CartRes Get();
        CartRes AddItem(int productId, decimal quantity);
        CartRes UpdateItem(int cartItemId, decimal quantity);
        CartRes DeleteItem(int cartItemId);
    }
}
