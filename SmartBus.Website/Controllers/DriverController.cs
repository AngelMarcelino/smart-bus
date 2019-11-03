using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartBus.Website.Data.Entities;
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
        private readonly Service<Driver> DriverService;

        public DriverController(Service<Driver> DriverService)
        {
            this.DriverService = DriverService;
        }

        [HttpGet("{id}")]
        public Task<Driver> Get(int id)
        {
            return this.DriverService.GetAsync(id);
        }

        [HttpGet]
        public Task<IEnumerable<Driver>> Get()
        {
            return this.DriverService.GetEntitiesAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post(Driver Driver)
        {
            await this.DriverService.AddAsync(Driver);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Put(Driver Driver)
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
