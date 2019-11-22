using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartBus.Website.Data.Entities;
using SmartBus.Website.Services;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SmartUser.Website.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : Controller

    //77301499
    {
        private readonly UserService UserService;
        private readonly IHostingEnvironment hostingEnvironment;

        public UserController(
            UserService UserService,
            IHostingEnvironment hostingEnvironment
        )
        {
            this.UserService = UserService;
            this.hostingEnvironment = hostingEnvironment;
        }

        [HttpGet("{id}")]
        public Task<User> Get(int id)
        {
            return this.UserService.GetAsync(id);
        }

        [HttpGet]
        public Task<IEnumerable<User>> Get()
        {
            return this.UserService.GetEntitiesAsync();
        }

        [HttpPost]
        public async Task<IActionResult> Post(User User)
        {
            await this.UserService.AddAsync(User);
            return Ok();
        }
        [HttpPut]
        public async Task<IActionResult> Put(User User)
        {
            await this.UserService.UpdateAsync(User);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await this.UserService.DeleteAsync(id);
            return Ok();
        }
        [AllowAnonymous]
        [HttpGet("[action]/{userId}")]
        public async Task<IActionResult> GetProfileImage(int userId)
        {
            var user = await UserService.GetAsync(userId);
            var userFilePath = Path.Combine(
                this.hostingEnvironment.WebRootPath,
                "profile-pictures",
                userId + "." + user.ImageExtension
            );
            if (!System.IO.File.Exists(userFilePath))
            {
                return GetDefaultUserImage();
            }
            return File(new FileStream(userFilePath, FileMode.Open), MimeMapping.MimeUtility.GetMimeMapping(userFilePath));
        }

        private FileResult GetDefaultUserImage()
        {
            var defaultImagePath = Path.Combine(this.hostingEnvironment.WebRootPath, "profile-default.png");
            return File(new FileStream(defaultImagePath, FileMode.Open), MimeMapping.MimeUtility.GetMimeMapping(defaultImagePath));
        }
        [HttpPost("[action]/{userId}")]
        public async Task<IActionResult> UploadProfileImage(int userId)
        {
            var user = await UserService.GetAsync(userId);
            if (user != null)
            {
                
                var file = Request.Form.Files.First();
                
                var dotIndex = file.FileName.LastIndexOf('.');
                var extension = file.FileName.Substring(dotIndex + 1);
                var filePath = Path.Combine(
                    this.hostingEnvironment.WebRootPath,
                    "profile-pictures",
                    userId + "." + extension
                );
                user.ImageExtension = extension;
                await UserService.UpdateAsync(user);
                using(var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
                return Ok();
            }
            return NotFound("User not found");
           
        }
    }
}
