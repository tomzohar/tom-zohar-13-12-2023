import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Output() clicked = new EventEmitter();
}
