import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { Clipboard } from '@angular/cdk/clipboard';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogMessageComponent, OrderSummaryResolver, RiskProfileResolver, RiskProfileSummaryResolver } from '@cimb/mint-office';
import { IRiskProfileSummaryResponse, IGetOrderSummary, ICustomerMobileResponse } from '../../../risk-profile/models/risk-profile-summary.model';
import * as riskProfileSummarySelector from '../../../risk-profile/+state/risk-profile.selector';
import * as riskProfileSummaryActions from '../../../risk-profile/+state/risk-profile.action';
import * as orderSummaryAction from '../../../order-summary/+state/order-summary.actions';

@Component({
    selector: 'cimb-office-customer-approval-link',
    templateUrl: './customer-approval-link.component.html',
    styleUrls: ['./customer-approval-link.component.scss'],
})
export class CustomerApprovalLinkComponent implements OnInit {
    linkCopied = false;
    cifNumber: string |  null;
    numbers: string[] = ['6012 345-6785', '6012 345-6783', '6012 345-6782', '01123274241'];
    mobileValueForm: UntypedFormGroup;
    dialogRef: MatDialogRef<DialogMessageComponent>;
    trx_id: string | null;
    @Input() customerApprovalLinkData: IRiskProfileSummaryResponse | IGetOrderSummary;

    riskProfileMobileNoResponse$: Observable<ICustomerMobileResponse | null | undefined> = this.store.select(riskProfileSummarySelector.riskProfileMobileNoResponse);

    constructor(
        public readonly dialog: MatDialog,
        private store: Store,
        private _fb: UntypedFormBuilder,
        public clipboard: Clipboard,
        private router: Router,
        private readonly orderSummuryResolver: OrderSummaryResolver,
        private readonly riskProfilerResolver: RiskProfileResolver,
        private readonly riskProfilerSummaryResolver: RiskProfileSummaryResolver,
    ) {

        if(this.router.url.includes('orderSummary')) {
            this.trx_id = this.orderSummuryResolver.transactionId;
            this.cifNumber = this.orderSummuryResolver.cifNumber;
        } else {
            this.trx_id = this.riskProfilerSummaryResolver.trxId;
            this.cifNumber = this.riskProfilerResolver.cifNumber;
        }

    }

    get f(): UntypedFormGroup {
        return this.mobileValueForm;
    }

    createForm(): void {
        this.mobileValueForm = this._fb.group({
            mobileValue: new UntypedFormControl(''),
        });
    }

    ngOnInit(): void {
        this.createForm();
        this.store.dispatch(
            riskProfileSummaryActions.getRiskProfileMobileNo({ data: { cif: this.cifNumber ? this.cifNumber: '' } }),
        );

        this.setMobileNumber();

    }

    copyText(textToCopy: string): void {
        this.clipboard.copy(textToCopy);
        this.linkCopied = true;
    }

    activateApprovalLink(): void {
        if(!this.trx_id) return;

        if(this.router.url.includes('orderSummary')) {
            this.store.dispatch(
                orderSummaryAction.orderActivatedApprovalLink({
                    data: { transactionId: +this.trx_id },
                }),
            );
        } else {

            this.store.dispatch(
                riskProfileSummaryActions.activateApprovalLink({
                    data: { id: +this.trx_id },
                }),
            );
        }

    }

    mobileNumberConfirmation(value: string, cif: string): void {
        this.dialog
            .open(DialogMessageComponent, {
                panelClass: ['custom-dialog'],
                minWidth: '520px',
                maxWidth: '520px',
                minHeight: '200px',
                autoFocus: false,
                backdropClass: 'backdrop-modal',
                data: {
                    title: 'Confirm to Change Mobile Number',
                    icon: 'icon-danger-1',
                    description: `<p>Do you want to use this mobile number as the default number for customer’s digital approval?</p>`,
                    btnOkLabel: 'Yes, use this number',
                    btnCancelLable: 'Cancel',
                },
            })
            .afterClosed()
            .subscribe((response: string) => {
                /* istanbul ignore if */
                if (response === 'Yes, use this number') {
                    this.f.controls.mobileValue.patchValue(value);
                    this.store.dispatch(
                        riskProfileSummaryActions.updateRiskProfileMobile({
                            data: { mobileNumber: value, cif: cif },
                        }),
                    );
                } else {
                    this.setMobileNumber();
                }

            });
    }

    /* istanbul ignore next */
    setMobileNumber(): void {
        this.riskProfileMobileNoResponse$
            .pipe(
                filter(m => !!m),
                map((data: ICustomerMobileResponse | undefined | null) => {
                    if (data) {
                        this.f.controls.mobileValue.patchValue(data ? data.mobileNumber : '');
                    }
                }),
            )
            .subscribe();
    }
}
