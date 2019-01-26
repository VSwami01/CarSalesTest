using CarSalesTest.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarSalesTest.Repositories
{
    public interface ICarRepository
    {
        List<CarEntity> GetAll();
        CarEntity GetSingle(int id);
        CarEntity Add(CarEntity toAdd);
        CarEntity Update(int id, CarEntity toUpdate);
        void Delete(int id);
    }
}
