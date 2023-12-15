import {WeatherLocationDto} from "../types/interface/weather.interface";
import {LocalStorageService} from "../data/local-storage/local-storage.service";
import {LocalStorageKeys} from "../types/enum/local-storage-keys.enum";

export const DEFAULT_LOCATION: WeatherLocationDto = {
  AdministrativeArea: {ID: "TA", LocalizedName: "Tel Aviv"},
  Country: {ID: "IL", LocalizedName: "Israel"},
  Key: "215854",
  LocalizedName: "Tel Aviv",
  Rank: 31,
  Type: "City",
  Version: 1,
  isFavorite: (LocalStorageService.getItem<string[]>(LocalStorageKeys.favorites) || []).includes("215854")
}
