import {NgModule} from '@angular/core';
import {HomepageComponent} from './homepage.component';
import {HomepageRoutingModule} from "./homepage-routing.module";
import {CardComponent} from 'projects/ui/src/public-api';
import {CommonModule, NgOptimizedImage} from "@angular/common";


@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    CardComponent,
    NgOptimizedImage,
  ],
  exports: [
    HomepageComponent
  ]
})
export class HomepageModule {
}
