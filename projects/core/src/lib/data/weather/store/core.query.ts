import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {CoreState, CoreStore} from "./core.store";
import {combineLatest, switchMap, tap} from "rxjs";
import {WeatherApiService} from "../services/weather-api.service";
import {CurrentWeatherDto, WeatherLocationDto} from "../../../types/interface/weather.interface";


@Injectable({providedIn: 'root'})
export class CoreQuery extends Query<CoreState> {

  isDarkMode$ = this.select('isDarkMode');
  isMetric$ = this.select('metric');

  currentLocation$ = this.select('currentLocation');

  currentWeather$ = this.currentLocation$.pipe(
    switchMap((location: WeatherLocationDto) => this.weatherApiService.getCurrentWeather(location.Key)),
    tap((currentWeather: CurrentWeatherDto) => {
      this.setDarkMode(!currentWeather.IsDayTime);
    })
  );

  multiForecast$ = combineLatest([this.currentLocation$, this.isMetric$]).pipe(
    switchMap(([location, isMetric]: [WeatherLocationDto, boolean]) => this.weatherApiService.getForecast(location.Key, isMetric))
  );

  constructor(
    protected override store: CoreStore,
    private weatherApiService: WeatherApiService,
  ) {
    super(store);
  }

  setDarkMode(isDarkMode: boolean) {
    this.store.update(state => ({
      ...state,
      isDarkMode,
    }))
  }

  setCurrentLocation(location: CoreState['currentLocation']): void {
    this.store.update(state => ({
      ...state,
      currentLocation: location
    }));
  }

  setMetric(isMetric: boolean): void {
    this.store.update(state => ({
      ...state,
      metric: isMetric
    }));
  }
}
