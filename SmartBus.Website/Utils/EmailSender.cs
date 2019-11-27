using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace SmartBus.Website.Utils
{
    public interface IEmailSender
    {
        void SendEmail(string to, string subject, string body);
    }
    public class EmailSender : IEmailSender
    {
        IConfiguration configuration;
        public EmailSender(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public void SendEmail(string to, string subject, string body)
        {
            SmtpClient client = new SmtpClient("smtp.live.com", 587);
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential(this.configuration["EmailCredentials:User"], this.configuration["EmailCredentials:Password"]);
            client.EnableSsl = true;
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress(this.configuration["EmailCredentials:User"]);
            mailMessage.To.Add(to);
            mailMessage.Body = body;
            mailMessage.Subject = subject;
            mailMessage.IsBodyHtml = true;
            client.Send(mailMessage);
        }
    }
}
