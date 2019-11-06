using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Data.Entities
{
    public class User : IdentityUser<int>, IEntity
    {
        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        public decimal Balance { get; set; }
        public int UserCategoryId { get; set; }
        public UserCategory UserCategory { get; set; }
        public ICollection<Passage> Passages { get; set; }
    }
}
