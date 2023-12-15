import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {FavoriteLocation, FavoritesQuery} from "./data/store/favorites.query";
import {FavoritesStore} from "./data/store/favorites.store";
import {combineLatest, Observable, tap} from "rxjs";
import {CoreQuery, LocalStorageKeys, LocalStorageService} from 'projects/core/src/public-api';
import {getIcon} from 'projects/core/src/lib/const/weather-icons.const';
import {Router} from "@angular/router";

@Component({
  selector: 'lib-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FavoritesStore, FavoritesQuery]
})
export class FavoritesComponent implements OnInit {

  private favoritesQuery = inject(FavoritesQuery);
  private appCore = inject(CoreQuery);
  private router = inject(Router);

  favorites$ = this.favoritesQuery.favorites$;
  isMetric$ = this.appCore.isMetric$;
  loading$ = this.favoritesQuery.selectLoading();

  public viewData$: Observable<{
    favorites: FavoriteLocation[],
    isMetric: boolean
  }> = combineLatest({
    favorites: this.favorites$,
    isMetric: this.isMetric$,
  });

  ngOnInit(): void {
    this.favoritesQuery.setLoading(true);
  }

  getIcon(weatherIcon: number) {
    return getIcon(weatherIcon);
  }

  onSelectLocation(location: FavoriteLocation): void {
    this.appCore.setCurrentLocation(location);
    this.router.navigate(['/home']);
  }

  onFavoriteChange(locationKey: string): void {
    let favorites = LocalStorageService.getItem<string[]>(LocalStorageKeys.favorites);
    favorites = favorites.filter(f => f !== locationKey);
    LocalStorageService.setItem({key: LocalStorageKeys.favorites, item: favorites});

    this.favoritesQuery.setFavorites(favorites);
  }
}
