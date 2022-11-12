using data.Utility.Paging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Dtos
{
    public class CountryRes
    {
        public int CountryId { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
    }

    public class CountryReqEdit
    {
        [Required, MaxLength(255)]
        public string? Name { get; set; }
        [Required, MaxLength(3)]
        public string? Code { get; set; }
    }

    public class CountryReqSearch : PagedRequestDto
    {

    }

    public class CountryResWithStatesCount : CountryRes
    {
        public int StatesCount { get; set; }
    }
}
