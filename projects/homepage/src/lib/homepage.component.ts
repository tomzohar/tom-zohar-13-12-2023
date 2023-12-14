import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {getIcon} from 'projects/core/src/lib/const/weather-icons.const';
import {CoreQuery, CurrentWeatherDto, WeatherLocationDto} from 'projects/core/src/public-api';
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
  public viewData$: Observable<{
    currentWeather: CurrentWeatherDto;
    currentLocation: WeatherLocationDto
  }> = combineLatest({
    currentWeather: this.currentWeather$,
    currentLocation: this.currentLocation$
  });

  getIcon(weatherIcon: number) {
    return getIcon(weatherIcon);
  }
}
