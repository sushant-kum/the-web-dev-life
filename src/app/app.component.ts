import { Component, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { VERSION } from 'src/environments/version-info';

import { APP_TITLE } from './constants/app-title.constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private _destroy = new Subject();

  constructor(private _title: Title) {
    this._title.setTitle((env.production ? '' : '*Dev* ') + APP_TITLE);

    console.info(`${APP_TITLE} version: ${VERSION.version}, built: ${new Date(VERSION.buildTimestamp)}`);
  }

  ngOnDestroy(): void {
    this._destroy.next();
  }
}
