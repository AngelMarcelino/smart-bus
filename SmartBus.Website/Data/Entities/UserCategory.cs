﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Data.Entities
{
    public class UserCategory : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
