using GradoArritmiasCardiacas.Models.Login;
using GradoArritmiasCardiacas.Services.DataBase;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace grado_arritmias_cardiacas.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        readonly IConfiguration _configuration;
        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest login)
        {
            var dataBaseService = new DataBaseService();

            if (await dataBaseService.LoginAsync(login, _configuration["ConnectionStrings:DataBase"]))
                return Ok();
            return Unauthorized();
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> SinginAsync([FromBody] SingInRequest singInRequest)
        {
            var dataBaseService = new DataBaseService();

            if (await dataBaseService.SinginAsync(singInRequest, _configuration["ConnectionStrings:DataBase"]))
                return Ok();
            return Unauthorized();
        }
    }
}
