using Microsoft.EntityFrameworkCore;
using SmartBus.Website.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Data
{
    public class SmartBusDbContext : DbContext
    {
        public SmartBusDbContext(DbContextOptions<SmartBusDbContext> options) : base(options)
        {
            
        }
        public DbSet<Bus> Buses { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
