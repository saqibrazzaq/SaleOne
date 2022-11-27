using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Dtos
{
    public class PaymentMethodRes
    {
        public int PaymentMethodId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
    }

    public class PaymentMethodReqEdit
    {
        [Required, MaxLength(50)]
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}
