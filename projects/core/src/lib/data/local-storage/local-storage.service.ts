import {Injectable} from "@angular/core";
import {LocalStorageItem} from "../../types/interface/local-storage-item.interface";


@Injectable({providedIn: 'root'})
export class LocalStorageService {

  static readonly prefix = 'weather_app__';

  static setItem(item: LocalStorageItem<unknown>): void {
    localStorage.setItem(LocalStorageService.prefix + item.key, JSON.stringify(item.item));
  }

  static getItem<T>(key: LocalStorageItem<T>['key']): T | null {
    return JSON.parse(localStorage.getItem(LocalStorageService.prefix + key) as string);
  }

}
