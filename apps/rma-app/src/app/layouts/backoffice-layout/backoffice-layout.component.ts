import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions, authSelectors, MintOfficeSelectors, TransactionLogoutService } from '@cimb/mint-office';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { logout } from 'libs/mint-office/src/lib/core/models/auth.model';
import jwt_decode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'libs/mint-office/src/lib/core/services/storage.service';

type JwtDecodeObject = { [key: string]: string };
@Component({
    selector: 'cimb-backoffice-layout',
    templateUrl: './backoffice-layout.component.html',
    styleUrls: ['./backoffice-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackofficeLayoutComponent implements OnInit {
    footerClassName$: Observable<string>;

    isAuthenticated = this.store.select(authSelectors.isAuthenticated);

    userName: string;

    constructor(
        private store: Store,
        private cdr: ChangeDetectorRef,
        public dialog: MatDialog,
        public transactionLogoutService: TransactionLogoutService,
        private readonly storageService: StorageService,
    ) {

    }

    ngOnInit(): void {
        this.footerClassName$ = this.store.select(MintOfficeSelectors.getCimbFooterClassName).pipe(
            tap(() => {
                setTimeout(() => {
                    this.cdr.markForCheck();
                });
            }),
        );
        this.store
            .select(authSelectors.getToken)
            .pipe(
                tap((data) => {
                    if (data) {
                        const token: JwtDecodeObject = jwt_decode(data);
                        this.userName = token.preferred_username;
                    }
                }),
            )
            .subscribe();
    }

    logout(): void {
        this.transactionLogoutService.logout().subscribe((result) => {
            if (result && result === 'Continue') {
                const data: logout = {
                    refresh_token: this.storageService.getItem<string>('refresh_token'),
                    isInactive: false,
                    success: false
                };
                this.store.dispatch(AuthActions.loadLogout({ logout: data }));
            }
        });
    }
}
