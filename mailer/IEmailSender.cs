using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mailer
{
    public interface IEmailSender
    {
        Task SendEmail(string email, string subject, string htmlMessage);
    }
}
