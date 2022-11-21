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
    public interface IUserRepository : IRepositoryBase<AppIdentityUser>
    {
        PagedList<AppIdentityUser> SearchUsers(
            UserReqSearch dto, bool trackChanges);
    }
}
