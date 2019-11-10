using Microsoft.AspNetCore.Identity;
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
            var userManager = serviceProvider.GetRequiredService<UserManager<User>>();
            AddCategories(dbcontext);
            AddDefaultUser(dbcontext, userManager);
            dbcontext.SaveChanges();
        }
        private static void AddDefaultUser(SmartBusDbContext dbContext, UserManager<User> userManager)
        {
            if (!dbContext.Users.Any(e => e.Email == "admin@smartbus.com"))
            {
                int vipUserCategoryId = dbContext.UserCategories
                    .Where(e => e.Name == AvailableUserCategories.VIP)
                    .Select(e => e.Id)
                    .First();
                var user = new User
                {
                    Email = "admin@smartbus.com",
                    UserName = "admin@smartbus.com",
                    Balance = 0,
                    BirthDate = DateTime.UtcNow,
                    UserCategoryId = vipUserCategoryId
                };
                var result = userManager.CreateAsync(user, "password").Result;

                var token = userManager.GenerateEmailConfirmationTokenAsync(user).Result;
                var confirmationResult = userManager.ConfirmEmailAsync(user, token).Result;
                var roleAssignationResult = userManager.AddToRoleAsync(user, AvailableRoles.Admin).Result;
            }
        }
        private static void AddCategories(SmartBusDbContext dbContext)
        {
            var categories = typeof(AvailableUserCategories)
                    .GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
                    .Where(fi => fi.IsLiteral && !fi.IsInitOnly)
                    .Select(e => e.GetValue(null))
                    .ToList();
            foreach (string category in categories)
            {
                if (!dbContext.UserCategories.Any(c => c.Name == category))
                {
                    dbContext.Add(new UserCategory
                    {
                        Name = category
                    });
                }
            }
        }
    }
}
