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
    public interface IOrderItemRepository : IRepositoryBase<OrderItem>
    {
        PagedList<OrderItem> Search(OrderItemReqSearch dto, bool trackChanges);
    }
}
