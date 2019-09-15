using SmartBus.Website.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Services
{
    public interface IBusService
    {
        Task<Bus> GetBusAsync(int id);
        Task<IEnumerable<Bus>> GetBusesAsync();
        Task CreateAsync(Bus bus);
        Task UpdateAsync(Bus bus);
        Task DeleteAsync(int id);
    }
}
