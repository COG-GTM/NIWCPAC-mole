import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from './shared/services';
import { jwtInterceptor, errorInterceptor } from './shared/helpers';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, BrowserAnimationsModule, AppRoutingModule, FlexLayoutModule, FontAwesomeModule, FormsModule, SharedModule),
    provideZoneChangeDetection(),
    AuthService,
    { provide: APP_BASE_HREF, useValue: environment.baseHref },
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor]))
  ]
};
