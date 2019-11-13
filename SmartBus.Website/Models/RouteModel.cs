using SmartBus.Website.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Models
{
    public class RouteModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int IntervalInMinutes { get; set; }
        public DateTime FirstLeavingHour { get; set; }
        public DateTime LastLeavingHour { get; set; }
        public ICollection<DriverModel> Drivers { get; set; }
        public ICollection<Bus> Buses { get; set; }
    }
}
