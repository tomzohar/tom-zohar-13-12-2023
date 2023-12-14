import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {DatePipe, NgIf, NgOptimizedImage} from '@angular/common';
import {TemperatureValue} from 'projects/core/src/public-api';
import {CardComponent} from 'projects/ui/src/public-api';

@Component({
  selector: 'app-forecast-summary',
  standalone: true,
  imports: [NgIf, NgOptimizedImage, CardComponent, DatePipe],
  templateUrl: './forecast-summary.component.html',
  styleUrls: ['./forecast-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastSummaryComponent {

  @Input() icon: string;
  @Input() description: string;
  @Input() minTemp: TemperatureValue;
  @Input() maxTemp: TemperatureValue;
  @Input() date: string;

}
