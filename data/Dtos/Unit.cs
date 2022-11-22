using data.Utility.Paging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Dtos
{
    public class UnitRes
    {
        public int UnitId { get; set; }
        public string? Name { get; set; }
    }

    public class UnitReqEdit
    {
        public string? Name { get; set; }
    }

    public class UnitReqSearch : PagedRequestDto
    {

    }
}
