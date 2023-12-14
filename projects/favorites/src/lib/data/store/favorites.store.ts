import {Injectable} from "@angular/core";
import {Store, StoreConfig} from "@datorama/akita";
import {LocalStorageKeys, LocalStorageService} from "projects/core/src/public-api";

export interface FavoritesState {
  favorites: string[];
}

export function createInitialState(): FavoritesState {
  const favorites = LocalStorageService.getItem<string[]>(LocalStorageKeys.favorites) || [];

  return {
    favorites: favorites,
  }
}

@Injectable()
@StoreConfig({name: 'favorites'})
export class FavoritesStore extends Store<FavoritesState> {
  constructor() {
    super(createInitialState());
  }
}
