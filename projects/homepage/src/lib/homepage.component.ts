import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {getIcon} from 'projects/core/src/lib/const/weather-icons.const';
import {CoreQuery, CurrentWeatherDto, MultiDayForecast, WeatherLocationDto} from 'projects/core/src/public-api';
import {combineLatest, Observable} from "rxjs";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent {
  private appCore = inject(CoreQuery);

  private currentWeather$ = this.appCore.currentWeather$;
  private currentLocation$ = this.appCore.currentLocation$;
  private multiForecast$ = this.appCore.multiForecast$;
  public viewData$: Observable<{
    currentWeather: CurrentWeatherDto;
    currentLocation: WeatherLocationDto,
    multiForecast: MultiDayForecast,
  }> = combineLatest({
    currentWeather: this.currentWeather$,
    currentLocation: this.currentLocation$,
    multiForecast: this.multiForecast$,
  });

  getIcon(weatherIcon: number) {
    return getIcon(weatherIcon);
  }
}
