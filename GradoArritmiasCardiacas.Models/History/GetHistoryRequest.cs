using System;

namespace GradoArritmiasCardiacas.Models.History
{
    public class GetHistoryRequest
    {
        public string UserName { get; set; }
        public string InitialDate { get; set; }
        public string FinalDate { get; set; }
    }
}
