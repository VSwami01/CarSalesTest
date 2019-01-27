using CarSalesTest.Controllers;
using CarSalesTest.Models;
using CarSalesTest.Repositories;
using CarSalesTest.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace XUnitTestProject
{
    public class TestCarController
    {
        CarController _carController;
        Mock<ICarRepository> _iCarRepositoryMock;
        Mock<ICarMapper> _carMapperMock;

        public TestCarController()
        {
            _iCarRepositoryMock = new Mock<ICarRepository>();

            _carMapperMock = new Mock<ICarMapper>();

            _carController = new CarController(_iCarRepositoryMock.Object, _carMapperMock.Object);
        }

        [Fact]
        public void GetCarTest_ReturnsAllCars()
        {
            // Arrange
            var mockCarList = GetMockCarList();

            _iCarRepositoryMock
                .Setup(repo => repo.GetAll())
                .Returns(mockCarList);


            // Act
            var result = _carController.Get();

            // Assert

            Assert.NotNull(result);
            var okObjectResult = result as OkObjectResult;
            var model = Assert.IsAssignableFrom<IEnumerable<CarDTO>>(result);
            var modelCount = model.Count();
            Assert.Equal(2, modelCount);

        }

        [Fact]
        public void GetCarTest_ReturnsCar()
        {
            // Arrange
            var mockCar = GetMockCarList().Find(car => car.Id == 2);
            var mockCarDTO = GetMockCarDTOList().Find(car => car.Id == 2);

            _iCarRepositoryMock
                .Setup(repo => repo.GetSingle(2))
                .Returns(mockCar);

            _carMapperMock.Setup(mapper => mapper.MapToDTO(mockCar))
                .Returns(mockCarDTO);

            // Act

            IActionResult result = _carController.Get(2);

            // Assert
            var okObjectResult = result as OkObjectResult;
            var model = okObjectResult.Value as CarDTO;
            Assert.NotNull(result);
            Assert.Equal(model, mockCarDTO);

        }

        private List<CarEntity> GetMockCarList()
        {
            return new List<CarEntity>()
            {
                new CarEntity()
                {
                Id = 1,
                Make = "Holden",
                Model = "Calais VE",
                Engine = "3.5L",
                Door = "5",
                Wheel = "AWD"
                },
                new CarEntity()
                {
                Id = 2,
                Make = "Hyundai",
                Model = "Tucson",
                Engine = "3.5L",
                Door = "3",
                Wheel = "FWD"
                }

            };

        }
        private List<CarDTO> GetMockCarDTOList()
        {
            return new List<CarDTO>()
            {
                new CarDTO()
                {
                Id = 1,
                Make = "Holden",
                Model = "Calais VE",
                Engine = "3.5L",
                Door = "5",
                Wheel = "AWD",
                VehicalTypeId = 0
                },
                new CarDTO()
                {
                Id = 2,
                Make = "Hyundai",
                Model = "Tucson",
                Engine = "3.5L",
                Door = "3",
                Wheel = "FWD",
                VehicalTypeId = 0
                }

            };

        }

    }
}
