import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CarService } from './service/car.service';
import { CarComponent } from './car/car.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { VehicalListComponent } from './vehical-list/vehical-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    CarComponent,
    VehicalListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    AngularFontAwesomeModule,
    RouterModule.forRoot([
      //{ path: '', component: CarListComponent, pathMatch: 'full' },
      //{ path: 'counter', component: CounterComponent },
      //{ path: 'fetch-data', component: FetchDataComponent },
      { path: 'vehicals', component: VehicalListComponent},
      { path: 'carEdit/:id', component: CarComponent },
      { path: '', redirectTo: 'vehicals', pathMatch: 'full' },
      { path: '**', redirectTo: 'vehicals', pathMatch: 'full' }
    ])
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
