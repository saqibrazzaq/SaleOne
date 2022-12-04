using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    [Table("DeliveryPlan")]
    public class DeliveryPlan
    {
        [Key]
        public int DeliveryPlanId { get; set; }
        [Required]
        public int CourierId { get; set; }
        [ForeignKey("CourierId")]
        public Courier? Courier { get; set; }
        [Required, MaxLength(50)]
        public string? Name { get; set; }
        public string? Description { get; set; }
        [Column(TypeName = "decimal(12, 2)")]
        public decimal Fee { get; set; }
    }
}
