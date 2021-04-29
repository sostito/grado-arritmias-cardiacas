using GradoArritmiasCardiacas.Models.History;
using GradoArritmiasCardiacas.Services.DataBase;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace grado_arritmias_cardiacas.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class HistoryController : Controller
   {
      readonly IConfiguration _configuration;
      readonly DataBaseService _dataBaseService;
      public HistoryController(IConfiguration configuration, DataBaseService dataBaseService)
      {
         _configuration = configuration;
         this._dataBaseService = dataBaseService;
      }

      [HttpPost("[action]")]
      public async Task<IActionResult> SaveHistory([FromBody] SaveHistoryRequest request)
      {
         if (await _dataBaseService.SaveHistory(request, _configuration["ConnectionStrings:DataBase"]))
            return Ok();
         return BadRequest();
      }

      [HttpPost("[action]")]
      public async Task<ActionResult<GetHistoryResponse>> GetHistory([FromBody] GetHistoryRequest request)
      {
         var response = await _dataBaseService.GetHistory(request, _configuration["ConnectionStrings:DataBase"]);
         return Ok(response);
      }
   }
}
