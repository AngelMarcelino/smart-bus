using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SmartBus.Website.Data.Entities;
using SmartBus.Website.Models;
using SmartBus.Website.Services;
using SmartBus.Website.Utils;

namespace SmartBus.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IConfiguration configuration;
        private readonly UserService userService;
        private readonly IEmailSender emailSender;

        public AccountController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            UserService userService,
            IEmailSender emailSender
        )
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.userService = userService;
            this.emailSender = emailSender;
        }

        [HttpPost("[action]")]
        public async Task<string> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                throw new ApplicationException("INVALID_INPUT");
            }
            var result = await signInManager.PasswordSignInAsync(
                model.Email, model.Password, false, false
            );
            if (result.Succeeded)
            {
                var appUser = userManager.Users
                    .SingleOrDefault(r => r.Email == model.Email);
                return GenerateJwtToken(model.Email, appUser);
            }
            if (result.IsNotAllowed)
            {
                return "";
            }
            throw new ApplicationException("INVALID_LOGIN_ATTEMPT");
        }

        [HttpPost("[action]")] 
        public async Task<IActionResult> Register([FromBody] RegisterModel register)
        {
            var user = await this.userService.CreateUserFromRegisterModelAsync(register);
            var result = await userManager.CreateAsync(user, register.Password);
            if (result.Succeeded)
            {
                var dbUser = await userManager.FindByNameAsync(register.Email);
                var roleAddResult = await userManager.AddToRoleAsync(dbUser, AvailableRoles.User);
                if ( roleAddResult.Succeeded)
                {
                    var token = await userManager.GenerateEmailConfirmationTokenAsync(dbUser);
                    this.emailSender.SendEmail("kamikase1998@gmail.com", "test", "this is a test");
                    return Ok();
                } 
                else
                {
                    await userManager.DeleteAsync(user);
                }
            }
            throw new ApplicationException("UNKNOWN_ERROR");
        }


        private string GenerateJwtToken(
            string email,
            User user
        )
        {
            
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.Name, user.Id.ToString())
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration["JwtConfiguration:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(Convert.ToDouble(configuration["JwtConfiguration:ExpireDays"]));

            var token = new JwtSecurityToken(
                configuration["JwtConfiguration:Issuer"],
                configuration["JwtConfiguration:Audience"],
                claims,
                DateTime.Now,
                expires,
                creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


    }
}