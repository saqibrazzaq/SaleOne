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
    [Table("Product")]
    [Index(nameof(Code), IsUnique = true)]
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        [Required, MaxLength(255)]
        public string? Name { get; set; }
        [Required, MaxLength(20)]
        public string? Code { get; set; }
        public string? Description { get; set; }
        public int Position { get; set; } = 10;

        [Column(TypeName = "decimal(12, 2)")]
        public decimal Quantity { get; set; }

        [Column(TypeName = "decimal(12, 2)")]
        public decimal Rate { get; set; }

        public int? UnitId { get; set; }
        [ForeignKey("UnitId")]
        public Unit? Unit { get; set; }

        // Foreign keys
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }

        // Child tables
        public IEnumerable<ProductImage>? ProductImages { get; set; }
        public IEnumerable<CartItem>? CartItems { get; set; }
        public IEnumerable<OrderItem>? OrderItems { get; set; }
    }
}
