using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartBus.Website.Data.Entities;
using SmartBus.Website.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BusController : Controller

        //77301499
    {
        private readonly Service<Bus> busService;

        public BusController(Service<Bus> busService)
        {
            this.busService = busService;
        }

        [HttpGet("{id}")]
        public Task<Bus> Get(int id)
        {
            return this.busService.GetAsync(id);
        }

        [HttpGet]
        public Task<IEnumerable<Bus>> Get()
        {
            return this.busService.GetEntitiesAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post(Bus bus)
        {
            await this.busService.AddAsync(bus);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Put(Bus bus)
        {
            await this.busService.UpdateAsync(bus);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await this.busService.DeleteAsync(id);
            return Ok();
        }
    }
}
