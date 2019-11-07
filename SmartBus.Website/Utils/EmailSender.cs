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
         
        public void SendEmail(string to, string subject, string body)
        {
            SmtpClient client = new SmtpClient("mysmtpserver");
            client.UseDefaultCredentials = false;
            client.Credentials = new NetworkCredential("ajedrez_a1@hotmail.com", "t-aj-012");
            client.Port = 25;
            client.Host = "smtp.live.com";
            client.EnableSsl = true;
            MailMessage mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("smart@bus.com");
            mailMessage.To.Add(to);
            mailMessage.Body = body;
            mailMessage.Subject = subject;
            client.Send(mailMessage);
        }
    }
}
