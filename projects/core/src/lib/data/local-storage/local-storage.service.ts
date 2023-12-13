import {Injectable} from "@angular/core";
import {LocalStorageItem} from "../../types/interface/local-storage-item.interface";


@Injectable({providedIn: 'root'})
export class LocalStorageService {

  private readonly prefix = 'weather_app__';

  setItem(item: LocalStorageItem<unknown>): void {
    localStorage.setItem(this.prefix + item.key, JSON.stringify(item.item));
  }

  getItem<T>(key: LocalStorageItem<T>['key']): T | null {
    return JSON.parse(localStorage.getItem(this.prefix + key) as string);
  }

}
