using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    [Table("Cart")]
    public class Cart
    {
        [Key]
        public int CartId { get; set; }

    }
}
