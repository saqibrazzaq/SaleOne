﻿using data.Entities;
using data.Utility.Paging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Dtos
{
    public class CourierRes
    {
        public int CourierId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }

        public IEnumerable<DeliveryPlan>? DeliveryPlans { get; set; }
    }

    public class CourierResWithDeliveryPlansCount : CourierRes
    {
        public int DeliveryPlansCount { get; set; }
    }

    public class CourierReqEdit
    {
        [Required, MaxLength(50)]
        public string? Name { get; set; }
        public string? Description { get; set; }
    }

    public class CourierReqSearch : PagedRequestDto
    {

    }
}
