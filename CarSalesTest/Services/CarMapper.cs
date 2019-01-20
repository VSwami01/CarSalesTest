using CarSalesTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSalesTest.Services
{
    public class CarMapper : ICarMapper
    {
        public CarDTO MapToDTO(CarEntity carEntity)
        {
            return new CarDTO()
            {
                Id = carEntity.Id,
                Make = carEntity.Make,
                Model = carEntity.Model,
                Year = carEntity.Year,
                Price = carEntity.Price
            };
        }

        public CarEntity MapToEntity(CarDTO carDTO)
        {
            return new CarEntity()
            {
                Id = carDTO.Id,
                Make = carDTO.Make,
                Model = carDTO.Model,
                Year = carDTO.Year,
                Price = carDTO.Price
            };
        }
    }
}
