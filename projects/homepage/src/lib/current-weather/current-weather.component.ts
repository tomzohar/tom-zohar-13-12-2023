import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgOptimizedImage, NgStyle} from '@angular/common';
import {ButtonComponent, CardComponent, FavoriteToggleComponent, IconComponent} from 'projects/ui/src/public-api';
import {TemperatureValue} from 'projects/core/src/public-api';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [
    CardComponent,
    NgOptimizedImage,
    DatePipe,
    ButtonComponent,
    IconComponent,
    NgStyle,
    FavoriteToggleComponent
  ],
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
  @Input() favorite: boolean;

  @Output() toggleFavorite = new EventEmitter<boolean>;
}

