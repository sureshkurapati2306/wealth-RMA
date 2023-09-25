import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthActions, StorageService } from '@cimb/mint-office';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Auth, authData, logout } from '../models/auth.model';
import { Environment } from '../models/environment.model';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root',
})
export class AuthService {
    readonly environment: Environment;
    private authAPIUrl: string;
    private logoutAPIURL: string;

    constructor(
        @Inject('environment') environment: Environment,
        private http: HttpClient,
        private store: Store, public router: Router,
        private readonly storageService: StorageService,
    ) {
        this.environment = environment;
        this.authAPIUrl = this.environment.apiUrl + '/sso/token/login';

        this.logoutAPIURL = this.environment.apiUrl + '/sso/token/logout';
    }

    /* istanbul ignore next */
    public initApp(): void {
        const tokenExists = this.storageService.getItem<string>('refresh_token');
        const expiresIn = this.storageService.getItem<string>('expires_in');
        if (!tokenExists) {
            void this.router.navigate(['login']);
            return;
        }

        this.store.dispatch(
            AuthActions.refreshAuth({
                data: {
                    auth: {
                        grantType: 'refresh_token',
                        token: tokenExists,
                    },
                    expires_in: expiresIn,
                },
            }),
        );

    }

    login(data: Auth): Observable<authData> {
        return this.http.post<authData>(this.authAPIUrl, data).pipe(
            catchError((error: HttpErrorResponse) => {
                console.error(error);
                return throwError(error);
            }),
        );
    }

    logout(data: logout): Observable<logout> {
        return this.http
            .post<logout>(this.logoutAPIURL, { refresh_token: data.refresh_token })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    console.error(error);
                    return throwError(error);
                }),
            );
    }

    /* istanbul ignore next */
    setUserDataInSessionStorage(data: authData): void {
        const date = new Date().getTime();
        this.storageService.setItem<string>('access_token', data.access_token);
        this.storageService.setItem<string>('refresh_token', data.refresh_token);
        this.storageService.setItem<string>('token_type', data.token_type);
        this.storageService.setItem<string>('expires_in', (date + (+data.expires_in * 1000)).toString());
        this.storageService.setItem<string>('refresh_expires_in', (date + (+data.refresh_expires_in * 1000)).toString());
    }
}
