import { Component, inject, signal } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import { AuthService } from "./shared/services/auth/auth.service"
import { TrialApiService } from "./shared/services/trial/trial-api.service"
import { moleLinks } from "./app-routing.module"
import { ThemeService } from './shared/services';
import { toSignal } from '@angular/core/rxjs-interop';
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
export class AppComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  _authService = inject(AuthService);
  _trialService = inject(TrialApiService);
  private _themeService = inject(ThemeService);

  public pageTitle = signal<string | undefined>(undefined);
  // remove links that are simple redirects
  routes: Route[] = this.router.config.filter(obj => obj.redirectTo == null);
  visibility: false;
  trialVisibility: true;
  links: any[] = moleLinks;
  isLightTheme = toSignal(this._themeService.isLightTheme(), { initialValue: false });

  onActivate(componentReference) {
    if(componentReference.pageTitle) {
      this.pageTitle.set(componentReference.pageTitle);
    }
  }

  getTrial(trial) {
    // console.log(trial)
  }

  toggleTheme(val) {
    this._themeService.setLightTheme(val);
  }


}
