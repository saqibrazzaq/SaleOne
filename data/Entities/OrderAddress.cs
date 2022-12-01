using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    [Table("OrderAddress")]
    public class OrderAddress
    {
        [Key]
        public int OrderAddressId { get; set; }
        [Required, MaxLength(255)]
        public string? FirstName { get; set; }
        [Required, MaxLength(255)]
        public string? LastName { get; set; }
        [Required, MaxLength(25)]
        public string? PhoneNumber { get; set; }
        [Required]
        public string? Line1 { get; set; }
        public string? Line2 { get; set; }

        // Foreign keys
        [Required]
        public int CityId { get; set; }
        [ForeignKey("CityId")]
        public City? City { get; set; }

        public bool IsShippingAddress { get; set; } = false;
        public bool IsBillingAddress { get; set; } = false;

        // Foreign keys
        public int OrderId { get; set; }
        [ForeignKey("OrderId")]
        public Order? Order { get; set; }
    }
}
