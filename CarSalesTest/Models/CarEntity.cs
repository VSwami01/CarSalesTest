using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSalesTest.Models
{
    public class CarEntity
    {
        public int Id { get; set; }
        public string Make { get; set; }
        public string Model { get; set; }
        public string Engine { get; set; }
        public string Door { get; set; }
        public string Wheel { get; set; }
        //public DateTime Year { get; set; }
        //public decimal Price { get; set; }
    }
}
