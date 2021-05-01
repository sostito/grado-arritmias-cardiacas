using System.IO.Ports;

namespace GradoArritmiasCardiacas.Services
{
   public sealed class ArduinoService
   {
      private readonly static ArduinoService _instance = new ArduinoService();
      public SerialPort Arduino = new SerialPort();

      private ArduinoService()
      {
         Arduino.PortName = "COM3";
         Arduino.BaudRate = 115200;
         Arduino.Open();
      }

      public static ArduinoService Instance
      {
         get
         {
            return _instance;
         }
      }
   }
}
