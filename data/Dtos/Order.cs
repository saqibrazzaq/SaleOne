using data.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using data.Utility.Paging;

namespace data.Dtos
{
    public class OrderRes
    {
        public int OrderId { get; set; }
        public string? UserId { get; set; }
        public UserRes? User { get; set; }
        public decimal BaseSubTotal { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public int PaymentMethodId { get; set; }
        public PaymentMethodRes? PaymentMethod { get; set; }

        public int Status { get; set; }

        // Child tables
        public IEnumerable<OrderAddressRes>? Addresses { get; set; }
        public ICollection<OrderItemRes>? OrderItems { get; set; }
    }

    public class OrderReqSearch : PagedRequestDto
    {
        public string? UserId { get; set; }
        public int Status { get; set; } = 0;
    }

    public class OrderReqEdit
    {
        public int? PaymentMethodId { get; set; }
        [Required]
        public int AddressIdForShipping { get; set; }
        [Required]
        public int AddressIdForBilling { get; set; }
    }

    public class OrderReqUpdateStatus
    {
        [Required]
        public int Status { get; set; }
    }
}
