import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {CardComponent} from 'projects/ui/src/public-api';
import {count} from "rxjs";
import {TemperatureValue} from 'projects/core/src/public-api';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CardComponent, NgOptimizedImage, DatePipe],
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentWeatherComponent {
  @Input() icon: string;
  @Input() city: string;
  @Input() country: string;
  @Input() temperature: TemperatureValue;
  @Input() weatherDescription: string;
  @Input() time: string;
  protected readonly count = count;
}

