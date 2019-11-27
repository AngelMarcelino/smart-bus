using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Models
{
    public class RoutesByUserRow
    {
        public int RouteId { get; set; }
        public string RouteName { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }

    }
}
