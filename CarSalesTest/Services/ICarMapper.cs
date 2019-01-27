using CarSalesTest.Models;

namespace CarSalesTest.Services
{
    public interface ICarMapper
    {
        CarDTO MapToDTO(CarEntity CarEntity);
        CarEntity MapToEntity(CarDTO CarDTO);
    }
}
