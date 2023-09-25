/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of, timer } from 'rxjs';
import { environment } from '../../../../../../apps/rma-app/src/environments/environment';
import { catchError, exhaustMap, finalize, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

import * as AuthActions from './auth.actions';
import * as loadingBarActions from '../../mint-office-ui-loading-indicator/loading-bar/+state/loading-bar.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Environment } from '../../core/models/environment.model';
import { authData, logout } from '../../core/models/auth.model';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../core/services/storage.service';

@Injectable()
export class AuthEffects {

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.authStart),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.authService.login(action.data).pipe(
                    map((data: authData) => {
                        this.authService.setUserDataInSessionStorage(data);

                        this.store.dispatch(
                            AuthActions.refreshAuth({
                                data: {
                                    auth: {
                                        grantType: 'refresh_token',
                                        token: this.storageService.getItem('refresh_token') ? this.storageService.getItem('refresh_token') : '',
                                    },
                                    expires_in: data.expires_in,
                                },
                            }),
                        );
                        return AuthActions.loginSuccess({ authData: data });
                    }),
                    catchError((error: HttpErrorResponse) => of(AuthActions.loginFailure({ error: error.message ? error.message : 'Invalid Credentials.' }))),
                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                );
            }),
        );
    });

    /* istanbul ignore next */
    refresh$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.refreshAuth),
            switchMap((action) => {
                const date = new Date().getTime();
                let timerValue = 0;
                const expiresIn: number | null = this.storageService.getItem('expires_in');
                if (expiresIn) {
                    if (date >= (+expiresIn - 5000)) {
                        return of(AuthActions.loadLogout({ logout: { refresh_token: action.data.auth.token } }))
                    }

                    timerValue = (+expiresIn) - date - 5000;
                }

                return timer(timerValue).pipe(
                    map(() => AuthActions.authStart({ data: action.data.auth }))
                )

            })
        );
    });

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AuthActions.loadLogout),
            exhaustMap((action) => {
                this.store.dispatch(loadingBarActions.loadingBarShow());

                return this.authService.logout(action.logout).pipe(
                    map((data: logout) => {
                        this.storageService.clear();
                        /* istanbul ignore if */
                        if (data.success && !action.logout.isInactive) {
                            void this.router.navigate(['login'])
                        }

                        return AuthActions.loadLogoutSuccess({ logout: data });
                    }),
                    catchError((error: HttpErrorResponse) => of(AuthActions.loadLogoutFailure({ error: error.message }))),
                    finalize(() => {
                        this.store.dispatch(loadingBarActions.loadingBarHide());
                    }),
                );
            }),
        );
    });

    readonly environment: Environment;
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private store: Store,
        private router: Router,
        private readonly storageService: StorageService
    ) {
        this.environment = environment;
    }
}
