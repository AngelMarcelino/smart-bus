﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Data.Entities
{
    public class Driver
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public DateTime RegisterDate { get; set; }
        public string Phone { get; set; }
        public ICollection<Trip> Trips { get; set; }
    }
}
