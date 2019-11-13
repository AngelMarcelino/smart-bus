using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Data.Entities
{
    public class Driver : IEntity
    {
        public int Id { get; set; }
        [Required]
        public DateTime RegisterDate { get; set; }
        public string Phone { get; set; }
        public ICollection<Trip> Trips { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int? RouteId { get; set; }
        public Route Route { get; set; }
    }
}
