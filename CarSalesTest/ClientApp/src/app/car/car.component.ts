import { Component } from '@angular/core';

@Component({
  selector: 'app-car-component',
  templateUrl: './car.component.html'
})
export class CarComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
