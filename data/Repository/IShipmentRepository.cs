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
    public interface IShipmentRepository : IRepositoryBase<Shipment>
    {
        PagedList<Shipment> Search(ShipmentReqSearch dto, bool trackChanges);
    }
}
