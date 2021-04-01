using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace GradoArritmiasCardiacas.Services.Hubs
{
   public class HeartBeatHub : Hub
   {
      public async Task SendHeartBeat(int number)
      {
         await Clients.Others.SendAsync("ReceiveHeartBeat", number);
      }
   }
}
