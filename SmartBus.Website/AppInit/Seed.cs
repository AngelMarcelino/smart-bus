using Microsoft.Extensions.DependencyInjection;
using SmartBus.Website.Data;
using SmartBus.Website.Data.Entities;
using SmartBus.Website.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace SmartBus.Website.AppInit
{
    public static  class Seed
    { 
        public static void RunSeed(IServiceProvider serviceProvider)
        {
            var dbcontext = serviceProvider.GetRequiredService<SmartBusDbContext>();
            var categories = typeof(AvailableUserCategories)
                    .GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
                    .Where(fi => fi.IsLiteral && !fi.IsInitOnly)
                    .Select(e => e.GetValue(null))
                    .ToList();
            foreach (string category in categories)
            {
                if (!dbcontext.UserCategories.Any(c => c.Name == category))
                {
                    dbcontext.Add(new UserCategory
                    {
                        Name = category
                    });
                }
            }
            

            dbcontext.SaveChanges();
        }
    }
}
