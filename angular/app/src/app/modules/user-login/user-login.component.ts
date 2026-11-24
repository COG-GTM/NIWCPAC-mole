import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services';
import { UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import { MatCardTitle, MatCard, MatCardContent } from '@angular/material/card';
import { MatFormField, MatLabel, MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'mole-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss'],
    imports: [MatCardTitle, MatCard, FormsModule, ReactiveFormsModule, MatCardContent, MatFormField, MatLabel, MatInput, MatButton]
})
export class UserLoginComponent implements OnInit {
    public user: any;

    form: UntypedFormGroup;
    loading = false;
    submitted = true;
    gearURL = environment.staticURL + '/assets/gear.gif';

    constructor(
      public _authService: AuthService,
      private fb: UntypedFormBuilder
    ) { }

    ngOnInit() {
      this.form = this.fb.group({
        username: [''],
        password: ['']
      })

    }

    get f() { return this.form.controls; }

    public refreshToken() {
      this._authService.refreshToken();
    }

    public logout() {
      this._authService.userLogout();
    }

    public onSubmit() {
      this.submitted = true;
      this._authService.userLogin(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe( data => {
          data['username'] = this.f.username.value;
          localStorage.setItem('user', JSON.stringify(data));
        },
        error => { console.log(error) }
      )
    }

  }
