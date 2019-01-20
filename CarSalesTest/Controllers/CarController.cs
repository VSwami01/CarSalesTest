using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarSalesTest.Models;
using CarSalesTest.Repositories;
using CarSalesTest.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarSalesTest.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        ICarRepository _carRepository;
        ICarMapper _carMapper;

        public CarController(ICarRepository carRepository, ICarMapper carMapper)
        {
            _carRepository = carRepository;

            _carMapper = carMapper;
        }

        // GET: api/Car
        [HttpGet]
        public IEnumerable<CarDTO> Get()
        {
            return _carRepository.GetAll().Select(x => _carMapper.MapToDTO(x));
        }

        // GET: api/Car/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Car
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Car/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
