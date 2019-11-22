using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartBus.Website.Data.Entities;
using SmartBus.Website.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SmartBus.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChargesController : Controller
    {
        private readonly Service<User> chargesService;
        private readonly Service<Route> routeService;
        private readonly Service<Passage> passagesService;

        public ChargesController(
            Service<User> chargesService, 
            Service<Route> routeService, 
            Service<Passage> passagesService
        )
        {
            this.chargesService = chargesService;
            this.routeService = routeService;
            this.passagesService = passagesService;
        }

        [HttpPut("charge")]
        public async Task<IActionResult> Charge([FromQuery]int userId, [FromQuery]int routeId)
        {
            User toChargeUser = await this.chargesService
                .GetAsync(userId);
            Route toAboardRoute = await this.routeService
                .GetAsync(routeId);
            if(toAboardRoute != null && toChargeUser != null)
            {
                if(toChargeUser.Balance > toAboardRoute.Cost)
                {
                    toChargeUser.Balance -= toAboardRoute.Cost;
                    await this.chargesService.UpdateAsync(toChargeUser);
                    await this.passagesService.AddAsync(new Passage{
                        Amount = toAboardRoute.Cost,
                        Date = DateTime.UtcNow,
                        UserId = toChargeUser.Id,
                        TripId = toAboardRoute.Id
                    });
                    return Ok(new {Status = "Succesful", User = toChargeUser});
                }
                else
                {
                    return Ok(new {Status = "Not accepted", User = toChargeUser});
                }
            }
            else
            {
                    return Ok(new {Status = "Not found"});
            }
        }
        
        [HttpPut("recharge")]
        public async Task<IActionResult> Recharge([FromQuery]int userId, [FromQuery]int amount)
        {
            User toRechargeUser = await this.chargesService
                .GetAsync(userId);
            if(toRechargeUser != null)
            {
                toRechargeUser.Balance += amount;
                await this.chargesService.UpdateAsync(toRechargeUser);
                    return Ok(new {Status = "Succesful", User = toRechargeUser});
            }
            else
            {
                return Ok(new {Status = "Not found"});
            }
        }
    }
}
