using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    [Table("Cart")]
    [Index(nameof(Email), IsUnique = true)]
    public class Cart
    {
        [Key]
        public int CartId { get; set; }
        [Required]
        public string? Email { get; set; }
        [Column(TypeName = "decimal(12, 2)")]
        public decimal BaseSubTotal { get; set; }

        // Child tables
        public ICollection<CartItem>? CartItems { get; set; }
    }
}
