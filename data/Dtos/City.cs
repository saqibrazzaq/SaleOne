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
        public string? Name { get; set; }

        // Foreign keys
        [Required]
        public int StateId { get; set; }
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
