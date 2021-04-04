using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace GradoArritmiasCardiacas.Services.Hubs
{
   public class HeartBeatHub : Hub
   {
      int count = 0;
      public async Task SendHeartBeat()
      {
        while (count < 150)
         {
            string cadena = ArduinoService.Instance.Arduino.ReadLine();
            
            await Clients.Caller.SendAsync("ReceiveHeartBeat", cadena);
            count++;
         }
         count = 0;
      }
   }
}
