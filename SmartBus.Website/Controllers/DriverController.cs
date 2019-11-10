using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartBus.Website.Data.Entities;
using SmartBus.Website.Models;
using SmartBus.Website.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartDriver.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DriverController : Controller

        //77301499
    {
        private readonly DriverService DriverService;

        public DriverController(DriverService DriverService)
        {
            this.DriverService = DriverService;
        }

        [HttpGet("{id}")]
        public Task<DriverModel> Get(int id)
        {
            return this.DriverService.GetAsync(id);
        }

        [HttpGet]
        public Task<IEnumerable<DriverModel>> Get()
        {
            return this.DriverService.GetEntitiesAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post(DriverModel Driver)
        {
            await this.DriverService.AddAsync(Driver);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Put(DriverModel Driver)
        {
            await this.DriverService.UpdateAsync(Driver);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await this.DriverService.DeleteAsync(id);
            return Ok();
        }
    }
}
