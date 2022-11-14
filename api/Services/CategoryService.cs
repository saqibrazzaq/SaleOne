using api.Exceptions;
using AutoMapper;
using data.Dtos;
using data.Entities;
using data.Repository;
using data.Utility.Paging;

namespace api.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IProductService _productService;
        public CategoryService(IRepositoryManager repositoryManager,
            IMapper mapper,
            IProductService productService)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _productService = productService;
        }

        public int Count()
        {
            return _repositoryManager.CategoryRepository.FindAll(false)
                .Count();
        }

        public CategoryRes Create(CategoryReqEdit dto)
        {
            var entity = _mapper.Map<Category>(dto);
            _repositoryManager.CategoryRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<CategoryRes>(entity);
        }

        public void Delete(int categoryId)
        {
            var entity = FindCategoryIfExists(categoryId, true);
            PerformValidationsForDelete(categoryId);
            _repositoryManager.CategoryRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private void PerformValidationsForDelete(int categoryId)
        {
            var productsCount = _productService.Count(categoryId);
            if (productsCount > 0)
                throw new InvalidOperationException("Cannot delete category, It has " +
                    productsCount + " product(s).");
        }

        private Category FindCategoryIfExists(int categoryId, bool trackChanges)
        {
            var entity = _repositoryManager.CategoryRepository.FindByCondition(
                x => x.CategoryId == categoryId,
                trackChanges)
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No category found with id " + categoryId);

            return entity;
        }

        public CategoryRes Get(int categoryId)
        {
            var entity = FindCategoryIfExists(categoryId, false);
            return _mapper.Map<CategoryRes>(entity);
        }

        public CategoryResWithProductsCount GetDetail(int categoryId)
        {
            var entity = _repositoryManager.CategoryRepository.GetDetail(categoryId);
            if (entity == null) throw new NotFoundException("No category found with id " + categoryId);
            return entity;
        }

        public ApiOkPagedResponse<IEnumerable<CategoryRes>, MetaData> 
            Search(CategoryReqSearch dto)
        {
            var pagedEntities = _repositoryManager.CategoryRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<CategoryRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<CategoryRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ApiOkPagedResponse<IEnumerable<CategoryResWithProductsCount>, MetaData> 
            SearchWithProductsCount(CategoryReqSearch dto)
        {
            var pagedEntities = _repositoryManager.CategoryRepository.
                SearchWithProductsCount(dto, false);
            var dtos = _mapper.Map<IEnumerable<CategoryResWithProductsCount>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<CategoryResWithProductsCount>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public CategoryRes Update(int categoryId, CategoryReqEdit dto)
        {
            var entity = FindCategoryIfExists(categoryId, true);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<CategoryRes>(entity);
        }
    }
}
