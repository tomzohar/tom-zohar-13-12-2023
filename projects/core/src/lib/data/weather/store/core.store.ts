import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {WeatherLocationDto} from "../../../types/interface/weather.interface";


export interface CoreState {
  isDarkMode: boolean;
  currentLocation: WeatherLocationDto | null,
  metric: boolean;
}

export function createInitialState(): CoreState {
  return {
    isDarkMode: false,
    currentLocation: null,
    metric: true,
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'core'})
export class CoreStore extends Store<CoreState> {
  constructor() {
    super(createInitialState());
  }
}
