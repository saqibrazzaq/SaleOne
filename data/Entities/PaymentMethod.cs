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
    [Table("PaymentMethod")]
    [Index(nameof(Name), IsUnique = true)]
    public class PaymentMethod
    {
        [Key]
        public int PaymentMethodId { get; set; }
        [Required, MaxLength(50)]
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}
