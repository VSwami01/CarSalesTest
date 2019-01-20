using CarSalesTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSalesTest.Services
{
    public interface ICarMapper
    {
        CarDTO MapToDTO(CarEntity CarEntity);
        CarEntity MapToEntity(CarDTO CarDTO);
    }
}
