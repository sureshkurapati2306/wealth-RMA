/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Store } from '@ngrx/store';
import { AuthActions, authSelectors, DialogAlertComponent, Environment, StorageService } from '@cimb/mint-office';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { AuthService } from 'libs/mint-office/src/lib/core/services/auth.service';
import * as DashboardAction from './modules/dashboard/+state/dashboard.actions';
type JwtDecodeObject = { [key: string]: string };

@Component({
    selector: 'cimb-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'rma-app';
    idleState = 'Not started.';
    timedOut = false;
    dialogRef: MatDialogRef<DialogAlertComponent>;
    dialogRefOk;
    idleStop = false;
    readonly environment: Environment;

    constructor(
        public idle: Idle,
        public router: Router,
        public dialog: MatDialog,
        private cd: ChangeDetectorRef,
        public store: Store,
        private readonly authService: AuthService,
        private readonly storageService: StorageService,

    ) {
        this.environment = environment;

        this.authService.initApp();
        this.setIdleTime();
    }

    ngOnInit(): void {
        this.getRmDetails();
    }
    /* istanbul ignore next */
    setIdleTime(): void {
        this.idle.setIdle(300);
        this.idle.setTimeout(30);
        this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

        this.idle.onIdleEnd.subscribe(() => (this.idleState = 'No longer idle.'));
        this.idle.onTimeout.subscribe(() => {
            this.idleState = 'Timed out!';
            this.timedOut = true;
            this.dialog.closeAll();
        });

        this.idle.onIdleStart.subscribe(() => {
            this.idleState = "You've gone idle!";
            if (!this.idleStop) {
                this.dialogRef = this.dialog.open(DialogAlertComponent, {
                    panelClass: ['custom-dialog', 'dialog-inverse-button', 'error-dialog'],
                    maxWidth: '600px',
                    minHeight: '378px',
                    autoFocus: false,
                    backdropClass: 'backdrop-modal',
                    data: {
                        isInactive: false,
                        dialogHeading: 'Session Inactivity',
                        dialogContent: '<p>Due to inactivity, you will be automatically logged out in </br> <b>30 seconds</b> for security. </p>',
                        dialogButtonCancel: true,
                        dialogButtonCancelText: 'Logout',
                        dialogButtonProceed: true,
                        dialogButtonProceedText: 'Continue Session',
                        dialogImage: '<em class="icon-danger"></em>',
                    },
                });
            }
        });
        this.idle.onTimeoutWarning.subscribe((countdown) => {
            this.idleState = 'Started.';
            this.dialogRef.componentInstance.dialogContent = `<p>Due to inactivity, you will be automatically logged out in </br> <b> ${countdown} seconds</b> for security. </p>`;
            this.dialogRef.afterClosed().subscribe((result: string) => {
                if (result === 'Logout') {
                    this.idleStop = false;
                    this.reset();
                    this.logoutEvent(false);
                } else if (result === 'Continue Session') {
                    this.store.dispatch(
                        AuthActions.authStart({
                            data: {
                                grantType: 'refresh_token',
                                token: this.storageService.getItem('refresh_token'),
                            },
                        }),
                    );
                    this.dialog.closeAll();
                    this.idleStop = false;
                    this.reset();
                } else {
                    this.idleStop = true;
                    this.resetTimeOut();
                    this.logoutEvent(true);
                }
            });
        });

        this.router.events.subscribe(() => {
            if (this.router.url.search(/login/) === -1) {
                this.idle.watch();
            } else {
                this.idle.stop();
            }
        });

        this.reset();
    }

    /* istanbul ignore next */
    logoutEvent(isInactive: boolean): void {
        this.store.dispatch(
            AuthActions.loadLogout({
                logout: {
                    refresh_token: this.storageService.getItem('refresh_token'),
                    isInactive: isInactive,
                    success: false,
                },
            }),
        );

        if (isInactive) {
            this.dialogRefOk = this.dialog
                .open(DialogAlertComponent, {
                    panelClass: ['custom-dialog', 'dialog-inverse-button', 'error-dialog'],
                    maxWidth: '600px',
                    minHeight: '378px',
                    autoFocus: false,
                    backdropClass: 'backdrop-modal',
                    data: {
                        isInactive: true,
                        dialogButtonProceed: true,
                        dialogButtonProceedText: 'Okay',
                        dialogImage: '<em class="icon-danger"></em>',

                        dialogHeading: 'You have been logged out.',
                        dialogContent:
                            '<p>Due to inactivity, you were automatically logged out for security reasons. </p>',
                    },
                    disableClose: true,
                })
                .afterClosed()
                .subscribe((res: string) => {
                        this.dialog.closeAll();
                        this.storageService.clear();
                        void this.router.navigate(['login']);
                });
        }
        this.resetTimeOut()
    }

    /* istanbul ignore next */
    reset(): void {
        this.idle.watch();
        this.idleState = 'Started.';
        this.timedOut = false;
    }

    /* istanbul ignore next */
    resetTimeOut(): void {
        this.idle.stop();
        this.idle.onIdleStart.unsubscribe();
        this.idle.onTimeoutWarning.unsubscribe();
        this.idle.onIdleEnd.unsubscribe();
    }

    getRmDetails(): void {
        this.store
            .select(authSelectors.getToken)
            .pipe(
                map((data: string) => {
                    /* istanbul ignore if */
                    if (data) {
                        const token: JwtDecodeObject = jwt_decode(data);
                        const lanId = token.preferred_username;
                        this.store.dispatch(DashboardAction.getRmDetail({ data: lanId }));
                    }
                }),
            )
            .subscribe();
    }

    /* istanbul ignore next */
    ngOnDestroy(): void {
        this.resetTimeOut();
    }
}
