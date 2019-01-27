using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSalesTest.Models
{
    public class CarDTO : VehicalDTO
    {
        public int Id { get; set; }
        public string Engine { get; set; }
        public string Door { get; set; }
        public string Wheel { get; set; }
    }
}
