using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartBus.Website.Data.Entities;
using SmartBus.Website.Models;
using SmartBus.Website.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartRoute.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RouteController : Controller

    //77301499
    {
        private readonly RouteService RouteService;

        public RouteController(RouteService RouteService)
        {
            this.RouteService = RouteService;
        }

        [HttpGet("{id}")]
        public Task<Route> Get(int id)
        {
            return this.RouteService.GetAsync(id, nameof(Route.Drivers) + "." + nameof(Driver.User), nameof(Route.Buses));
        }

        [HttpGet]
        public Task<IEnumerable<Route>> Get()
        {
            return this.RouteService.GetEntitiesAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post(Route Route)
        {
            await this.RouteService.AddAsync(Route);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Put(Route Route)
        {
            await this.RouteService.UpdateAsync(Route);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await this.RouteService.DeleteAsync(id);
            return Ok();
        }
    }
}
