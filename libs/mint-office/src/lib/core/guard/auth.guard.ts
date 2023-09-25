import { map, switchMap } from 'rxjs/operators';
import { State } from '../../mint-office-feature-login/+state/auth.reducer';
import { Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';
import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    UrlTree,
} from '@angular/router';
import { isAuthenticated } from '../../mint-office-feature-login/+state/auth.selectors';
import { Environment } from '../models/environment.model';
import { environment } from '../../../../../../apps/rma-app/src/environments/environment';
import { StorageService } from '../services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    readonly environment: Environment;
    constructor(
        private store: Store<State>,
        private router: Router,
        private readonly storageService: StorageService,
    ) {
        this.environment = environment;
    }
    canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
            return this.store.select(isAuthenticated).pipe(map((authenticated) => {
                if (!authenticated) {
                    this.storageService.clear();
                   void this.router.navigate(['login']);
                }
                return true;
            }))
    }
}
