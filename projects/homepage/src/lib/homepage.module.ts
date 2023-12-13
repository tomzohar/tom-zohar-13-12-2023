import { NgModule } from '@angular/core';
import { HomepageComponent } from './homepage.component';
import {HomepageRoutingModule} from "./homepage-routing.module";



@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    HomepageRoutingModule
  ],
  exports: [
    HomepageComponent
  ]
})
export class HomepageModule { }
