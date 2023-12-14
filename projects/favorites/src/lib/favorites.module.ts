import {NgModule} from '@angular/core';
import {FavoritesComponent} from './favorites.component';
import {FavoritesRoutingModule} from "./favorites-routing.module";
import {CommonModule} from "@angular/common";
import {ButtonComponent, CardComponent, FavoriteToggleComponent, IconComponent} from 'projects/ui/src/public-api';


@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
    CardComponent,
    FavoriteToggleComponent,
    IconComponent,
    ButtonComponent
  ],
  exports: [
    FavoritesComponent
  ]
})
export class FavoritesModule {
}
