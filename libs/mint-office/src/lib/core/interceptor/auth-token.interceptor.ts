import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpHeaders, HttpEvent } from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../meta-reducer/index';
import { Observable, of } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
    constructor(
        private store: Store<fromApp.AppState>,
        private readonly storageService: StorageService
    ) {}

    /* istanbul ignore next */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return  of(this.storageService.getItem<string>('access_token')).pipe(
            take(1),
            map(token => {
                return token;
            }),
            exhaustMap((token: string | null) => {
              if (!token) {
                return next.handle(req);
              }
              const modifiedReq = req.clone({
                headers: new HttpHeaders().set('Authorization',`Bearer ${token}`)
              });
              return next.handle(modifiedReq);
            })
          );
    }
}
