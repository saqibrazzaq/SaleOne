using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    public enum OrderStatus
    {
        Pending = 1,
        Confirmed = 2,
        Shipping = 3,
        Delivered = 4,
        Cancelled = 5,
        Complete = 10
    }
}
