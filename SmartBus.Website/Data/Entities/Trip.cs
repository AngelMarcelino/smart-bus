using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Data.Entities
{
    public class Trip : IEntity
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int DriverId { get; set; }
        public Driver Driver { get; set; }
        public int BusId { get; set; }
        public Bus Bus { get; set; }
        public ICollection<Passage> Passages { get; set; }
    }
}
