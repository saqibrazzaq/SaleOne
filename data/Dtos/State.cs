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
    public class StateRes
    {
        public int StateId { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }

        public int CountryId { get; set; }
        public CountryRes? Country { get; set; }
    }

    public class StateReqEdit
    {
        [Required, MaxLength(255)]
        public string? Name { get; set; }
        [Required, MaxLength(10)]
        public string? Code { get; set; }

        // Foreign keys
        [Required]
        public int CountryId { get; set; }
    }

    public class StateReqSearch : PagedRequestDto
    {
        public int CountryId { get; set; }
    }

    public class StateResWithCitiesCount : StateRes
    {
        public int CitiesCount { get; set; }
    }

    public class StateResWithCountryAndCitiesCount : StateRes
    {
        public string? CountryName { get; set; }
        public int CitiesCount { get; set; }
    }
}
