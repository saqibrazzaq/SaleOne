using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    [Table("UserAddress")]
    public class UserAddress
    {
        [Key]
        public int UserAddressId { get; set; }
        [Required]
        public int AddressId { get; set; }
        [ForeignKey("AddressId")]
        public Address? Address { get; set; }
        [Required]
        public bool IsPrimary { get; set; } = false;

        // Foreign keys
        [Required]
        public string? UserId { get; set; }
        [ForeignKey("UserId")]
        public AppIdentityUser? User { get; set; }

    }
}
