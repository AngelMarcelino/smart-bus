using Microsoft.EntityFrameworkCore;
using SmartBus.Website.Data;
using SmartBus.Website.Data.Entities;
using SmartBus.Website.Models;
using SmartBus.Website.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Services
{
    public class UserService
    {
        private readonly SmartBusDbContext dbContext;

        public UserService(SmartBusDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<User> CreateUserFromRegisterModelAsync(RegisterModel registerModel)
        {
            var basicCategorie = await dbContext.UserCategories
                .Where(e => e.Name == AvailableUserCategories.Basic).Select(uc => uc.Id)
                .FirstOrDefaultAsync();
            var user = new User
            {
                UserName = registerModel.Email,
                Email = registerModel.Email,
                Name = registerModel.Name,
                LastName = registerModel.LastName,
                UserCategoryId = basicCategorie
            };
            return user;
        }
    }
}
