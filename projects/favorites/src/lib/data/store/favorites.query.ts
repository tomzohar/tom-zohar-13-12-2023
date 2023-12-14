import {Injectable} from "@angular/core";
import {Query} from "@datorama/akita";
import {FavoritesState, FavoritesStore} from "./favorites.store";
import {combineLatest, map, Observable, switchMap} from "rxjs";
import {
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
            this.weatherApiService.getCurrentWeather(favorite),
            this.weatherSearchService.getLocationByKey(favorite)
          ])
            .pipe(
              map(([weather, location]) => ({
                ...weather,
                ...location,
                isFavorite: true,
              }))
            );
        }));
      })
    );

  constructor(
    protected override store: FavoritesStore,
    private weatherApiService: WeatherApiService,
    private weatherSearchService: WeatherSearchService,
  ) {
    super(store);
  }

  setFavorites(favorites: string[]): void {
    this.store.update(state => ({
      favorites
    }))
  }
}
