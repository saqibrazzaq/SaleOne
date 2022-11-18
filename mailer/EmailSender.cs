using Mailjet.Client.TransactionalEmails;
using Mailjet.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Mailjet.Client.Resources;

namespace mailer
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _configuration;

        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void SendEmail(string email, string subject, string htmlMessage)
        {
            MailjetClient client = new MailjetClient(_configuration["MailJet:ApiKey"],
                _configuration["MailJet:SecretKey"]);
            MailjetRequest request = new MailjetRequest
            {
                Resource = Send.Resource
            };

            // Create email
            var emailBuilder = new TransactionalEmailBuilder()
                .WithFrom(new SendContact(_configuration["MailJet:SenderEmail"],
                    _configuration["MailJet:SenderName"]))
                .WithSubject(subject)
                .WithHtmlPart(htmlMessage)
                .WithTo(new SendContact(email))
                .Build();

            // Send email
            client.SendTransactionalEmailAsync(emailBuilder);
        }
    }
}
