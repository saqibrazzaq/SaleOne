using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    [Table("ProductImage")]
    public class ProductImage
    {
        [Key]
        public int ProductImageId { get; set; }
        [Required]
        public string? ImageUrl { get; set; }
        [Required]
        public string? CloudinaryId { get; set; }
        public bool IsMainImage { get; set; } = false;

        [Required]
        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public Product? Product { get; set; }

    }
}
