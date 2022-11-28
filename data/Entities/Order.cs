using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    [Table("Order")]
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        [Required]
        public string? UserId { get; set; }
        [ForeignKey("UserId")]
        public AppIdentityUser? User { get; set; }
        [Column(TypeName = "decimal(12, 2)")]
        public decimal BaseSubTotal { get; set; }
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public int? PaymentMethodId { get; set; }
        [ForeignKey("PaymentMethodId")]
        public PaymentMethod? PaymentMethod { get; set; }

        // Child tables
        public ICollection<OrderAddress>? Addresses { get; set; }
        public ICollection<OrderItem>? OrderItems { get; set; }

    }
}
