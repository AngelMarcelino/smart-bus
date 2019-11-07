using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SmartBus.Website.Data;
using SmartBus.Website.Data.Entities;
using SmartBus.Website.Models;
using SmartBus.Website.Utils;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Services
{
    public class UserService : Service<User>
    {
        private readonly UserManager<User> userManager;

        public UserService (
            SmartBusDbContext dbContext,
            UserManager<User> userManager
        ) : base(dbContext)
        {
            this.userManager = userManager;
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
