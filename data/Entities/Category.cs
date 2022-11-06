using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    [Table("Category")]
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        [Required, MaxLength(255)]
        public string? Name { get; set; }
        public string? Description { get; set; }

        // Child tables
        public IEnumerable<Product>? Products { get; set; }
    }
}
