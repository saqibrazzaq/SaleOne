using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Dtos.Auth
{
    public class VerifyEmailRequestDto
    {
        [Required]
        public string? PinCode { get; set; }


    }
}
