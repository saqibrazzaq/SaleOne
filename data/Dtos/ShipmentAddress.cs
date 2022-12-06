using data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Dtos
{
    public class ShipmentAddressRes
    {
        public int ShipmentAddressId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Line1 { get; set; }
        public string? Line2 { get; set; }

        public int CityId { get; set; }
        public City? City { get; set; }
    }

    public class ShipmentAddressReqEdit
    {
        [Required, MaxLength(255)]
        public string? FirstName { get; set; }
        [Required, MaxLength(255)]
        public string? LastName { get; set; }
        [Required, MaxLength(25)]
        public string? PhoneNumber { get; set; }
        [Required]
        public string? Line1 { get; set; }
        public string? Line2 { get; set; }

        [Required]
        public int CityId { get; set; }
        
    }
}
