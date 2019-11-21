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
        private readonly TripService tripService;

        public DriverController(
            DriverService DriverService,
            TripService tripService
        )
        {
            this.DriverService = DriverService;
            this.tripService = tripService;
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

        [HttpGet("[action]/{userId}")]
        public async Task<DriverModel> ByUserId(int userId)
        {
            return await this.DriverService.GetDriverByUserId(userId);
        }

        [HttpGet("[action]/{driverId}")]
        public async Task<Trip> GetCurrentTrip(int driverId)
        {
            var trip = await tripService.GetCurrentTripOfADriverAsync(driverId);
            return trip;
        }

        
    }
}
