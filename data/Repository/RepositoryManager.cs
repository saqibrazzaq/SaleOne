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
        private readonly Lazy<ICartRepository> _cartRepository;
        private readonly Lazy<ICartItemRepository> _cartItemRepository;
        private readonly Lazy<IProductImageRepository> _productImageRepository;
        private readonly Lazy<IAddressRepository> _addressRepository;
        private readonly Lazy<IUserAddressRepository> _userAddressRepository;
        private readonly Lazy<ICityRepository> _cityRepository;
        private readonly Lazy<IStateRepository> _stateRepository;
        private readonly Lazy<ICountryRepository> _countryRepository;
        private readonly Lazy<IUserRepository> _userRepository;
        private readonly Lazy<IUnitRepository> _unitRepository;
        private readonly Lazy<IPaymentMethodRepository> _paymentMethodRepository;
        private readonly Lazy<IOrderRepository> _orderRepository;
        private readonly Lazy<IOrderItemRepository> _orderItemRepository;
        private readonly Lazy<IOrderAddressRepository> _orderAddressRepository;
        private readonly Lazy<ICourierRepository> _courierRepository;
        private readonly Lazy<IDeliveryPlanRepository> _deliveryPlanRepository;
        private readonly Lazy<IShipmentRepository> _shipmentRepository;
        private readonly Lazy<IShipmentItemRepository> _shipmentItemRepository;
        private readonly Lazy<IShipmentAddressRepository> _shipmentAddressRepository;
        
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
            _userRepository = new Lazy<IUserRepository>(() =>
                new UserRepository(context));
            _unitRepository = new Lazy<IUnitRepository>(() =>
                new UnitRepository(context));
            _cartRepository = new Lazy<ICartRepository>(() =>
                new CartRepository(context));
            _cartItemRepository = new Lazy<ICartItemRepository>(() =>
                new CartItemRepository(context));
            _paymentMethodRepository = new Lazy<IPaymentMethodRepository>(() =>
                new PaymentMethodRepository(context));
            _orderRepository = new Lazy<IOrderRepository>(() =>
                new OrderRepository(context));
            _orderItemRepository = new Lazy<IOrderItemRepository>(() =>
                new OrderItemRepository(context));
            _orderAddressRepository = new Lazy<IOrderAddressRepository>(() =>
                new OrderAddressRepository(context));
            _courierRepository = new Lazy<ICourierRepository>(() =>
                new CourierRepository(context));
            _deliveryPlanRepository = new Lazy<IDeliveryPlanRepository>(() =>
                new DeliveryPlanRepository(context));
            _shipmentRepository = new Lazy<IShipmentRepository>(() =>
                new ShipmentRepository(context));
            _shipmentItemRepository = new Lazy<IShipmentItemRepository>(() =>
                new ShipmentItemRepository(context));
            _shipmentAddressRepository = new Lazy<IShipmentAddressRepository>(() =>
                new ShipmentAddressRepository(context));
        }

        public ICategoryRepository CategoryRepository => _categoryRepository.Value;
        public IProductRepository ProductRepository => _productRepository.Value;
        public IAddressRepository AddressRepository => _addressRepository.Value;
        public IUserAddressRepository UserAddressRepository => _userAddressRepository.Value;
        public ICityRepository CityRepository => _cityRepository.Value;
        public IStateRepository StateRepository => _stateRepository.Value;
        public ICountryRepository CountryRepository => _countryRepository.Value;
        public IProductImageRepository ProductImageRepository => _productImageRepository.Value;
        public IUserRepository UserRepository => _userRepository.Value;
        public IUnitRepository UnitRepository => _unitRepository.Value;
        public ICartRepository CartRepository => _cartRepository.Value;
        public ICartItemRepository CartItemRepository => _cartItemRepository.Value;
        public IPaymentMethodRepository PaymentMethodRepository => _paymentMethodRepository.Value;
        public IOrderRepository OrderRepository => _orderRepository.Value;
        public IOrderItemRepository OrderItemRepository => _orderItemRepository.Value;
        public IOrderAddressRepository OrderAddressRepository => _orderAddressRepository.Value;
        public ICourierRepository CourierRepository => _courierRepository.Value;
        public IDeliveryPlanRepository DeliveryPlanRepository => _deliveryPlanRepository.Value;
        public IShipmentRepository ShipmentRepository => _shipmentRepository.Value;
        public IShipmentItemRepository ShipmentItemRepository => _shipmentItemRepository.Value;
        public IShipmentAddressRepository ShipmentAddressRepository => _shipmentAddressRepository.Value;

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
