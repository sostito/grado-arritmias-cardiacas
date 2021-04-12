using System.Collections.Generic;

namespace GradoArritmiasCardiacas.Models.History
{
   public class GetHistoryResponse
   {
      public GetHistoryResponse()
      {
         Data = new List<HistoryDataDto>();
      }
      public List<HistoryDataDto> Data { get; set; }
   }
}
