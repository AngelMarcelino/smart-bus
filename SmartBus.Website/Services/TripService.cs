using Microsoft.EntityFrameworkCore;
using SmartBus.Website.Data;
using SmartBus.Website.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Services
{
    public class TripService : Service<Trip>
    {
        public TripService(SmartBusDbContext dbContext) : base(dbContext)
        {

        }
        public async Task<Trip> StartTripAsync(
            int driverId,
            int busId,
            int routeId
            )
        {
            var trip = new Trip
            {
                TripStatus = TripStatus.Started,
                BusId = busId,
                DriverId = driverId,
                RouteId = routeId,
                StartDate = DateTime.UtcNow,
                EndDate = null,
            };
            dbContext.Add(trip);
            dbContext.Entry(trip)
                .Navigations
                .Where(e => !e.IsLoaded)
                .ToList()
                .ForEach(n => n.Load());
            await dbContext.SaveChangesAsync();
            return trip;
        }

        public Task<Trip> GetCurrentTripOfADriverAsync(int driverId)
        {
            var trip = dbContext.Trips
                .Where(e => 
                    e.TripStatus == TripStatus.Started &&
                    e.DriverId == driverId
                )
                .FirstOrDefaultAsync();
            return trip;
        }

        public async Task FinishDriversCurrentTripAsync(int driverId)
        {
            var trip = await GetCurrentTripOfADriverAsync(driverId);
            trip.TripStatus = TripStatus.Finished;
            trip.EndDate = DateTime.UtcNow;
            await dbContext.SaveChangesAsync();
        }
    }
}
