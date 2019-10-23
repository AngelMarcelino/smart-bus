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
using SmartBus.Website.Models;

namespace SmartBus.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser<int>> userManager;
        private readonly SignInManager<IdentityUser<int>> signInManager;
        private readonly IConfiguration configuration;

        public AccountController(
            UserManager<IdentityUser<int>> userManager,
            SignInManager<IdentityUser<int>> signInManager,
            IConfiguration configuration
        )
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
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
            throw new ApplicationException("INVALID_LOGIN_ATTEMPT");
        }

        [HttpPost("[action]")] 
        public async Task<string> Register([FromBody] RegisterModel register)
        {
            var user = new IdentityUser<int>
            {
                UserName = register.Email,
                Email = register.Email
            };
            var result = await userManager.CreateAsync(user, register.Password);
            if (result.Succeeded)
            {
                return await this.Login(new LoginModel()
                {
                    Email = register.Email,
                    Password = register.Password
                });
            }
            throw new ApplicationException("UNKNOWN_ERROR");
        }

        private string GenerateJwtToken(
            string email,
            IdentityUser<int> user
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