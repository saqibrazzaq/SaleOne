using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        private readonly AppDbContext _context;
        private readonly Lazy<ICategoryRepository> _categoryRepository;
        private readonly Lazy<IProductRepository> _productRepository;
        private readonly Lazy<IProductImageRepository> _productImageRepository;
        private readonly Lazy<IAddressRepository> _addressRepository;
        private readonly Lazy<IUserAddressRepository> _userAddressRepository;
        private readonly Lazy<ICityRepository> _cityRepository;
        private readonly Lazy<IStateRepository> _stateRepository;
        private readonly Lazy<ICountryRepository> _countryRepository;
        
        public RepositoryManager(AppDbContext context)
        {
            _context = context;

            _categoryRepository = new Lazy<ICategoryRepository>(() =>
                new CategoryRepository(context));
            _productRepository = new Lazy<IProductRepository>(() =>
                new ProductRepository(context));
            _productImageRepository = new Lazy<IProductImageRepository>(() =>
                new ProductImageRepository(context));
            _addressRepository = new Lazy<IAddressRepository>(() =>
                new AddressRepository(context));
            _userAddressRepository = new Lazy<IUserAddressRepository>(() =>
                new UserAddressRepository(context));
            _cityRepository = new Lazy<ICityRepository>(() =>
                new CityRepository(context));
            _stateRepository = new Lazy<IStateRepository>(() =>
                new StateRepository(context));
            _countryRepository = new Lazy<ICountryRepository>(() =>
                new CountryRepository(context));
        }

        public ICategoryRepository CategoryRepository => _categoryRepository.Value;
        public IProductRepository ProductRepository => _productRepository.Value;
        public IAddressRepository AddressRepository => _addressRepository.Value;
        public IUserAddressRepository UserAddressRepository => _userAddressRepository.Value;
        public ICityRepository CityRepository => _cityRepository.Value;
        public IStateRepository StateRepository => _stateRepository.Value;
        public ICountryRepository CountryRepository => _countryRepository.Value;
        public IProductImageRepository ProductImageRepository => _productImageRepository.Value;

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
