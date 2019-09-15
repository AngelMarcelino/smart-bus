using Microsoft.AspNetCore.Mvc;
using SmartBus.Website.Data.Entities;
using SmartBus.Website.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Controllers
{
    public class BusController : ControllerBase
    {
        private readonly IBusService busService;

        public BusController(IBusService busService)
        {
            this.busService = busService;
        }

        [HttpGet("{id}")]
        public Task<Bus> Get(int id)
        {
            return this.busService.GetBusAsync(id);
        }

        [HttpGet]
        public Task<IEnumerable<Bus>> Get()
        {
            return this.busService.GetBusesAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post(Bus bus)
        {
            await this.busService.CreateAsync(bus);
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
