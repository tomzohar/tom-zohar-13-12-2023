import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from "../button/button.component";
import {IconComponent} from "../icon/icon.component";

@Component({
  selector: 'app-favorite-toggle',
  standalone: true,
  imports: [CommonModule, ButtonComponent, IconComponent],
  templateUrl: './favorite-toggle.component.html',
  styleUrls: ['./favorite-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoriteToggleComponent {
  @Input() isFavorite: boolean;
  @Output() changed = new EventEmitter<boolean>();

  onClicked() {
    this.isFavorite = !this.isFavorite;
    this.changed.emit(this.isFavorite);
  }
}
