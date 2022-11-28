using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    [Table("OrderItem")]
    public class OrderItem
    {
        [Key]
        public int OrderItemId { get; set; }
        [Required]
        public int OrderId { get; set; }
        [ForeignKey("OrderId")]
        public Order? Order { get; set; }
        [Required]
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product? Product { get; set; }
        [Column(TypeName = "decimal(12, 2)")]
        public decimal Quantity { get; set; }

        [Column(TypeName = "decimal(12, 2)")]
        public decimal Rate { get; set; }

        [Column(TypeName = "decimal(12, 2)")]
        public decimal BasePrice { get; set; }

        [Required]
        public int? UnitId { get; set; }
        [ForeignKey("UnitId")]
        public Unit? Unit { get; set; }
    }
}
