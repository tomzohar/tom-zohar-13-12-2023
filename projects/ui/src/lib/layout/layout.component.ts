import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {SlideToggleComponent} from "../slide-toggle/slide-toggle.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {AppLayoutThemeService} from 'projects/core/src/lib/services/app-layout-theme.service';
import {CoreQuery} from 'projects/core/src/public-api';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SlideToggleComponent, ToolbarComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {

  appLayoutThemeService = inject(AppLayoutThemeService);
  appCoreStore = inject(CoreQuery);
  darkMode$ = this.appCoreStore.isDarkMode$;
  isMetric$ = this.appCoreStore.isMetric$;

  ngOnInit(): void {
    this.appCoreStore.isDarkMode$
      .subscribe(isDarkMode => {
        this.appLayoutThemeService.setThemeStyles(isDarkMode);
      });
  }

  onToggleDarkmode(event: MatSlideToggleChange) {
    this.appCoreStore.setDarkMode(event.checked);
  }

  onSetMetric(event: MatSlideToggleChange) {
    this.appCoreStore.setMetric(event.checked);
  }
}
