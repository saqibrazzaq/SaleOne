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
    public class OrderItemRes
    {
        public int OrderItemId { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public decimal Quantity { get; set; }
        public decimal ShippedQuantity { get; set; }
        public decimal Rate { get; set; }

        public decimal BasePrice { get; set; }

        public int? UnitId { get; set; }
        public Unit? Unit { get; set; }
    }

    public class OrderItemReqSearch : PagedRequestDto
    {
        public int OrderId { get; set; }
        public bool UnshippedItems { get; set; } = false;
    }

    public class OrderItemReqEdit
    {
        [Required]
        public int OrderId { get; set; }
        [Required]
        public int ProductId { get; set; }
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }
        public decimal BasePrice { get; set; }
        public int? UnitId { get; set; }
        
    }
}
