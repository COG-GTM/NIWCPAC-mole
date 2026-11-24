import './cesium-global';
import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
Cesium.buildModuleUrl.setBaseUrl(environment.staticURL+'/assets/cesium/');
Cesium.Ion.defaultAccessToken = "";

// angular-cesium bundles code that reads the global Cesium while its module is
// evaluated, so the app is only loaded once cesium-global has run.
Promise.all([import('./app/app.component'), import('./app/app.config')])
  .then(([{ AppComponent }, { appConfig }]) => bootstrapApplication(AppComponent, appConfig))
  .catch(err => console.error(err));
