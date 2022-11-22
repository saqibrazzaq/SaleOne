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
    [Table("Unit")]
    [Index(nameof(Name), IsUnique = true)]
    public class Unit
    {
        [Key]
        public int UnitId { get; set; }
        [Required, MaxLength(50)]
        public string? Name { get; set; }

        // Child tables
        public IEnumerable<Product>? Products { get; set; }
        public IEnumerable<CartItem>? CartItems { get; set; }

    }
}
