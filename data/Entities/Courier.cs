using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    [Table("Courier")]
    public class Courier
    {
        [Key]
        public int CourierId { get; set; }
        [Required, MaxLength(50)]
        public string? Name { get; set; }
        public string? Description { get; set; }

        // Child tables
        public IEnumerable<DeliveryPlan>? DeliveryPlans { get; set; }
    }
}
