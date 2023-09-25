import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { DialogMessageComponent } from '../../mint-office-ui-dialog/dialog-message/dialog-message.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, tap, switchMap, catchError } from 'rxjs/operators';
import { LogoutDialogComponent } from '../../mint-office-ui-dialog/logout-dialog/logout-dialog.component';
import { IDraftTransactionResponse } from 'apps/rma-app/src/app/modules/transaction/+state/transaction.models';

interface Callback {
    (): Observable<IDraftTransactionResponse>
}

@Injectable({
    providedIn: 'root',
})
export class TransactionLogoutService {
    private _saveApplication = new BehaviorSubject<boolean>(false);
    public readonly saveApplication$ = this._saveApplication.asObservable();
    saveDraftText = 'Save Draft and Logout';
    isDraftApplicationOpen = false;
    savedtransactionCallback: Callback;

    constructor(
        public dialog: MatDialog,
        private router: Router
    ) {
        this.router.events.pipe(
            tap(event => {
                if (event instanceof NavigationEnd) {
                    this.isDraftApplicationOpen = this.router.url.includes('transaction');
                }
            })
        ).subscribe()
    }

    draftTransactionLogoutPopup(): Observable<any> {

        return this.dialog.open(DialogMessageComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            minWidth: '600px',
            maxWidth: '600px',
            minHeight: '282px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                title: 'Confirm to Logout',
                icon: 'icon-danger-1',
                description: '<div class="content-main-div"><div class="content-divs">Do you want save this draft before logging out?</div><br/><div class="content-divs">Filled values will be removed if you proceed without saving.<br/></div><br/><div class="content-divs"><b>Note:</b>&nbsp;Saved drafts are located in the \'Application Status\' section in the main dashboard and in the Customer Profile pages.</div></div>',
                btnCancelLable: 'Logout without Saving',
                btnOkLabel: this.saveDraftText,
                dialogLeaveButtonText: 'Cancel'
            },
        }).afterClosed();
    }

    public transactionHandler(): Observable<any> {
       return this.draftTransactionLogoutPopup().pipe(
            filter(res => !!res),
            tap((res: string) => {
                if (res === this.saveDraftText) {
                    this._saveApplication.next(true);
                }
            }),
            switchMap((res: string) => {
                if(res === this.saveDraftText) {
                    return this.savedtransactionCallback().pipe(
                        map((transaction) => transaction ? 'Continue' : null),
                        catchError(error => throwError(error))
                    )
                } else if(res === 'Logout without Saving') {
                    return of('Continue');
                } else {
                    return of(res);
                }
            })
        );
    }

    public logout(): Observable<any> {
        if (this.isDraftApplicationOpen) {
            return this.transactionHandler();
        }

        return this.normalLogoutPopup();
    }

    normalLogoutPopup(): Observable<any> {

       return this.dialog.open(LogoutDialogComponent, {
            panelClass: ['custom-dialog', 'logout-dialog'],
            maxWidth: '600px',
            minHeight: '410px',
            autoFocus: false,
            data: {
                title: 'Logout from CIMB My Wealth',
                icon: 'icon-danger-1',
                description: '<p class="logout">Are you sure you want to logout?</p>',
                btnCancelLabel: 'Cancel',
                btnOkLabel: 'Continue',
            },
        }).afterClosed();

    }

}
