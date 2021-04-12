using GradoArritmiasCardiacas.Models.Login;
using GradoArritmiasCardiacas.Services.DataBase;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace grado_arritmias_cardiacas.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class LoginController : Controller
   {
      readonly IConfiguration _configuration;
      readonly DataBaseService _dataBaseService;
      public LoginController(IConfiguration configuration, DataBaseService dataBaseService)
      {
         _configuration = configuration;
         this._dataBaseService = dataBaseService;
      }

      [HttpPost("[action]")]
      public async Task<IActionResult> LoginAsync([FromBody] LoginRequest login)
      {
         if (await _dataBaseService.LoginAsync(login, _configuration["ConnectionStrings:DataBase"]))
            return Ok();
         return Unauthorized();
      }

      [HttpPost("[action]")]
      public async Task<IActionResult> SinginAsync([FromBody] SingInRequest singInRequest)
      {
         if (await _dataBaseService.SinginAsync(singInRequest, _configuration["ConnectionStrings:DataBase"]))
            return Ok();
         return Unauthorized();
      }
   }
}
