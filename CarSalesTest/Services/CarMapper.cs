using CarSalesTest.Models;

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
                Engine = carEntity.Engine,
                Door = carEntity.Door,
                Wheel = carEntity.Wheel
            };
        }

        public CarEntity MapToEntity(CarDTO carDTO)
        {
            return new CarEntity()
            {
                Id = carDTO.Id,
                Make = carDTO.Make,
                Model = carDTO.Model,
                Engine = carDTO.Engine,
                Door = carDTO.Door,
                Wheel = carDTO.Wheel
            };
        }
    }
}
