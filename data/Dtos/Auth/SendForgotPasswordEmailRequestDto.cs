using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Dtos.Auth
{
    public class SendForgotPasswordEmailRequestDto
    {
        [Required(ErrorMessage = "Email is required")]
        [MaxLength(255, ErrorMessage = "Maximum 255 characters for Email")]
        [EmailAddress]
        public string? Email { get; set; }
    }
}
