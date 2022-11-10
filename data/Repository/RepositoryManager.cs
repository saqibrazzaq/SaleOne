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
        public RepositoryManager(AppDbContext context)
        {
            _context = context;

            _categoryRepository = new Lazy<ICategoryRepository>(() =>
                new CategoryRepository(context));
            _productRepository = new Lazy<IProductRepository>(() =>
                new ProductRepository(context));
        }

        public ICategoryRepository CategoryRepository => _categoryRepository.Value;
        public IProductRepository ProductRepository => _productRepository.Value;

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
