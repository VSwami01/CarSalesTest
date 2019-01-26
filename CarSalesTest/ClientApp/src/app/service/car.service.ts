import { Injectable } from "@angular/core";
//import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ICar } from "../model/car";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { Alert } from "selenium-webdriver";

@Injectable()
export class CarService {
  constructor(private _httpClient: HttpClient) {
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  carUrl: string = './api/car/';
  carEditUrl: string = './api/car/2';

  getCars(): Observable<ICar[]> {
    return this._httpClient.get<ICar[]>(this.carUrl)
      .do(data => console.log('All data' + JSON.stringify(data)))
      .catch(this.errorHandler);
  }

  getCar(id: number): Observable<ICar> {
    if (id === 0) {
      return Observable.of(this.initializeCar());
    };
    const url = `${this.carUrl}${id}`;
    return this._httpClient.get<ICar>(url)
      .do(data => console.log('All data' + JSON.stringify(data)))
      .catch(this.errorHandler);
  }

  //deleteCar(id: number): Observable<Response> {
  //  let headers = new Headers({ 'Content-Type': 'application/json' });
  //  let options = new RequestOptions({ headers: headers });

  //  const url = `${this.baseUrl}/${id}`;
  //  return this._httpClient.delete(url, options)
  //    .do(data => console.log('deleteProduct: ' + JSON.stringify(data)))
  //    .catch(this.handleError);
  //}


  deleteCar(id: number): Observable<any> {

    const url = `${this.carUrl}${id}`;

    return this._httpClient.delete<any>(url, this.httpOptions)
      .do(data => console.log('deleteCar: ' + JSON.stringify(data)))
      .catch(this.errorHandler);
    
  }

  saveCar(car: ICar): Observable<ICar> {
    console.log('calling saveCar() id:' + car.id)
    if (car.id == undefined) {
      console.log('calling createCar')
      return this.createCar(car);
    }
    console.log('calling updateCar')
    return this.updateCar(car);
  }

  private createCar(car: ICar): Observable<ICar> {
    car.id = 0;

    return this._httpClient.post<any>(this.carUrl, car, this.httpOptions)
      .do(data => console.log('createCar: ' + JSON.stringify(data)))
      .catch(this.errorHandler);
  }

  private updateCar(car: ICar): Observable<ICar> {
    const url = `${this.carUrl}${car.id}`;

    return this._httpClient.put<any>(url, car, this.httpOptions)
      .do(data => console.log('createCar: ' + JSON.stringify(data)))
      .catch(this.errorHandler);
  }

  private errorHandler(err: HttpErrorResponse) {
    return Observable.throw(err);
  }
  initializeCar(): ICar {
    // Return an initialized object
    return {
      id: 0,
      make: "VAibhav",
      model: null,
      engine: null,
      door: null,
      wheel: null
    };
  }
}
