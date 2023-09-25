import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { CustomerProfile, DialogMessageComponent, MintOfficeSelectors, RiskProfileResolver } from '@cimb/mint-office';
import { IRiskProfileInquiryResponse } from '../../../transaction/models/risk-profile.model';

@Component({
    selector: 'cimb-office-risk-profile',
    templateUrl: './risk-profile.component.html',
    styleUrls: ['./risk-profile.component.scss'],
})
export class RiskProfileComponent implements OnInit{

    @Input() riskProfile$: IRiskProfileInquiryResponse;
    @Input() isProfileExpired$: boolean;
    @Input() isUserBlock$: boolean;
    @Input() customerProfile$: CustomerProfile


    cifNumber: string;

    constructor(
        public readonly dialog: MatDialog,
        public readonly store: Store,
        private readonly router: Router,
        private readonly riskProfileResolver: RiskProfileResolver
    ) {

    }

    ngOnInit(): void {
        this.store.select(MintOfficeSelectors.customer).subscribe(res => this.cifNumber = (res && res.cifNumber) ? res.cifNumber : "");
    }

    updateConfirmation(profile: CustomerProfile | null): void {
        if(!profile || (profile && !profile.licenseValidity)) return;

        if(profile.rpqApprovalStatus === 'Y') {
            this.denyPopUp();
        } else {
            this.verifyPopUp();
        }
    }

    verifyPopUp(): void {
        this.dialog.open(DialogMessageComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            minWidth: '32.5rem',
            maxWidth: '32.5rem',
            minHeight: '16.5rem',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                title: "Verify Customer’s Details",
                icon: "icon-danger-1",
                description: `<p><strong>Important:</strong> Please verify the full customer’s details before proceeding.</p><p>Also, check and confirm the customer’s mobile number or select a different number (if available) for their digital approval.</p>`,
                btnOkLabel: "Yes, I have verified",
                btnCancelLable: "Return to Customer Profile"
            },
        }).afterClosed()
        .subscribe((response: string) => {
            /* istanbul ignore if */
            if(response === 'Yes, I have verified') {
                this.riskProfileResolver.cifNumber = this.cifNumber
                void this.router.navigate([`/risk-profile/edit`]);
            }
        });
    }

    denyPopUp(): void {
        this.dialog.open(DialogMessageComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button'],
            minWidth: '32.5rem',
            maxWidth: '32.5rem',
            minHeight: '16.5rem',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                title: "Customer Approval Pending",
                icon: "icon-danger-1",
                description: `<p><strong>Important:</strong> You are not able to update your Risk Profile because the update request is still pending for customer approval.</p><br><br><br>`,
            },
        }).afterClosed()
        .subscribe();
    }

    goToRiskProfilePage(): Promise<boolean> {
        if(!this.customerProfile$.licenseValidity) {
            return
        }
        this.riskProfileResolver.cifNumber = this.cifNumber
        return this.router.navigate(['/risk-profile', 'detail']);
    }
}
