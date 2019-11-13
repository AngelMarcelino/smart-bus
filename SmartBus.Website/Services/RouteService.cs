using Microsoft.EntityFrameworkCore;
using SmartBus.Website.Data;
using SmartBus.Website.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Services
{
    public class RouteService : Service<Route>
    {
        public RouteService(SmartBusDbContext dbContext) : base(dbContext)
        {

        }

        public override async Task AddAsync(Route entity)
        {
            var drivers = entity.Drivers;
            var buses = entity.Buses;
            entity.Drivers = null;
            entity.Buses = null;
            await base.AddAsync(entity);
            foreach(var driver in drivers)
            {
                dbContext.Attach(new Driver
                {
                    Id = driver.Id,
                    RouteId = entity.Id
                }).Property(e => e.RouteId).IsModified = true;
            }
            foreach (var bus in buses)
            {
                dbContext.Attach(new Bus
                {
                    Id = bus.Id,
                    RouteId = entity.Id
                }).Property(e => e.RouteId).IsModified = true;
            }
            await dbContext.SaveChangesAsync();
        }

        public override async Task UpdateAsync(Route entity)
        {
            var drivers = await dbContext.Drivers.Where(d => d.RouteId == entity.Id).ToListAsync();
            drivers.ForEach(e =>
            {
                e.RouteId = null;
            });
            await dbContext.SaveChangesAsync();
            foreach (var driver in entity.Drivers)
            {
                var dbDriver = drivers.FirstOrDefault(e => e.Id == driver.Id);
                if (dbDriver == null)
                {
                    var entry = dbContext.Attach(new Driver()
                    {
                        Id = driver.Id,
                        RouteId = entity.Id
                    });
                    entry.Property(e => e.RouteId).IsModified = true;
                } else
                {
                    dbDriver.RouteId = entity.Id;
                }
            }

            var buses = await dbContext.Buses.Where(d => d.RouteId == entity.Id).ToListAsync();
            buses.ForEach(e =>
            {
                e.RouteId = null;
            });
            await dbContext.SaveChangesAsync();
            foreach (var bus in entity?.Buses)
            {
                var dbBus = buses.FirstOrDefault(e => e.Id == bus.Id);
                if (dbBus == null)
                {
                    var entry = dbContext.Attach(new Bus()
                    {
                        Id = bus.Id,
                        RouteId = entity.Id
                    });
                    entry.Property(e => e.RouteId).IsModified = true;
                } else
                {
                    dbBus.RouteId = entity.Id;
                }
            }
            await dbContext.SaveChangesAsync();
            entity.Buses = null;
            entity.Drivers = null;
            await base.UpdateAsync(entity);
        }
    }
}
