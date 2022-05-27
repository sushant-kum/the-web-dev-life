import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { DBKeys } from '../../constants/localforage.constant';
import { LocalforageService } from '../localforage/localforage.service';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private _darkMode: boolean = false;
  private _darkModeSubject: Subject<boolean> = new Subject<boolean>();

  set darkMode(darkMode: boolean) {
    this._localForageSvc.set(DBKeys.GLOBAL__SETTINGS__DARK_MODE, darkMode).then(() => {
      this._darkMode = darkMode;
      this._darkModeSubject.next(darkMode);
    });
  }

  get darkMode(): boolean {
    return this._darkMode;
  }

  get darkModeAsObservable(): Observable<boolean> {
    return this._darkModeSubject.asObservable();
  }

  constructor(private _localForageSvc: LocalforageService) {
    this._localForageSvc.get(DBKeys.GLOBAL__SETTINGS__DARK_MODE).then((preSetDarkMode: boolean) => {
      if (preSetDarkMode !== null) {
        this._darkMode = preSetDarkMode;
      } else {
        if (window.matchMedia('(prefers-color-scheme)').media !== 'not all') {
          this._darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false;
        } else {
          this._darkMode = false;
        }

        this._localForageSvc.set(DBKeys.GLOBAL__SETTINGS__DARK_MODE, this._darkMode);
      }

      this._darkModeSubject.next(this._darkMode);
    });
  }
}
