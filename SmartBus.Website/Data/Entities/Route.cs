using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Data.Entities
{
    public class Route : IEntity
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int IntervalInMinutes { get; set; }
        public DateTime FirstLeavingHour { get; set; }
        public DateTime LastLeavingHour { get; set; }
        public decimal Cost { get; set; }
        public ICollection<Trip> Trips { get; set; }
        public ICollection<Driver> Drivers { get; set; }
        public ICollection<Bus> Buses { get; set; }
    }
}
