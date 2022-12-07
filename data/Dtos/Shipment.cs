using data.Entities;
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
    public class ShipmentRes
    {
        public int ShipmentId { get; set; }
        public int OrderId { get; set; }
        public Order? Order { get; set; }
        public string? TrackingNumber { get; set; }
        public int DeliveryPlanId { get; set; }
        public DeliveryPlan? DeliveryPlan { get; set; }
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;
        public DateTime? DeliveryDate { get; set; }
        public int ShipmentAddressId { get; set; }
        public ShipmentAddress? ShipmentAddress { get; set; }
        public ICollection<ShipmentItem>? ShipmentItems { get; set; }
    }

    public class ShipmentReqEdit
    {
        [Required]
        public int OrderId { get; set; }
        public string? TrackingNumber { get; set; }
        [Required]
        public int DeliveryPlanId { get; set; }
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;
        public DateTime? DeliveryDate { get; set; }
        
    }

    public class ShipmentReqSearch : PagedRequestDto
    {
        public int OrderId { get; set; }
    }

}
