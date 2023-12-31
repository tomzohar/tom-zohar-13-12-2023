import {ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {SlideToggleComponent} from "../slide-toggle/slide-toggle.component";
import {ToolbarComponent} from "../toolbar/toolbar.component";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {AppLayoutThemeService} from 'projects/core/src/lib/services/app-layout-theme.service';
import {AppRoutes, CoreQuery} from 'projects/core/src/public-api';
import {MenuComponent} from "../menu/menu.component";
import {MenuItem} from "../menu/menu-item.interface";
import {IconComponent} from "../icon/icon.component";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SlideToggleComponent, ToolbarComponent, MenuComponent, IconComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit, OnDestroy {
  private appLayoutThemeService = inject(AppLayoutThemeService);
  private appCoreStore = inject(CoreQuery);
  private router = inject(Router);

  public darkMode$ = this.appCoreStore.isDarkMode$;
  public isMetric$ = this.appCoreStore.isMetric$;

  public menuItems: MenuItem[] = [
    {id: AppRoutes.home, label: 'Home', icon: 'home'},
    {id: AppRoutes.favorites, label: 'Favorites', icon: 'star'},
  ];

  private readonly destroyed$ = new Subject();

  ngOnInit(): void {
    this.appCoreStore.isDarkMode$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(isDarkMode => {
        this.appLayoutThemeService.setThemeStyles(isDarkMode);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
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
