using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SmartBus.Website.Data;
using SmartBus.Website.Data.Entities;
using SmartBus.Website.Models;
using SmartBus.Website.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace SmartBus.Website.Services
{
    public class DriverService : Service<Driver>
    {
        private readonly UserManager<User> userManager;
        private readonly Expression<Func<Driver, DriverModel>> mapExpression;

        public DriverService(
            SmartBusDbContext dbContext,
            UserManager<User> userManager
        ) : base(dbContext)
        {
            this.mapExpression = e => new DriverModel()
            {
                Id = e.Id,
                Email = e.User.Email,
                LastName = e.User.LastName,
                Name = e.User.Name,
                Phone = e.Phone,
                RegisterDate = e.RegisterDate,
                RouteId = e.RouteId
            };
            this.userManager = userManager;
        }

        public async Task<DriverModel> GetAsync(int id)
        {
            return await dbContext.Drivers.Where(e => e.Id == id)
                .Select(this.mapExpression)
                .FirstAsync();
        }


        public new async Task<IEnumerable<DriverModel>> GetEntitiesAsync()
        {
            return await dbContext.Drivers.Select(this.mapExpression).ToListAsync();
        }
        public async Task AddAsync(DriverModel driverModel)
        {
            var user = new User
            {
                Name = driverModel.Name,
                Email = driverModel.Email,
                LastName = driverModel.LastName,
                UserName = driverModel.Email
            };

            await userManager.CreateAsync(user, "sb-" + driverModel.Name);
            var token = await userManager.GenerateEmailConfirmationTokenAsync(user);
            var result = await userManager.ConfirmEmailAsync(user, token);
            if (user.Id == 0)
            {
                user = await userManager.FindByEmailAsync(driverModel.Email);
            }
            await userManager.AddToRoleAsync(user, AvailableRoles.Driver);
            var driver = new Driver()
            {
                Phone = driverModel.Phone,
                RegisterDate = driverModel.RegisterDate,
                UserId = user.Id
            };
            await base.AddAsync(driver);
        }
        public async Task UpdateAsync(DriverModel driverModel)
        {
            var driver = await dbContext.Drivers.FindAsync(driverModel.Id);
            driver.Phone = driverModel.Phone;
            driver.RegisterDate = driverModel.RegisterDate;
            var user = dbContext.Users.Where(e => e.Email == driverModel.Email).First();
            user.Name = driverModel.Name;
            user.LastName = driverModel.LastName;
            user.Email = driverModel.Email;
            await dbContext.SaveChangesAsync();
        }
    }
}
