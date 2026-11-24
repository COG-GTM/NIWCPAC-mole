import './cesium-global';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
Cesium.buildModuleUrl.setBaseUrl(environment.staticURL+'/assets/cesium/');
Cesium.Ion.defaultAccessToken = "";

// angular-cesium bundles code that reads the global Cesium while its module is
// evaluated, so the app is only loaded once cesium-global has run.
import('./app/app.module')
  .then(({ AppModule }) => platformBrowserDynamic().bootstrapModule(AppModule))
  .catch(err => console.error(err));
