using data.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using data.Utility.Paging;

namespace data.Dtos
{
    public class DeliveryPlanRes
    {
        public int DeliveryPlanId { get; set; }
        public int CourierId { get; set; }
        public Courier? Courier { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Fee { get; set; }
    }

    public class DeliveryPlanReqEdit
    {
        [Required]
        public int CourierId { get; set; }
        [Required, MaxLength(50)]
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Fee { get; set; }
    }

    public class DeliveryPlanReqSearch : PagedRequestDto
    {
        [Required]
        public int CourierId { get; set; }
    }
}
