using data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Repository
{
    public class ShipmentAddressRepository : RepositoryBase<ShipmentAddress>, IShipmentAddressRepository
    {
        public ShipmentAddressRepository(AppDbContext context) : base(context)
        {
        }
    }
}
