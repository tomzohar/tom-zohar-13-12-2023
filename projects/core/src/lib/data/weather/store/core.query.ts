import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {CoreState, CoreStore} from "./core.store";
import {catchError, combineLatest, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {WeatherApiService} from "../services/weather-api.service";
import {CurrentWeatherDto, MultiDayForecast, WeatherLocationDto} from "../../../types/interface/weather.interface";
import {LocalStorageService} from "../../local-storage/local-storage.service";
import {LocalStorageKeys} from "../../../types/enum/local-storage-keys.enum";
import {AlertService} from "../../../services/alert.service";
import {DEFAULT_LOCATION} from "../../../const/default-location.const";


@Injectable({providedIn: 'root'})
export class CoreQuery extends Query<CoreState> {

  readonly isDarkMode$ = this.select('isDarkMode');
  readonly isMetric$ = this.select('metric');
  readonly currentLocation$ = this.select('currentLocation');

  readonly currentWeather$ = this.currentLocation$.pipe(
    switchMap((location: WeatherLocationDto) => this.getCurrentWeather(location.Key)),
    tap((currentWeather: CurrentWeatherDto) => {
      this.setDarkMode(!currentWeather.IsDayTime);
    }),
    tap(() => this.setLoading(false))
  );

  readonly multiForecast$ = combineLatest([this.currentLocation$, this.isMetric$]).pipe(
    switchMap(([location, isMetric]: [WeatherLocationDto, boolean]) => this.getForecast(location, isMetric)),
    tap(() => this.setLoading(false))
  );

  constructor(
    protected override store: CoreStore,
    private weatherApiService: WeatherApiService,
    private alertService: AlertService,
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
    this.setLoading(true);
    this.store.update(state => ({
      ...state,
      currentLocation: location,
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
    this.setLoading(true);
    this.weatherApiService.getClientIp()
      .pipe(
        switchMap(ip => {
          return this.weatherApiService.getLocationByIp(ip)
        }),
        tap(() => this.setLoading(false)),
        catchError(error => {
          alert(error);
          this.alertService.showAlert(error.message);
          return of(DEFAULT_LOCATION);
        })
      )
      .subscribe(location => {
        this.setCurrentLocation(location);
      })
  }

  setLoading(isLoading: boolean): void {
    this.store.setLoading(isLoading);
  }

  private getCurrentWeather(locationKey: string): Observable<CurrentWeatherDto> {
    return this.weatherApiService.getCurrentWeather(locationKey)
      .pipe(
        catchError((err) => {
          this.alertService.showAlert(err.message);
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
