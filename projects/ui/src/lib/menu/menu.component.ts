import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {IconComponent} from "../icon/icon.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {ButtonComponent} from "../button/button.component";
import {MenuItem} from "./menu-item.interface";
import {NgFor, NgIf} from "@angular/common";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    IconComponent,
    MatMenuModule,
    MatButtonModule,
    ButtonComponent,
    NgFor,
    NgIf
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {

  @Input() menuItems: MenuItem[];
  @Output() selected = new EventEmitter<MenuItem>();

}
