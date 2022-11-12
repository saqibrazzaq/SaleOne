using api.Exceptions;
using AutoMapper;
using data.Dtos;
using data.Entities;
using data.Repository;
using Microsoft.EntityFrameworkCore;

namespace api.Services
{
    public class UserAddressService : IUserAddressService
    {
        private readonly IRepositoryManager _repositoryManager;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        public UserAddressService(IRepositoryManager repositoryManager,
            IMapper mapper,
            IUserService userService)
        {
            _repositoryManager = repositoryManager;
            _mapper = mapper;
            _userService = userService;
        }

        public async Task<UserAddressRes> Create(UserAddressReqEdit dto)
        {
            var entity = _mapper.Map<UserAddress>(dto);
            entity.UserId = (await _userService.GetLoggedInUser()).Id;
            _repositoryManager.UserAddressRepository.Create(entity);
            _repositoryManager.Save();
            return _mapper.Map<UserAddressRes>(entity);
        }

        public void Delete(int userAddressId)
        {
            var entity = FindUserAddressIfExists(userAddressId, true);
            _repositoryManager.UserAddressRepository.Delete(entity);
            _repositoryManager.Save();
        }

        private UserAddress FindUserAddressIfExists(int userAddressId, bool trackChanges)
        {
            var entity = _repositoryManager.UserAddressRepository.FindByCondition(
                x => x.UserAddressId == userAddressId,
                trackChanges,
                include: i => i.Include(x => x.Address)
                ).FirstOrDefault();
            if (entity == null) throw new NotFoundException("No address found with id " + userAddressId);

            return entity;
        }

        public UserAddressRes Get(int userAddressId)
        {
            var entity = FindUserAddressIfExists(userAddressId, false);
            return _mapper.Map<UserAddressRes>(entity);
        }

        public async Task<IEnumerable<UserAddressRes>> GetAll()
        {
            var userId = (await _userService.GetLoggedInUser()).Id;
            var entities = _repositoryManager.UserAddressRepository.FindByCondition(
                x => x.UserId == userId,
                false
                );
            return _mapper.Map<IEnumerable<UserAddressRes>>(entities);
        }

        public async Task<UserAddressRes> GetPrimary()
        {
            var userId = (await _userService.GetLoggedInUser()).Id;
            var entity = _repositoryManager.UserAddressRepository.FindByCondition(
                x => x.UserId == userId && x.IsPrimary == true,
                false,
                include: i => i.Include(x => x.Address)
                ).FirstOrDefault();
            if (entity == null) throw new NotFoundException("No primary address found");

            return _mapper.Map<UserAddressRes>(entity);
        }

        public async Task<UserAddressRes> Update(int userAddressId, UserAddressReqEdit dto)
        {
            var entity = FindUserAddressIfExists(userAddressId, true);
            var userId = (await _userService.GetLoggedInUser()).Id;
            _mapper.Map(dto, entity);
            _repositoryManager.Save();
            return _mapper.Map<UserAddressRes>(entity);
        }
    }
}
