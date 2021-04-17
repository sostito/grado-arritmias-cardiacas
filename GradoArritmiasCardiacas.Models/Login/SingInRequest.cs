using System;

namespace GradoArritmiasCardiacas.Models.Login
{
    public class SingInRequest
    {
        public String userName { get; set; }
        public String Name { get; set; }
        public String lastName { get; set; }
        public Decimal weight { get; set; }
        public Decimal height { get; set; }
        public String password { get; set; }
        public Int32 age { get; set; }
        public String gender { get; set; }
    }
}
