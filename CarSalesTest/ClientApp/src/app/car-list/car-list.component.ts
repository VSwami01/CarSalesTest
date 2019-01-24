import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../service/car.service';
import { ICar } from '../model/car';

@Component({
  selector: 'app-car-list-component',
  templateUrl: './car-list.component.html'
})
//export class CarListComponent {
//  public currentCount = 0;

//  public incrementCounter() {
//    this.currentCount++;
//  }
//}

export class CarListComponent implements OnInit {

  pageTitle: string = 'Car List';

  imageWidth: number = 50;

  imageMargin: number = 2;

  showImage: boolean = false;

  _listFilter: string;

  errorMsg: string;

  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;

    this.filteredCars = this.listFilter ? this.performFilter(this.listFilter) : this.cars;
  }

  filteredCars: ICar[];

  cars: ICar[];

  constructor(private _carService: CarService) {
  }

  performFilter(filterBY: string): ICar[] {

    filterBY = filterBY.toLocaleLowerCase();

    return this.cars.filter((item: ICar) => item.make.toLocaleLowerCase().indexOf(filterBY) != -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
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
  onRatingClicked(msg: string): void {
    this.pageTitle = msg;
  }
}

