import {NgModule} from '@angular/core';
import {HomepageComponent} from './homepage.component';
import {HomepageRoutingModule} from "./homepage-routing.module";
import {CardComponent} from 'projects/ui/src/public-api';


@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    HomepageRoutingModule,
    CardComponent,
  ],
  exports: [
    HomepageComponent
  ]
})
export class HomepageModule {
}
