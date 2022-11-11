using data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repository
{
    public class StateRepository : RepositoryBase<State>, IStateRepository
    {
        public StateRepository(AppDbContext context) : base(context)
        {
        }
    }
}
