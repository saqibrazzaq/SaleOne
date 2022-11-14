using api.Exceptions;
using AutoMapper;
using data.Dtos;
using data.Entities;
using data.Repository;

namespace api.Services
{
    public class ProductImageService : IProductImageService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        public ProductImageService(IRepositoryManager repositoryManager, IMapper mapper)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
        }

        public int Count(int productId)
        {
            return _repositoryManager.ProductImageRepository.FindByCondition(
                x => x.ProductId == productId,
                false)
                .Count();
        }

        public ProductImageRes Create(ProductImageReqEdit dto)
        {
            var entity = _mapper.Map<ProductImage>(dto);
            _repositoryManager.ProductImageRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<ProductImageRes>(entity);
        }

        public void Delete(int productImageId)
        {
            var entity = FindProductImageIfExists(productImageId, true);
            _repositoryManager.ProductImageRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private ProductImage FindProductImageIfExists(int productImageId, bool trackChanges)
        {
            var entity = _repositoryManager.ProductImageRepository.FindByCondition(
                x => x.ProductImageId == productImageId,
                trackChanges
                )
                .FirstOrDefault();
            if (entity == null) throw new NotFoundException("No image found with id " + productImageId);

            return entity;
        }

        public ProductImageRes Get(int productImageId)
        {
            var entity = FindProductImageIfExists(productImageId, false);
            return _mapper.Map<ProductImageRes>(entity);
        }
    }
}
