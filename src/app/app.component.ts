import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { environment as env } from 'src/environments/environment';
import { VERSION } from 'src/environments/version-info';

import { APP_TITLE } from './constants/app-title.constant';
import { DarkModeService } from './services/dark-mode/dark-mode.service';

interface State {
  darkMode: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private _destroy = new Subject();
  private _destroy$ = this._destroy.asObservable();

  state: State = {
    darkMode: false,
  };

  constructor(private _title: Title, private _darkModeService: DarkModeService) {
    this._title.setTitle((env.production ? '' : '*Dev* ') + APP_TITLE);

    this.state.darkMode = this._darkModeService.darkMode;
    this._darkModeService.darkModeAsObservable
      .pipe(takeUntil(this._destroy$))
      .subscribe((darkMode: boolean) => (this.state.darkMode = darkMode));

    console.info(`${APP_TITLE} version: ${VERSION.version}, built: ${new Date(VERSION.buildTimestamp)}`);
  }

  ngOnDestroy(): void {
    this._destroy.next();
  }
}
