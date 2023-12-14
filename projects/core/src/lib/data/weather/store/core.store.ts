import {Injectable} from '@angular/core';
import {Store, StoreConfig} from '@datorama/akita';
import {WeatherLocationDto} from "../../../types/interface/weather.interface";

const DEFAULT_LOCATION: WeatherLocationDto = {
  AdministrativeArea: {ID: "TA", LocalizedName: "Tel Aviv"},
  Country: {ID: "IL", LocalizedName: "Israel"},
  Key: "215854",
  LocalizedName: "Tel Aviv",
  Rank: 31,
  Type: "City",
  Version: 1
}

export interface CoreState {
  isDarkMode: boolean;
  currentLocation: WeatherLocationDto | null,
  metric: boolean;
}

export function createInitialState(): CoreState {
  return {
    isDarkMode: false,
    currentLocation: DEFAULT_LOCATION,
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
