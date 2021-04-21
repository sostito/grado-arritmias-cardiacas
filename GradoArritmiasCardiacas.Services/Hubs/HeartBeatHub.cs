using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace GradoArritmiasCardiacas.Services.Hubs
{
   public class HeartBeatHub : Hub
   {
      int count = 0;
      public async Task SendHeartBeat()
      {
         ArduinoService.Instance.Arduino.DiscardInBuffer();
         while (count < 60)
         {
            string cadena = ArduinoService.Instance.Arduino.ReadLine();
            await Clients.Caller.SendAsync("ReceiveHeartBeat", cadena);
            count++;
         }
         count = 0;
      }
   }
}
