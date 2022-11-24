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
    public class CartRes
    {
        public int CartId { get; set; }
        public decimal BaseSubTotal { get; set; }

        // Child tables
        public ICollection<CartItemRes>? CartItems { get; set; }
    }
}
