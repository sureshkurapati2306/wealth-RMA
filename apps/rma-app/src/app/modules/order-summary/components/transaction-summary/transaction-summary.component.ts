/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as orderSummarySelector from '../../+state/order-summary.selectors';
import { Observable, of } from 'rxjs';
import { filter, finalize, map, switchMap } from 'rxjs/operators';
import * as OrderSummaryApplicationAction from '../../+state/order-summary.actions';
import { OrderSummaryRouteData, DialogMessageComponent, ITransactionValidityResponse, DialogAlertComponent } from '@cimb/mint-office';
import { IGetOrderSummary, SendRemainder } from '../../../risk-profile/models/risk-profile-summary.model';
import { TransactionService } from '../../../transaction/services/transaction.service';
@Component({
  selector: 'cimb-office-transaction-summary',
  templateUrl: './transaction-summary.component.html',
  styleUrls: ['./transaction-summary.component.scss'],
  providers: [
    { provide: MatDialogRef, useValue: null }
  ]
})
export class TransactionSummaryComponent {
  panelOpenState = true;
  orderSummaryRouteData: OrderSummaryRouteData;

  @Input() trxId: string;

  orderSummaryData$: Observable<IGetOrderSummary | null> = this.store.select(
    orderSummarySelector.orderSummaryResponse
  ).pipe(filter(d => !!d));

  sendRemainderData$: Observable<SendRemainder | null> = this.store.select(
    orderSummarySelector.sendRemainderResponse
  ).pipe(filter(data => !!data));

  dialogClasses = ['custom-dialog', 'dialog-inverse-button']
  dialogBacDropmodalClasss = ['backdrop-modal']

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private transactionService: TransactionService,
    public readonly dialog: MatDialog,
    private _matDialogRef: MatDialogRef<any>
  ) {
    this.activatedRoute.data.subscribe((res: any) => this.orderSummaryRouteData = res?.orderSummaryRouteData as OrderSummaryRouteData)
  }

  sendingEmail(): void {
    const trxRefId = { trxRefId: this.orderSummaryRouteData.transactionRefId }
    this.store.dispatch(OrderSummaryApplicationAction.sendingRemainder({ data: trxRefId as any }));
  }

  gotoTransactionPage(orderSummary: IGetOrderSummary): void {
    this.checkValidityForTransaction(orderSummary).pipe(
        switchMap((res) => {
            if(res !== '200') {
                return of(null)
            }

            const rpExpiry = orderSummary.rpExpiry;
            const rpqApprovalStatus = orderSummary.rpqApprovalStatus
            if (rpExpiry === true) {
              return this.dialog.open(DialogMessageComponent, {
                panelClass: this.dialogClasses,
                minWidth: '430px',
                maxWidth: '430px',
                minHeight: '250px',
                autoFocus: false,
                backdropClass: this.dialogBacDropmodalClasss,
                data: {
                  title: 'Customer’s Risk Profile Has Expired',
                  icon: 'icon-danger-1',
                  description: `<div class="content-main-div"><div class="content-divs"> The customer’s risk profile has expired.</div><br/><div class="content-divs"> Please update their risk profile before you can proceed with their draft/ transaction application.<br/></div></div></div>`,
                  btnOkLabel: 'Update risk profile',
                  btnCancelLable: 'Cancel'
                },
              }).afterClosed().pipe(map(status => {
                if (status === 'Update risk profile') {
                  if (rpqApprovalStatus === 'Y') {
                    this.dialog.open(DialogMessageComponent, {
                      panelClass: ['custom-dialog'],
                      maxWidth: '520px',
                      minHeight: '245px',
                      autoFocus: false,
                      data: {
                        title: 'Pending Risk Profile Update Approval',
                        description: '<div class="content-main-div"><div class="content-divs">You have previously submitted a risk profile update and it is pending for customer’s approval.</div><br/><div class="content-divs">To proceed with the application, please inform the customer to approve their risk profile update first.<br/></div</div>',
                        dialogLeaveButton: false,
                        btnOkLabel: 'Okay',
                      },
                    }).afterClosed()

                    return;
                  } else {
                    return this.router.navigate([`/risk-profile/edit`]);
                  }
                } else {

                  return;
                }
              }))

            } else {
              this.transactionService.cifNumber = this.orderSummaryRouteData.cifNumber;
              this.transactionService.transactionId = this.orderSummaryRouteData.transactionId;
              void this.router.navigate(['/transaction', 'edit'])

              return of(null);
            }
        })
    ).subscribe();

  }

  transformDate(date: string): string {
    if (date) {
      return date.replace(/.{10}/g, '$&,');
    }
  }

  checkValidityForTransaction(row: IGetOrderSummary) {
    return  this.transactionService.getTrxValidaityStatus(this.trxId).pipe(
        switchMap((trxValidity: ITransactionValidityResponse) => {
            if(trxValidity.statusCode === '9001') {
                return this.openLicenceExpiredDialogPopup();
            }
            const trxSummuryTrxType = row.transactionType.toString().toLowerCase();
            if(
                trxValidity.statusCode === '9002' && (
                trxSummuryTrxType === 's' ||
                trxSummuryTrxType === 'b' ||
                trxSummuryTrxType === 'w')
            ) {
                return this.openAmlOrCasaPopupForTrxSummary();
            }

            if(trxValidity.statusCode === '9003' && (
                trxSummuryTrxType === 's' ||
                trxSummuryTrxType === 'b' ||
                trxSummuryTrxType === 'w')
            ) {
                return this.openAmlOrCasaPopupForTrxSummary(true);
            }
            return of(trxValidity.statusCode);
        })
    )
}

openLicenceExpiredDialogPopup(): Observable<string> {
    if(this._matDialogRef) return of("");
    this._matDialogRef = this.dialog.open(DialogAlertComponent, {
        panelClass:  [...this.dialogClasses, ...['error-dialog']],
        maxWidth: '600px',
        minHeight: '498px',
        autoFocus: false,
        backdropClass: this.dialogBacDropmodalClasss,
        data: {
            dialogButtonProceed: true,
            dialogButtonProceedText: 'Okay',
            dialogImage: '<em class="icon-danger"></em>',
            dialogHeading: 'Your license has expired or unavailable',
            dialogContent:
                `<div>
                    <p class="mb-0">Record shows that you either have:</p>
                    <ul class="mt-0">
                        <li><p class="mb-0">Invalid/ expired UT license,</p></li>
                        <li><p class="mb-0">Invalid/ expired FIMM license OR</p></li>
                        <li><p class="mb-0">Licensing information unavailable.</p></li>
                    </ul>

                    <p>The customer profile will be in read-only mode and you are not allowed to create any applications.</p>
                </div>`,
        },
    });

    return this._matDialogRef.afterClosed().pipe(
        finalize(() => this._matDialogRef = null)
    ) as Observable<string>;
}

openAmlOrCasaPopupForTrxSummary(isCasa: boolean = false): Observable<string> {
    if(this._matDialogRef) return of("");
    this._matDialogRef =  this.dialog.open(DialogMessageComponent, {
        panelClass: this.dialogClasses,
        minWidth: '530px',
        maxWidth: '530px',
        minHeight: isCasa ? '220px' : '280px',
        autoFocus: false,
        backdropClass: this.dialogBacDropmodalClasss,
        data: {
            title: isCasa ? 'Customer’s CASA Not Valid for Transaction' : 'Unable to proceed with this Customer',
            icon: 'icon-danger-1',
            description: isCasa ? `<p>Customer’s selected CASA is no longer valid for transaction because the account is either closed, inactive, a foreign account or a Joint-And account.</p>` :`
            <p>Unable to proceed because the customer’s name is present in one of the sanction lists or under high risk category as per AML guideline.</p>
            <p>Customer is not permitted to do account opening, and/ or to apply for any investment applications.</p>`,
            btnOkLabel: 'Okay',
        },
    });

    return this._matDialogRef.afterClosed().pipe(
        finalize(() => this._matDialogRef = null)
    ) as Observable<string>;
}
}
