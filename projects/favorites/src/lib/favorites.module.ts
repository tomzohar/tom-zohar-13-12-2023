import { NgModule } from '@angular/core';
import { FavoritesComponent } from './favorites.component';
import {FavoritesRoutingModule} from "./favorites-routing.module";



@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    FavoritesRoutingModule
  ],
  exports: [
    FavoritesComponent
  ]
})
export class FavoritesModule { }
