using CarSalesTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSalesTest.Repositories
{
    public class CarRepository : ICarRepository
    {
        readonly List<CarEntity> _cars = new List<CarEntity>();

        public CarRepository()
        {
            _cars.Add(new CarEntity()
            {
                Id = 1,
                Make = "Holden",
                Model = "Calais VE",
                Engine = "3.5L",
                Door = "5",
                Wheel = "AWD"
            });

            _cars.Add(new CarEntity()
            {
                Id = 2,
                Make = "Hyundai",
                Model = "Tucson",
                Engine = "3.5L",
                Door = "3",
                Wheel = "FWD"
            });
            _cars.Add(new CarEntity()
            {
                Id = 3,
                Make = "Mazda",
                Model = "CX 5",
                Engine = "1.6L Turbo",
                Door = "5",
                Wheel = "AWD"
            });
            _cars.Add(new CarEntity()
            {
                Id = 4,
                Make = "Honda",
                Model = "CRV",
                Engine = "2.0L",
                Door = "5",
                Wheel = "FWD"
            });
            _cars.Add(new CarEntity()
            {
                Id = 5,
                Make = "Hyundai",
                Model = "i30 ActiveX",
                Engine = "2.0L",
                Door = "5",
                Wheel = "FWD"
            });
        }

        public List<CarEntity> GetAll()
        {
            return _cars;
        }

        public CarEntity GetSingle(int id)
        {
            return _cars.FirstOrDefault(x => x.Id == id);
        }

        public CarEntity Add(CarEntity toAdd)
        {
            int newId = !GetAll().Any() ? 1 : GetAll().Max(x => x.Id) + 1;
            toAdd.Id = newId;
            _cars.Add(toAdd);
            return toAdd;
        }

        public CarEntity Update(int id, CarEntity toUpdate)
        {
            var index = _cars.FindIndex(car => car.Id.Equals(id));

            if (index == -1 || !toUpdate.Id.Equals(id))
            {
                return null;
            }
            else
            {
                _cars[index] = toUpdate;
            }

            return toUpdate;

        }

        public void Delete(int id)
        {
            _cars.RemoveAll(x => x.Id == id);
        }
    }
}
