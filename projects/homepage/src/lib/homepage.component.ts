import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {getIcon} from 'projects/core/src/lib/const/weather-icons.const';
import {
  AlertService,
  CoreQuery,
  CurrentWeatherDto,
  MultiDayForecast,
  WeatherLocationDto,
  WeatherSearchService
} from 'projects/core/src/public-api';
import {BehaviorSubject, catchError, combineLatest, EMPTY, Observable, tap} from "rxjs";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent {
  private appCore = inject(CoreQuery);
  private weatherSearchService = inject(WeatherSearchService);
  private alertService = inject(AlertService);

  loading$ = this.appCore.selectLoading();

  private currentWeather$ = this.appCore.currentWeather$;
  private currentLocation$ = this.appCore.currentLocation$;
  private multiForecast$ = this.appCore.multiForecast$;
  private isMetric$ = this.appCore.isMetric$;
  public viewData$: Observable<{
    currentWeather: CurrentWeatherDto;
    currentLocation: WeatherLocationDto,
    multiForecast: MultiDayForecast,
    isMetric: boolean,
  }> = combineLatest({
    currentWeather: this.currentWeather$,
    currentLocation: this.currentLocation$,
    multiForecast: this.multiForecast$,
    isMetric: this.isMetric$,
  });

  searchOptions$ = new BehaviorSubject<string[]>([]);

  searchLocations: WeatherLocationDto[];

  getIcon(weatherIcon: number) {
    return getIcon(weatherIcon);
  }

  onNewSearch(term: string): void {
    this.weatherSearchService.searchLocation(term)
      .pipe(
        catchError((err) => {
          this.alertService.showAlert(err.message);
          return EMPTY;
        })
      )
      .subscribe(response => {
        this.searchLocations = response;
        this.searchOptions$.next(response.map(location => location.AdministrativeArea.LocalizedName));
      })

  }

  onLocationSelected(selectedLocation: string): void {
    const location = this.searchLocations.find(l => l.AdministrativeArea.LocalizedName === selectedLocation);
    if (location) {
      this.appCore.setCurrentLocation(location);
    }
  }

  onToggleFavorite(isFavorite: boolean) {
    this.appCore.setFavorite(isFavorite);
  }
}
