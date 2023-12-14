import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {CoreState, CoreStore} from "./core.store";
import {catchError, combineLatest, EMPTY, Observable, switchMap, tap} from "rxjs";
import {WeatherApiService} from "../services/weather-api.service";
import {CurrentWeatherDto, MultiDayForecast, WeatherLocationDto} from "../../../types/interface/weather.interface";
import {LocalStorageService} from "../../local-storage/local-storage.service";
import {LocalStorageKeys} from "../../../types/enum/local-storage-keys.enum";


@Injectable({providedIn: 'root'})
export class CoreQuery extends Query<CoreState> {

  readonly isDarkMode$ = this.select('isDarkMode');
  readonly isMetric$ = this.select('metric');
  readonly currentLocation$ = this.select('currentLocation');

  readonly currentWeather$ = this.currentLocation$.pipe(
    switchMap((location: WeatherLocationDto) => this.getCurrentWeather(location.Key)),
    tap((currentWeather: CurrentWeatherDto) => {
      this.setDarkMode(!currentWeather.IsDayTime);
    })
  );

  readonly multiForecast$ = combineLatest([this.currentLocation$, this.isMetric$]).pipe(
    switchMap(([location, isMetric]: [WeatherLocationDto, boolean]) => this.getForecast(location, isMetric))
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

  setFavorite(isFavorite: boolean) {
    let favorites = LocalStorageService.getItem<string[]>(LocalStorageKeys.favorites) || [];

    this.store.update(state => {
      this.updateFavorites(isFavorite, favorites, state.currentLocation);

      return {
        ...state,
        currentLocation: {
          ...state.currentLocation,
          isFavorite,
        }
      }
    })
  }

  initUserLocation(): void {
    this.weatherApiService.getClientIp()
      .pipe(
        switchMap(ip => {
          return this.weatherApiService.getLocationByIp(ip);
        }),
        catchError(error => {
          alert(error);
          return EMPTY;
        })
      )
      .subscribe(location => {
        this.setCurrentLocation(location);
      })
  }

  private getCurrentWeather(locationKey: string): Observable<CurrentWeatherDto> {
    return this.weatherApiService.getCurrentWeather(locationKey)
      .pipe(
        catchError((err) => {
          alert(err);
          return EMPTY;
        })
      );
  }

  private getForecast(location: WeatherLocationDto, isMetric: boolean): Observable<MultiDayForecast> {
    return this.weatherApiService.getForecast(location.Key, isMetric)
      .pipe(
        catchError(err => {
          alert(err);
          return EMPTY;
        })
      )
  }

  private updateFavorites(isFavorite: boolean, favorites: string[], currentLocation: WeatherLocationDto) {
    if (isFavorite && !favorites.includes(currentLocation.Key)) {
      favorites.push(currentLocation.Key);
    } else {
      favorites = favorites.filter(f => f !== currentLocation.Key);
    }

    LocalStorageService.setItem({key: LocalStorageKeys.favorites, item: favorites});
  }

}
