using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    [Table("Shipment")]
    public class Shipment
    {
        [Key]
        public int ShipmentId { get; set; }
        [Required]
        public int OrderId { get; set; }
        [ForeignKey("OrderId")]
        public Order? Order { get; set; }
        public string? TrackingNumber { get; set; }
        [Required]
        public int DeliveryPlanId { get; set; }
        [ForeignKey("DeliveryPlanId")]
        public DeliveryPlan? DeliveryPlan { get; set; }
        public DateTime BookingDate { get; set; } = DateTime.UtcNow;
        public DateTime? DeliveryDate { get; set; }
        [Required]
        public int ShipmentAddressId { get; set; }
        [ForeignKey("ShipmentAddressId")]
        public ShipmentAddress? ShipmentAddress { get; set; }
        public ICollection<ShipmentItem>? ShipmentItems { get; set; }
    }
}
