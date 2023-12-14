import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSlideToggleChange, MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ThemeColors} from 'projects/core/src/public-api';

@Component({
  selector: 'app-slide-toggle',
  standalone: true,
  imports: [MatSlideToggleModule],
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideToggleComponent {
  @Input() color: ThemeColors;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Output() toggleChanged = new EventEmitter<MatSlideToggleChange>();
}
