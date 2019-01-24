import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ICar } from "../model/car";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
@Injectable()
export class CarService {
  constructor(private _httpClient: HttpClient) {
  }

  carUrl: string = './api/car/';

  getCars(): Observable<ICar[]> {
    return this._httpClient.get<ICar[]>(this.carUrl)
      .do(data => console.log('All data' + JSON.stringify(data)))
      .catch(this.errorHandler);
  }

  private errorHandler(err: HttpErrorResponse) {
    return Observable.throw(err);
  }
}
