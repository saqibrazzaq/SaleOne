using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using data.Entities;
using data.Utility.Paging;

namespace data.Dtos
{
    public class ProductRes
    {
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        public string? Description { get; set; }
        public int Position { get; set; } = 10;
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }
        public int? UnitId { get; set; }
        public Unit? Unit { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public IEnumerable<ProductImageRes>? ProductImages { get; set; }
    }

    public class ProductReqEdit
    {
        public string? Name { get; set; }
        public string? Code { get; set; }
        public string? Description { get; set; }
        public int Position { get; set; } = 10;
        public decimal Quantity { get; set; }
        public decimal Rate { get; set; }
        public int? UnitId { get; set; }
        public int CategoryId { get; set; }
    }

    public class ProductReqSearch : PagedRequestDto
    {
        public int CategoryId { get; set; }
        public string? CategoryCode { get; set; }
        public int StockStatus { get; set; } = -1;
    }

    public enum StockStatus
    {
        InStock = 1,
        OutOfStock = 0,
        AllProducts = -1
    }
}
