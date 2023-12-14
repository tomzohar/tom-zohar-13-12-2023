import {NgModule} from '@angular/core';
import {HomepageComponent} from './homepage.component';
import {HomepageRoutingModule} from "./homepage-routing.module";
import {CardComponent} from 'projects/ui/src/public-api';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {CurrentWeatherComponent} from "./current-weather/current-weather.component";
import {ForecastSummaryComponent} from "./forecast-summary/forecast-summary.component";


@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    CardComponent,
    NgOptimizedImage,
    CurrentWeatherComponent,
    ForecastSummaryComponent,
  ],
  exports: [
    HomepageComponent
  ]
})
export class HomepageModule {
}
