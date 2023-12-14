import {Component, inject, OnInit} from '@angular/core';
import {CoreQuery} from "../../projects/core/src/lib/data/weather/store/core.query";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private appCore = inject(CoreQuery);

  ngOnInit() {
    this.appCore.initUserLocation();
  }
}
