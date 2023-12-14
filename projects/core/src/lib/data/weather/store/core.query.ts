import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {CoreState, CoreStore} from "./core.store";
import {combineLatest, of, switchMap, tap} from "rxjs";
import {WeatherApiService} from "../services/weather-api.service";


@Injectable({providedIn: 'root'})
export class CoreQuery extends Query<CoreState> {

  isDarkMode$ = this.select('isDarkMode');
  currentLocation$ = this.select('currentLocation');

  currentWeather$ = combineLatest([this.select('currentLocation'), this.select('currentWeather')])
    .pipe(
      switchMap(([location, weather]) => {
        return weather ?
          of(weather) :
          this.weatherApiService.getCurrentWeather(location.Key)
            .pipe(tap(currentWeather => {
              this.setCurrentWeather(currentWeather);
            }))
      })
    );
  multiForecast$ = combineLatest([this.select('currentLocation'), this.select('multiForecast')])
    .pipe(
      switchMap(([location, forecast]) => {
        return forecast ?
          of(forecast) :
          this.weatherApiService.getForecast(location.Key)
            .pipe(tap((forecast) => {
              this.setMultiForecast(forecast);
            }))
      })
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

  setCurrentWeather(weather: CoreState['currentWeather']): void {
    this.store.update(state => ({
      ...state,
      currentWeather: weather,
      isDarkMode: !weather.IsDayTime
    }));
  }

  setMultiForecast(forecast: CoreState['multiForecast']): void {
    this.store.update(state => ({
      ...state,
      multiForecast: forecast
    }));
  }
}
