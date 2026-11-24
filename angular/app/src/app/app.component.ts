import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import { AuthService } from "./shared/services/auth/auth.service"
import { TrialApiService } from "./shared/services/trial/trial-api.service"
import { moleLinks } from "./app-routing.module"
import { ThemeService } from './shared/services';
import { Subscription } from 'rxjs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { HeaderBarComponent } from './shared/components/trial/header-bar/header-bar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterLink, RouterLinkActive, RouterOutlet, FlexLayoutModule, MatToolbarModule, MatIconModule, MatSlideToggleModule,
        MatButtonModule, MatSidenavModule, MatListModule, MatDividerModule, HeaderBarComponent]
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();
  public pageTitle: string;
  routes: Route[];
  visibility: false;
  trialVisibility: true;
  links: any[] = moleLinks;
  isLightTheme: boolean;

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    public _authService: AuthService,
    public _trialService: TrialApiService,
    private _themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.routes = this.router.config;

    // remove links that are simple redirects
    this.routes = this.routes.filter(function( obj ) {
      return obj.redirectTo == null;
    });

    this.subscriptions.add(this._themeService.isLightTheme().subscribe(
      isLight => {
        this.isLightTheme = isLight;
      }
    ));

  }

  onActivate(componentReference) {
    if(componentReference.pageTitle) {
      this.pageTitle = componentReference.pageTitle;
    }
  }

  getTrial(trial) {
    // console.log(trial)
  }

  toggleTheme(val) {
    this._themeService.setLightTheme(val);
  }

  // clean up
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
