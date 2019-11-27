 using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartBus.Website.Models;
using SmartBus.Website.Services;

namespace SmartBus.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private readonly ReportsService reportsService;

        public ReportsController(ReportsService reportsService)
        {
            this.reportsService = reportsService;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<TripsByUserReportRow>> GetTripsByUser()
        {
            return this.reportsService.GetTripsByUser();
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<RoutesByUserRow>> GetRoutesByUser()
        {
            return this.reportsService.GetRoutesByUser();
        }
    }
}