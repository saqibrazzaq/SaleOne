using data.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Dtos
{
    public class CartItemRes
    {
        public int CartItemId { get; set; }
        public int CartId { get; set; }
        public Cart? Cart { get; set; }

        public int ProductId { get; set; }
        public Product? Product { get; set; }

        public decimal Quantity { get; set; }

        public decimal Rate { get; set; }

        public decimal BasePrice { get; set; }

        public int? UnitId { get; set; }
        public Unit? Unit { get; set; }
    }

    public class CartItemReqAddToCart
    {
        [Required, Range(1, int.MaxValue)]
        public int ProductId { get; set; }
        [Required, Range(0.01, double.MaxValue)]
        public decimal Quantity { get; set; }
    }
}
