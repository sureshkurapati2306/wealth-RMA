import { Store } from '@ngrx/store';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Component, Input, OnInit } from '@angular/core';
import { CustomerProfile, DialogMessageComponent } from '@cimb/mint-office';
import { pairwise, startWith, takeUntil } from 'rxjs/operators';
import * as CustomerAction from '../../+state/customer.action';
import * as riskProfileSummaryActions from '../../../risk-profile/+state/risk-profile.action';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'cimb-office-customer-details',
    templateUrl: './customer-details.component.html',
    styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
    panelOpenState = true;
    use_email = 'Yes, use this email';
    use_mobile = 'Yes, use this number';

    mobileNumber = new UntypedFormControl('');
    email = new UntypedFormControl('');

    @Input() customerDetails: CustomerProfile
    data = {
        oldEmailValue: '',
        newEmailValue: '',
        newMobileValue: '',
        oldMobileValue: ''
    }

    cif = JSON.parse(sessionStorage.getItem('cifNumber')) as string;

    private _unSubscribeAll$: Subject<void> = new Subject();

    constructor(
        public readonly dialog: MatDialog,
        private readonly store: Store,
    ) { }


    ngOnInit(): void {
        this.mobileNumber.valueChanges.pipe(
            startWith(this.mobileNumber.value),
            pairwise()
        ).subscribe(
            ([old, value]) => {
                this.data.oldMobileValue = old as string
                this.data.newMobileValue = value as string
            }
        )

        this.email.valueChanges.pipe(
            startWith(this.email.value),
            pairwise()
        ).subscribe(
            ([old, value]) => {
                this.data.oldEmailValue = old as string
                this.data.newEmailValue = value as string
            }
        )

        if (this.customerDetails.email) {
            this.email.patchValue(this.customerDetails.email)
        }

        if (this.customerDetails.mobileNumber) {
            this.mobileNumber.patchValue(this.customerDetails.mobileNumber)
        } 
    }

    getMobileTooltipText() {
        return `
         ${'Customer may have more than one mobile phone number registered with CIMB'}
         
         ${'Select (if available) and confirm the mobile phone number the customer is using for their digital approval.'}`;
    }

    getEmailTooltipText() {
        return `
         ${'Customer may have more than one email address registered with CIMB.'}

         ${'Select (if available) and confirm the email address the customer is using for their notification purposes.'}`;
    }

    displayPopup(value: string): Observable<any> {
        return this.dialog.open(DialogMessageComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            minWidth: '520px',
            maxWidth: '520px',
            minHeight: '200px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                title: value !== 'email' ? 'Confirm to change mobile number' : 'Confirm to change email address',
                icon: 'icon-danger-1',
                description: value !== 'email' ? `<div class="content-main-div"><div class="content-divs">  
                Do you want to use this mobile number as the default number </div><div class="content-divs"> 
                for customer’s digital approval? <br/></div></div></div>` : `<div class="content-main-div"><div class="content-divs"> 
                Do you want to use this email address as the default email for  </div><div class="content-divs">customer’s notification purposes?
                <br/></div></div></div>`,
                btnOkLabel: value === 'email' ? this.use_email : this.use_mobile,
                btnCancelLable: 'Cancel'
            },
        }).afterClosed()
    }

    onMobileNumberChange(): void {
        this.displayPopup('mobile').pipe(takeUntil(this._unSubscribeAll$)).subscribe(res => {
            if (res === this.use_mobile) {
                this.mobileNumber.patchValue(this.data.newMobileValue)
                this.store.dispatch(
                    riskProfileSummaryActions.updateRiskProfileMobile({
                        data: { mobileNumber: this.data.newMobileValue, cif: this.cif },
                    }),
                )
            } else {
                this.mobileNumber.patchValue(this.data.oldMobileValue);
            }
        })
    }

    onEmailChange(): void {
        this.displayPopup('email').pipe(takeUntil(this._unSubscribeAll$)).subscribe(res => {
            if (res === this.use_email) {
                this.email.patchValue(this.data.newEmailValue);
                this.store.dispatch(CustomerAction.updateCustomerEmail({ payload: { email: this.data.newEmailValue, cif: this.cif } }));
            } else {
                this.email.patchValue(this.data.oldEmailValue);
            }
        })
    }

}
