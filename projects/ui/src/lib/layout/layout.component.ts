import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {SlideToggleComponent} from "../slide-toggle/slide-toggle.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {AppLayoutThemeService} from 'projects/core/src/lib/services/app-layout-theme.service';
import {CoreQuery} from 'projects/core/src/public-api';
import {MenuComponent} from "../menu/menu.component";
import {MenuItem} from "../menu/menu-item.interface";
import {IconComponent} from "../icon/icon.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SlideToggleComponent, ToolbarComponent, MenuComponent, IconComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {

  appLayoutThemeService = inject(AppLayoutThemeService);
  appCoreStore = inject(CoreQuery);
  private router = inject(Router);
  darkMode$ = this.appCoreStore.isDarkMode$;
  isMetric$ = this.appCoreStore.isMetric$;

  menuItems: MenuItem[] = [
    {id: 'home', label: 'Home', icon: 'home'},
    {id: 'favorites', label: 'Favorites', icon: 'star'},
  ];

  ngOnInit(): void {
    this.appCoreStore.isDarkMode$
      .subscribe(isDarkMode => {
        this.appLayoutThemeService.setThemeStyles(isDarkMode);
      });
  }

  onToggleDarkmode(event: MatSlideToggleChange): void {
    this.appCoreStore.setDarkMode(event.checked);
  }

  onSetMetric(event: MatSlideToggleChange): void {
    this.appCoreStore.setMetric(event.checked);
  }

  onMenuItemSelected(item: MenuItem): void {
    this.router.navigate([item.id]);
  }
}
