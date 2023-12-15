import {Injectable} from "@angular/core";
import {Query} from "@datorama/akita";
import {FavoritesState, FavoritesStore} from "./favorites.store";
import {catchError, combineLatest, EMPTY, map, Observable, switchMap, tap} from "rxjs";
import {
  AlertService,
  CurrentWeatherDto,
  WeatherApiService,
  WeatherLocationDto,
  WeatherSearchService
} from 'projects/core/src/public-api';


export type FavoriteLocation = CurrentWeatherDto & WeatherLocationDto;

@Injectable()
export class FavoritesQuery extends Query<FavoritesState> {

  favorites$: Observable<FavoriteLocation[]> = this.select('favorites')
    .pipe(
      switchMap((favorites) => {
        return combineLatest(favorites.map(favorite => {
          return combineLatest([
            this.getCurrentWeather(favorite),
            this.getLocation(favorite),
          ])
            .pipe(
              map(([weather, location]) => ({
                ...weather,
                ...location,
                isFavorite: true,
              })),
              tap(() => this.store.setLoading(false)),
            );
        }));
      })
    );

  constructor(
    protected override store: FavoritesStore,
    private weatherApiService: WeatherApiService,
    private weatherSearchService: WeatherSearchService,
    private alertService: AlertService,
  ) {
    super(store);
  }

  setFavorites(favorites: string[]): void {
    this.store.update(state => ({
      favorites
    }))
  }

  setLoading(isLoading: boolean): void {
    this.store.setLoading(isLoading);
  }

  private getLocation(locationKey: string): Observable<WeatherLocationDto> {
    return this.weatherSearchService.getLocationByKey(locationKey)
      .pipe(
        catchError(error => {
          this.alertService.showAlert(error.message);
          return EMPTY;
        })
      );
  }

  private getCurrentWeather(locationKey: string): Observable<CurrentWeatherDto> {
    return this.weatherApiService.getCurrentWeather(locationKey).pipe(
      catchError(error => {
        this.alertService.showAlert(error.message);
        return EMPTY;
      })
    )
  }
}
