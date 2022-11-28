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
    public class OrderAddressRes
    {
        public int OrderAddressId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Line1 { get; set; }
        public string? Line2 { get; set; }

        // Foreign keys
        public int CityId { get; set; }
        public City? City { get; set; }

        public bool IsShippingAddress { get; set; }
        public bool IsBillingAddress { get; set; }
    }
}
