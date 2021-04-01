using GradoArritmiasCardiacas.Services.Hubs;
using Microsoft.AspNetCore.Mvc;

namespace grado_arritmias_cardiacas.Controllers
{
   [Route("api/[controller]")]
   [ApiController]
   public class SensorController : ControllerBase
   {

      [HttpGet("[action]/{option}")]
      public IActionResult EnableSesor([FromRoute] string option)
      {
         return Ok(new object { });
      }      
      
   }
}
