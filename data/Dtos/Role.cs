using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Dtos
{
    public class RoleRes
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
    }

    public class RoleReqEdit
    {
        [Required, MaxLength(255)]
        public string? Name { get; set; }
    }
}
