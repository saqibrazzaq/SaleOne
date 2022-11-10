using data.Utility.Paging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Dtos
{
    public class CategoryRes
    {
        public int CategoryId { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        public int Position { get; set; }
        public string? Description { get; set; }
    }

    public class CategoryResWithProductsCount : CategoryRes
    {
        public int ProductsCount { get; set; }
    }

    public class CategoryReqEdit
    {
        public string? Name { get; set; }
        public string? Code { get; set; }
        public int Position { get; set; }
        public string? Description { get; set; }
    }

    public class CategoryReqSearch : PagedRequestDto
    {

    }
}
