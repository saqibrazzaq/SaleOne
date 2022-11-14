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
    [Table("Category")]
    [Index(nameof(Code), IsUnique = true)]
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        [Required, MaxLength(255)]
        public string? Name { get; set; }
        [Required, MaxLength(20)]
        public string? Code { get; set; }
        public string Description { get; set; } = "";
        public int Position { get; set; } = 10;

        // Child tables
        public IEnumerable<Product>? Products { get; set; }
    }
}
