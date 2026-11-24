import { BrowserModule } from '@angular/platform-browser';
import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoleMatModule } from "./shared/molemat.module";
import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from './shared/services';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from 'src/environments/environment';

import { SharedModule } from '../app/shared/shared.module';

import { JwtInterceptor, ErrorInterceptor } from './shared/helpers/'
@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        MoleMatModule,
        AppRoutingModule,
        FlexLayoutModule,
        FontAwesomeModule,
        FormsModule,
        SharedModule], providers: [
        provideZoneChangeDetection(),
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: APP_BASE_HREF, useValue: environment.baseHref },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule { }
