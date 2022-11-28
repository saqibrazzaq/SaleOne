using data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repository
{
    public class OrderAddressRepository : RepositoryBase<OrderAddress>, IOrderAddressRepository
    {
        public OrderAddressRepository(AppDbContext context) : base(context)
        {
        }
    }
}
