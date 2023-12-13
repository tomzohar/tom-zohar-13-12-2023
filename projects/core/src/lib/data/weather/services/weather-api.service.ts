import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {LocalStorageService} from "../../local-storage/local-storage.service";
import {CurrentWeatherDto, MultiDayForecast, WeatherLocationDto} from "../../../types/interface/weather.interface";


@Injectable({providedIn: 'root'})
export class WeatherApiService {
  private http = inject(HttpClient);
  private localStorage = inject(LocalStorageService);
  private apiKey = 'SWEdn1BA0HiTYlB6iop1q1nmsUrrhvR3';
  private apiUrl = 'http://dataservice.accuweather.com';

  private readonly cache: Record<string, any> = this.localStorage.getItem<Record<string, any>>('apiRequests') || {};

  searchLocation(term: string): Observable<WeatherLocationDto[]> {
    const cacheLocation = this.getFromCache<WeatherLocationDto[]>(term);
    if (cacheLocation) {
      return of(cacheLocation);
    }

    return this.http.get<WeatherLocationDto[]>(`${this.apiUrl}/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${term}&language=en-us`)
      .pipe(
        tap((locations: WeatherLocationDto[]) => {
          this.cacheResponse(term, locations);
        }));
  }

  getCurrentWeather(locationKey: WeatherLocationDto['Key']): Observable<CurrentWeatherDto> {
    const currentWeather = this.getFromCache<CurrentWeatherDto>(locationKey + '_current');
    if (currentWeather) {
      return of(currentWeather);
    }

    return this.http.get<CurrentWeatherDto>(`${this.apiUrl}/currentconditions/v1/${locationKey}?apikey=${this.apiKey}&details=false`)
      .pipe(
        tap(response => {
          this.cacheResponse(locationKey + '_current', response);
        })
      );
  }

  getForecast(locationKey: string): Observable<MultiDayForecast> {
    const forecast = this.getFromCache<MultiDayForecast>(locationKey + '_5day');
    if (forecast) {
      return of(forecast);
    }

    return this.http.get<MultiDayForecast>(`${this.apiUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${this.apiKey}&details=false`)
      .pipe(
        tap(response => {
          this.cacheResponse(locationKey + '_5day', response);
        })
      );
  }

  private getFromCache<T>(key: string): T | undefined {
    return this.cache[key];
  }

  private cacheResponse<T>(key: string, response: T): void {
    this.cache[key] = response;
    this.localStorage.setItem({key: 'apiRequests', item: this.cache});
  }

}
