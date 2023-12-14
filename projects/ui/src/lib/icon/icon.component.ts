import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent {
  @Input() icon: string;
}
