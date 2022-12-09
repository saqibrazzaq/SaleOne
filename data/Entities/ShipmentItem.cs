using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    [Table("ShipmentItem")]
    public class ShipmentItem
    {
        [Key]
        public int ShipmentItemId { get; set; }
        [Required]
        public int ShipmentId { get; set; }
        [ForeignKey("ShipmentId")]
        public Shipment? Shipment { get; set; }
        public int? OrderItemId { get; set; }
        [ForeignKey("OrderItemId")]
        public OrderItem? OrderItem { get; set; }
        [Column(TypeName = "decimal(12, 2)")]
        public decimal Quantity { get; set; }
    }
}
