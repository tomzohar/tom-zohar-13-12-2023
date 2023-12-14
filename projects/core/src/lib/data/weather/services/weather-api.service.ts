import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable, of, tap} from "rxjs";
import {CurrentWeatherDto, MultiDayForecast, WeatherLocationDto} from "../../../types/interface/weather.interface";


@Injectable({providedIn: 'root'})
export class WeatherApiService {
  private http = inject(HttpClient);
  private apiKey = 'SWEdn1BA0HiTYlB6iop1q1nmsUrrhvR3';
  private apiUrl = 'http://dataservice.accuweather.com';

  searchTermCache = {};

  searchLocation(term: string): Observable<WeatherLocationDto[]> {
    if (this.searchTermCache[term]) {
      return of(this.searchTermCache[term]);
    }

    return this.http.get<WeatherLocationDto[]>(`${this.apiUrl}/locations/v1/cities/autocomplete?apikey=${this.apiKey}&q=${term}&language=en-us`)
      .pipe(tap(response => {
        this.searchTermCache[term] = response;
      }));
  }

  getCurrentWeather(locationKey: WeatherLocationDto['Key']): Observable<CurrentWeatherDto> {
    return this.http.get<CurrentWeatherDto[]>(`${this.apiUrl}/currentconditions/v1/${locationKey}?apikey=${this.apiKey}&details=false`)
      .pipe(
        map(response => response[0]),
      );
  }

  getForecast(locationKey: string): Observable<MultiDayForecast> {
    return this.http.get<MultiDayForecast>(`${this.apiUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${this.apiKey}&details=false`)
  }

}
