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
    public class CityRes
    {
        public int CityId { get; set; }
        public string? Name { get; set; }

        public int StateId { get; set; }
        public StateRes? State { get; set; }
    }

    public class CityReqEdit
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

        // Foreign keys
        [Required]
        public int CityId { get; set; }
    }

    public class CityReqSearch : PagedRequestDto
    {
        public int StateId { get; set; }
    }

    public class CityResWithAddressesCount : CityRes
    {
        public int AddressesCount { get; set; }
    }

    public class CityResDetails : CityRes
    {
        public int AddressesCount { get; set; }
        public string? StateName { get; set; }
        public int CountryId { get; set; }
        public string? CountryName { get; set; }
    }
}
