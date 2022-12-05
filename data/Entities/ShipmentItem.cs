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
        [Required]
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product? Product { get; set; }
        [Column(TypeName = "decimal(12, 2)")]
        public decimal Quantity { get; set; }
        [Required]
        public int? UnitId { get; set; }
        [ForeignKey("UnitId")]
        public Unit? Unit { get; set; }
    }
}
