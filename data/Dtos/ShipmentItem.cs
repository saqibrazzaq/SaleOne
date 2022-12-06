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
    public class ShipmentItemRes
    {
        public int ShipmentItemId { get; set; }
        public int ShipmentId { get; set; }
        public Shipment? Shipment { get; set; }
        public int ProductId { get; set; }
        public Product? Product { get; set; }
        public decimal Quantity { get; set; }
        public int? UnitId { get; set; }
        public Unit? Unit { get; set; }
    }

    public class ShipmentItemReqEdit
    {
        [Required]
        public int ShipmentId { get; set; }
        [Required]
        public int ProductId { get; set; }
        public decimal Quantity { get; set; }
        [Required]
        public int? UnitId { get; set; }
        
    }

    public class ShipmentItemReqSearch : PagedRequestDto
    {
        [Required]
        public int ShipmentId { get; set; }
    }
}
