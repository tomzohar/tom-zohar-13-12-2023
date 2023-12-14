import {inject, Injectable} from "@angular/core";
import {map, Observable, of, tap} from "rxjs";
import {WeatherLocationDto} from "../../../types/interface/weather.interface";
import {LocalStorageService} from "../../local-storage/local-storage.service";
import {WeatherApiService} from "./weather-api.service";
import {LocalStorageKeys} from "../../../types/enum/local-storage-keys.enum";

@Injectable({providedIn: 'root'})
export class WeatherSearchService {
  private weatherApiService = inject(WeatherApiService);
  private localStorageService = inject(LocalStorageService);
  private readonly searchTermCache = new Map<string, WeatherLocationDto[]>;

  searchLocation(term: string): Observable<WeatherLocationDto[]> {
    if (this.searchTermCache.get(term)) {
      return of(this.searchTermCache.get(term))
    }

    return this.weatherApiService.searchLocation(term)
      .pipe(
        map(locations => this.enrichLocation(locations)),
        tap(response => {
          this.searchTermCache.set(term, response);
        }));
  }

  private enrichLocation(locations: WeatherLocationDto[]) {
    const favorites = this.localStorageService.getItem<string[]>(LocalStorageKeys.favorites) || [];
    return locations.map(location => ({
      ...location,
      isFavorite: favorites.includes(location.Key)
    }));
  }
}
