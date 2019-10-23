using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SmartBus.Website.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Data
{
    public class SmartBusDbContext : IdentityDbContext<IdentityUser<int>, IdentityRole<int>, int>
    {
        public SmartBusDbContext(DbContextOptions<SmartBusDbContext> options) : base(options)
        {
            
        }
        public DbSet<Bus> Buses { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        public DbSet<Passage> Passages { get; set; }
        public DbSet<Trip> Trips { get; set; }
        public DbSet<UserCategory> UserCategories { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
