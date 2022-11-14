using api.Exceptions;
using AutoMapper;
using data.Dtos;
using data.Entities;
using data.Repository;
using data.Utility.Paging;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class ProductService : IProductService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ProductService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public int Count()
        {
            return _repositoryManager.ProductRepository.FindAll(false)
                .Count();
        }

        public int Count(int categoryId)
        {
            return _repositoryManager.ProductRepository.FindByCondition(
                x => x.CategoryId == categoryId,
                false)
                .Count();
        }

        public ProductRes Create(ProductReqEdit dto)
        {
            var entity = _mapper.Map<Product>(dto);
            PerformValidationsForCreate(dto);
            _repositoryManager.ProductRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<ProductRes>(entity);
        }

        private void PerformValidationsForCreate(ProductReqEdit dto)
        {
            var codeAlreadyExists = _repositoryManager.ProductRepository.FindByCondition(
                x => x.Code == dto.Code,
                false)
                .Any();
            if (codeAlreadyExists)
                throw new InvalidOperationException("Product Code already exists.");
        }

        public void Delete(int productId)
        {
            var entity = FindProductIfExists(productId, true);
            _repositoryManager.ProductRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private Product FindProductIfExists(int productId, bool trackChanges)
        {
            var entity = _repositoryManager.ProductRepository.FindByCondition(
                x => x.ProductId == productId,
                trackChanges,
                include: i => i.Include(x => x.Category)
                )
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No product found with id " + productId);
            
            return entity;
        }

        public ProductRes Get(int productId)
        {
            var entity = FindProductIfExists(productId, false);
            return _mapper.Map<ProductRes>(entity);
        }

        public ApiOkPagedResponse<IEnumerable<ProductRes>, MetaData> Search(ProductReqSearch dto)
        {
            var pagedEntities = _repositoryManager.ProductRepository.
                Search(dto, false);
            var dtos = _mapper.Map<IEnumerable<ProductRes>>(pagedEntities);
            return new ApiOkPagedResponse<IEnumerable<ProductRes>, MetaData>(dtos,
                pagedEntities.MetaData);
        }

        public ProductRes Update(int productId, ProductReqEdit dto)
        {
            var entity = FindProductIfExists(productId, true);
            PerformValidationsForUpdate(productId, dto);
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<ProductRes>(entity);
        }

        private void PerformValidationsForUpdate(int productId, ProductReqEdit dto)
        {
            var codeAlreadyExists = _repositoryManager.ProductRepository.FindByCondition(
                x => x.Code == dto.Code && x.ProductId != productId,
                false)
                .Any();
            if (codeAlreadyExists)
                throw new InvalidOperationException("Product Code already exists.");
        }
    }
}
