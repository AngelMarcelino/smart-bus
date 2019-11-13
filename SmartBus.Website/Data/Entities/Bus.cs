using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Data.Entities
{
    public class Bus : IEntity
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public string Model { get; set; }
        public int AvailablePlaces { get; set; }
        public int TotalPlaces { get; set; }
        public ICollection<Trip> Trips { get; set; }
        public int? RouteId { get; set; }
        public Route Route { get; set; }
    }
}
