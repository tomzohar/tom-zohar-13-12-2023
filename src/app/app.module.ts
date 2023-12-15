import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutComponent} from "projects/ui/src/public-api";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutComponent,
    HttpClientModule
  ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule {
}
