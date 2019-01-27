import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../service/car.service';
import { ICar } from '../model/car';
import { IVehicalType } from '../model/vehicalType';

@Component({
  selector: 'app-vehical-list-component',
  templateUrl: './vehical-list.component.html'
})

export class VehicalListComponent implements OnInit {

  pageTitle: string = 'Vehical List';

  _listFilter: string;

  errorMsg: string;

  vehicalType: IVehicalType = null;

  vehicalList: Array<IVehicalType> = [
    { id: 1, name: 'Car' }
  ];

  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;

    this.filteredCars = this.listFilter ? this.performFilter(this.listFilter) : this.cars;
  }
  // all vehical types should be added here
  // different types of vechicals can possibly be shown in seperate tables as they can have completely different properties
  filteredCars: ICar[];

  cars: ICar[];
  //Sample types
  //boats: IBoats;
  //caravans: ICaravans;
  //Bikes: IBikes;
  //trucks: ITrucks;


  constructor(private _carService: CarService,
    private router: Router,) {
  }

  performFilter(filterBY: string): ICar[] {

    filterBY = filterBY.toLocaleLowerCase();

    return this.cars.filter((item: ICar) => item.make.toLocaleLowerCase().indexOf(filterBY) != -1);
  }

  ngOnInit(): void {
    this._carService.getCars().subscribe(
      car => {
        this.cars = car;

        this.filteredCars = this.cars;

      },
      error => this.errorMsg = <any>error
    );
  }
  onAddVechicalClicked(): void {

    if (this.vehicalType == null) {
      alert('vehicalType not selected');
    }
    else {

      //navigation to different vechicals can be added here. eg Truck, Boat, Bike

      if (this.vehicalType.id == 1)
        this.router.navigate(['/carEdit', -1]);
    }
  }
}

