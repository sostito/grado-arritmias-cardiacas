using GradoArritmiasCardiacas.Models.Login;
using GradoArritmiasCardiacas.Services.DataBase;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;

namespace grado_arritmias_cardiacas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet("[action]/{userName}")]
        public async Task<IActionResult> GetUserAsync([FromRoute] String userName)
        {
            var dataBaseService = new DataBaseService();

            SingInRequest response = await dataBaseService.GetUserAsync(userName, _configuration["ConnectionStrings:DataBase"]);

            if (response != null)
                return Ok(response);
            return Unauthorized();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> UpdateProfileAsync([FromBody] SingInRequest update)
        {
            var dataBaseService = new DataBaseService();

            if (await dataBaseService.UpdateUserAsync(update, _configuration["ConnectionStrings:DataBase"]))
                return Ok();
            return Unauthorized();
        }
    }
}
