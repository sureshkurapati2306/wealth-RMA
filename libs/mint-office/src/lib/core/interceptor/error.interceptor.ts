/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthActions, DialogAlertComponent, DialogMessageComponent, StorageService } from "@cimb/mint-office";
import { Environment } from "../models/environment.model";
import { environment } from '../../../../../../apps/rma-app/src/environments/environment';
import { MatDialog } from "@angular/material/dialog";
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    readonly environment: Environment;
    isOpen = false;

    constructor(
        private store: Store,
        public dialog: MatDialog,
        private router: Router,
        private readonly storageService: StorageService,
    ) {
        this.environment = environment
    }

    /* istanbul ignore next */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError((err: HttpErrorResponse) => {
            const isLogin = this.router.url.includes('login');
            const tokenExists = this.storageService.getItem<string>('access_token')
            const isCreateTransaction = request.url.includes('createSubscribeTransaction')

            if (isCreateTransaction && err.status !== 401 && err.status !== 403) {
                this.openTransactionErrorDialog().subscribe(() => {
                    this.isOpen = false;
                    this.dialog.closeAll();
                })
            }

            if (
                err.status === 401
            ) {
                this.store.dispatch(
                    AuthActions.loadLogout({
                        logout: {
                            refresh_token: this.storageService.getItem<string>('refresh_token'),
                            isInactive: false,
                            success: false
                        }
                    }));
            } else if (
                !this.isOpen &&
                !isLogin &&
                !isCreateTransaction &&
                tokenExists
            ) {
                this.openSystemErrorDialog().subscribe(res => {
                    if (res === 'Reload') {
                        location.reload();
                    } else if (res === 'Go to Dashboard') {
                        void this.router.navigate(['/'])
                    }
                    this.isOpen = false;
                })
            }

            return throwError(err);
        }))
    }

    openSystemErrorDialog(): Observable<any> {
        this.isOpen = true;
        return this.dialog.open(DialogAlertComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button', 'error-dialog'],
            maxWidth: '600px',
            minHeight: '450px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                isInactive: false,
                dialogHeading: 'System Error',
                dialogContent: '<div class="content-main-div"><div class="content-divs">We encountered a system error. Please reload the page or return to the <br> main dashboard.</div><br/><div class="content-divs">If you are still unable to view the page, please contact your System <br> Administrator for assistance.<br/></div></div>',
                dialogButtonCancel: true,
                dialogButtonCancelText: 'Go to Dashboard',
                dialogButtonProceed: true,
                dialogButtonProceedText: 'Reload',
                dialogImage: '<em class="icon-danger"></em>',
            },
        }).afterClosed();
    }


    openTransactionErrorDialog(): Observable<any> {
        this.isOpen = true;
        return this.dialog.open(DialogMessageComponent, {
            panelClass: ['custom-dialog'],
            maxWidth: '400px',
            minHeight: '200px',
            autoFocus: false,
            data: {
                title: 'Unable to Submit Application',
                description: '<div class="content-main-div"><div class="content-divs">We encountered a system error and unable to submit the application.</div></div>',
                btnOkLabel: 'Return to Transaction Application',
            },
        }).afterClosed();
    }
}
