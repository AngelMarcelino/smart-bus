using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SmartBus.Website.Data;
using SmartBus.Website.Data.Entities;
using SmartBus.Website.DomainExeptions;
using SmartBus.Website.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Services
{
    public class TripService : Service<Trip>
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;

        public TripService(
            SmartBusDbContext dbContext,
            UserManager<User> userManager,
            SignInManager<User> signInManager
        ) : base(dbContext)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
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

        public async Task NewPassageAsync(int tripId, LoginModel loginModel)
        {
            var trip = await GetAsync(tripId, nameof(Trip.Route));
            var user = await userManager.FindByEmailAsync(loginModel.Email);
            var route = trip.Route;
            var balance = user.Balance;
            if (route.Cost > balance)
            {
                throw new InsufficientFoundsException();
            }
            user.Balance -= route.Cost;
            var passage = new Passage()
            {
                Amount = route.Cost,
                Date = DateTime.UtcNow,
                TripId = tripId,
                UserId = user.Id
            };
            dbContext.Passages.Add(passage);
            await dbContext.SaveChangesAsync();
        }

    }
}
