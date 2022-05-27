import { Injectable } from '@angular/core';
import * as localforage from 'localforage';

import { DBKeys, DB_NAME } from '../../constants/localforage.constant';

@Injectable({
  providedIn: 'root',
})
export class LocalforageService {
  constructor() {
    localforage.config({
      name: DB_NAME,
    });
  }

  get(key: DBKeys): Promise<any> {
    return localforage.getItem(key);
  }

  set(key: DBKeys, value: any): Promise<any> {
    return localforage.setItem(key, value);
  }

  remove(key: DBKeys): Promise<void> {
    return localforage.removeItem(key);
  }

  deleteAll(): Promise<void> {
    return localforage.clear();
  }

  listKeys(): Promise<string[]> {
    return localforage.keys();
  }
}
