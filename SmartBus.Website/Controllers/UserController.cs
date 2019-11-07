using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartBus.Website.Data.Entities;
using SmartBus.Website.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartUser.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : Controller

    //77301499
    {
        private readonly UserService UserService;

        public UserController(UserService UserService)
        {
            this.UserService = UserService;
        }

        [HttpGet("{id}")]
        public Task<User> Get(int id)
        {
            return this.UserService.GetAsync(id);
        }

        [HttpGet]
        public Task<IEnumerable<User>> Get()
        {
            return this.UserService.GetEntitiesAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post(User User)
        {
            await this.UserService.AddAsync(User);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Put(User User)
        {
            await this.UserService.UpdateAsync(User);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await this.UserService.DeleteAsync(id);
            return Ok();
        }
    }
}
