using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SmartBus.Website.AppInit;
using SmartBus.Website.Data;
using SmartBus.Website.Utils;

namespace SmartBus.Website
{
    public class Program
    {

        public static void Main(string[] args)
        {
            var webHost = CreateWebHostBuilder(args).Build();
            var serviceScopeFactory = (IServiceScopeFactory)webHost.Services.GetService(typeof(IServiceScopeFactory));

            using (var scope = serviceScopeFactory.CreateScope())
            {
                var services = scope.ServiceProvider;
                var dbContext = services.GetRequiredService<SmartBusDbContext>();

                dbContext.Database.Migrate();
                var roleService = services.GetRequiredService<RoleManager<IdentityRole<int>>>();
                var roles = typeof(AvailableRoles)
                    .GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
                    .Where(fi => fi.IsLiteral && !fi.IsInitOnly)
                    .Select(e => e.GetValue(null))
                    .ToList();
                foreach (string rol in roles)
                {
                    if (roleService.FindByNameAsync(rol).Result == null)
                    {
                        var result = roleService.CreateAsync(new IdentityRole<int>()
                        {
                            Name = rol
                        }).Result;
                    }
                }
                Seed.RunSeed(services);
            }
            webHost.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
