using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace data.Entities
{
    public class AppIdentityUser : IdentityUser
    {
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
        public string? EmailVerificationToken { get; set; }
        public DateTime? EmailVerificationTokenExpiryTime { get; set; }
        public string? ProfilePictureUrl { get; set; }
        public string? ProfilePictureCloudinaryId { get; set; }

        // Child tables
        public IEnumerable<Order>? Orders { get; set; }
    }
}
