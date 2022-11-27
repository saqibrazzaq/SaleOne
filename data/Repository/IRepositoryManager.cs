using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repository
{
    public interface IRepositoryManager
    {
        ICategoryRepository CategoryRepository { get; }
        IProductRepository ProductRepository { get; }
        ICartRepository CartRepository { get; }
        ICartItemRepository CartItemRepository { get; }
        IProductImageRepository ProductImageRepository { get; }
        IUnitRepository UnitRepository { get; }
        IAddressRepository AddressRepository { get; }
        IUserAddressRepository UserAddressRepository { get; }
        ICityRepository CityRepository { get; }
        IStateRepository StateRepository { get; }
        ICountryRepository CountryRepository { get; }
        IUserRepository UserRepository { get; }
        IPaymentMethodRepository PaymentMethodRepository { get; }
        void Save();
    }
}
