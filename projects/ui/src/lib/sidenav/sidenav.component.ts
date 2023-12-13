import {ChangeDetectionStrategy, Component} from "@angular/core";
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  standalone: true,
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatSidenavModule, RouterLinkActive, RouterLink, NgIf]
})
export class SidenavComponent {
}
