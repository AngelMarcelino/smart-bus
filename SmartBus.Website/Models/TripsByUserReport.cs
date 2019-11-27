using SmartBus.Website.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Models
{
    public class TripsByUserReportRow
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public int TripCount { get; set; }
    }
}
