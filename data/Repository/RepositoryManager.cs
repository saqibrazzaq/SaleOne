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
        public RepositoryManager(AppDbContext context)
        {
            _context = context;

            _categoryRepository = new Lazy<ICategoryRepository>(() =>
                new CategoryRepository(context));
        }

        public ICategoryRepository CategoryRepository => _categoryRepository.Value;

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
