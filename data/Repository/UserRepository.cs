using data.Dtos;
using data.Entities;
using data.Utility.Paging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repository
{
    public class UserRepository : RepositoryBase<AppIdentityUser>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context)
        {
        }

        public PagedList<AppIdentityUser> SearchUsers(UserReqSearch dto, bool trackChanges)
        {
            // Find users
            var users = FindAll(trackChanges)
                .Search(dto)
                .Sort(dto.OrderBy)
                .Skip((dto.PageNumber - 1) * dto.PageSize)
                .Take(dto.PageSize)
                .ToList();
            // Get count by using the same search parameters
            var count = FindAll(trackChanges)
                .Search(dto)
                .Count();
            return new PagedList<AppIdentityUser>(users, count, dto.PageNumber,
                dto.PageSize);
        }
    }
}
