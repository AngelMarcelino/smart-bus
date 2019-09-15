using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SmartBus.Website.Data;
using SmartBus.Website.Data.Entities;

namespace SmartBus.Website.Services
{
    public class BusService : IBusService
    {
        private readonly SmartBusDbContext dbContext;

        public BusService(SmartBusDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task CreateAsync(Bus bus)
        {
            this.dbContext.Buses.Add(bus);
            await this.dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            this.dbContext.Attach(new Bus { Id = id }).State = Microsoft.EntityFrameworkCore.EntityState.Deleted;
            await this.dbContext.SaveChangesAsync();
        }

        public async Task<Bus> GetBusAsync(int id)
        {
            var result = await dbContext.Buses.FindAsync(id);
            return result;
        }

        public async Task<IEnumerable<Bus>> GetBusesAsync()
        {
            return await this.dbContext.Buses.ToListAsync();
        }

        public async Task UpdateAsync(Bus bus)
        {
            this.dbContext.Attach(bus).State = EntityState.Modified;
            await this.dbContext.SaveChangesAsync();
        }
    }
}
