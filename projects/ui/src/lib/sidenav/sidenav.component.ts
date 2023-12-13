import {ChangeDetectionStrategy, Component} from "@angular/core";
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  standalone: true,
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatSidenavModule]
})
export class SidenavComponent {
}
