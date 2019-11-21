using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartBus.Website.Data.Entities;
using SmartBus.Website.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartTrip.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TripController : Controller

        //77301499
    {
        private readonly TripService TripService;

        public TripController(TripService TripService)
        {
            this.TripService = TripService;
        }

        [HttpGet("{id}")]
        public Task<Trip> Get(int id)
        {
            return this.TripService.GetAsync(id);
        }

        [HttpGet]
        public Task<IEnumerable<Trip>> Get()
        {
            return this.TripService.GetEntitiesAsync(
                nameof(Trip.Bus),
                nameof(Trip.Driver)
            );
        }

        [HttpPost]
        public async Task<IActionResult> Post(Trip Trip)
        {
            await this.TripService.AddAsync(Trip);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Put(Trip Trip)
        {
            await this.TripService.UpdateAsync(Trip);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await this.TripService.DeleteAsync(id);
            return Ok();
        }

        [HttpPost("[action]")]
        public async Task<Trip> StartTrip(
            [FromQuery] int driverId,
            [FromQuery] int busId,
            [FromQuery] int routeId
        )
        {
            var trip = await this.TripService.StartTripAsync(driverId, busId, routeId);
            return trip;
        }

        [HttpPost("[action]/{driverId}")]
        public async Task<IActionResult> FinishDriversCurrentTrip(int driverId)
        {
            await TripService.FinishDriversCurrentTripAsync(driverId);
            return Ok();
        }
    }
}
