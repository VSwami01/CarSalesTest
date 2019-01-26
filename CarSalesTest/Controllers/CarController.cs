using System;
using System.Collections.Generic;

using System.Linq;

using System.Net;

using System.Net.Http;

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
        public IActionResult Get(int id)
        {
            CarEntity car = _carRepository.GetSingle(id);

            if(car == null)
                return NotFound();

            return Ok(_carMapper.MapToDTO(car));
        }

        // POST: api/Car
        [HttpPost]
        public IActionResult Post([FromBody] CarDTO _carDTO)
        {
            try
            {
                return Ok(_carRepository.Add(_carMapper.MapToEntity(_carDTO)));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT: api/Car/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] CarDTO _carDTO)
        {
            CarEntity car = _carRepository.GetSingle(id);

            if (car == null)
                return NotFound();

            try
            {
                _carRepository.Update(id, _carMapper.MapToEntity(_carDTO));
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            CarEntity car = _carRepository.GetSingle(id);

            if (car == null)
                return NotFound();

            try
            {
                _carRepository.Delete(car.Id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }
    }
}
