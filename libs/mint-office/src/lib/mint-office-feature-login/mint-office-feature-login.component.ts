/* eslint-disable @typescript-eslint/unbound-method */
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthActions, authSelectors } from '@cimb/mint-office';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { Auth } from '../core/models/auth.model';
import { Router } from '@angular/router';
import * as authSelector from '../mint-office-feature-login/+state/auth.selectors';


@Component({
  selector: 'cimb-office-mint-office-feature-login',
  templateUrl: './mint-office-feature-login.component.html',
  styleUrls: ['./mint-office-feature-login.component.scss']
})
export class MintOfficeFeatureLoginComponent implements OnInit {
  authForm: UntypedFormGroup;
  errorMessage$ = this.store.select(authSelector.getErrorMessage);

  constructor(
    private readonly fb: UntypedFormBuilder,
    private readonly store: Store,
    private router: Router
  ){

  }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      grantType: new UntypedFormControl('password'),
      username: new UntypedFormControl('', [Validators.required]),
      password: new UntypedFormControl('', [Validators.required])
    })
  }


  public login(): void {
    this.store.dispatch(AuthActions.authStart({data: this.authForm.value as Auth}));
    this.store.select(authSelectors.isAuthenticated).pipe(
      tap(res => {
        if(res) {
            void this.router.navigate(['home']);
        }
      })
    ).subscribe()
  }

}
