using data.Dtos;

namespace api.Services
{
    public interface IUserAddressService
    {
        Task<IEnumerable<UserAddressRes>> GetAll();
        Task<UserAddressRes> GetPrimary();
        UserAddressRes Get(int userAddressId);
        Task<UserAddressRes> Create(UserAddressReqEdit dto);
        Task<UserAddressRes> Update(int userAddressId, UserAddressReqEdit dto);
        void Delete(int userAddressId);
    }
}
