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
    public class UserAddressRes
    {
        public int UserAddressId { get; set; }
        public int AddressId { get; set; }
        public AddressRes? Address { get; set; }

        public string? UserId { get; set; }
        
        public bool IsPrimary { get; set; } = false;
    }

    public class UserAddressReqEdit
    {
        [Required]
        public AddressReqEdit? Address { get; set; }
        public bool IsPrimary { get; set; } = false;
    }
}
