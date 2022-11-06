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
    public class Product
    {
        [Key]
        public int ProductId { get; set; }
        [Required, MaxLength(255)]
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }
        [Column(TypeName = "decimal(12, 2)")]
        public decimal Price { get; set; }

        // Foreign keys
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }
    }
}
