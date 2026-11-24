import * as Cesium from 'cesium';
import { environment } from './environments/environment';

// Expose the single bundled Cesium instance (also used by @auscope/angular-cesium) as the
// `Cesium` global before any app module is evaluated.
(window as any).CESIUM_BASE_URL = environment.staticURL + '/assets/cesium/';
(window as any).Cesium = Cesium;
