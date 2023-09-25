/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerProfile, NewApplicationResolver, TransactionType, DialogMessageComponent } from '@cimb/mint-office';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Customer } from '../../../dashboard/+state/dashboard.models';
import { Breadcrumb, ICustomerDetails } from '../../../shared/models/breadcrumb.model';
import { IRiskProfileInquiryResponse } from '../../../transaction/models/risk-profile.model';
import { TransactionService } from '../../../transaction/services/transaction.service';
import { GetSettingsParam } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'cimb-office-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

    cifNumber: string;
    constructor(
        private activateRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly transactionService: TransactionService,
        private readonly newApplicationResolver: NewApplicationResolver,
        public readonly dialog: MatDialog,
        private readonly customerService: CustomerService,
    ) {
        this.activateRoute.data.subscribe(res => this.cifNumber = res.customer as string);
    }
    
    @Input() isProfileExpired$ = true;
    @Input() isUserBlock$ = true;
    @Input() fundsAvailable: boolean;
    @Input() customer$: Customer;
    @Input() riskProfile$: IRiskProfileInquiryResponse;
    @Input() customerProfile$: CustomerProfile;
    @Input() settingsParam$:GetSettingsParam;
    breadcrumbs: Breadcrumb[] = [
        {
            title: 'customer profile',
            route: '',
        }
    ]

    customerDetails: ICustomerDetails = {
        route:'/customer',
        isEnable: true
    }

    routeTotransactionPage(type: string, cifNumber: string) {
        if(this.isNewTransactionDisabled()) return;

        this.customerService.openVerifyCustomerDetailPopup().subscribe((res) => {
            if(res === 'Yes, I have verified') {
                this.transactionService.cifNumber = cifNumber;
                this.transactionService.transactionType = type as TransactionType;
                void this.router.navigate(['/transaction'])
            }
        })
    }


    gotoNewInvestment(){
        if(this.customerProfile$.investmentAccount.length === this.settingsParam$.maxUtAcct || this.customerProfile$.investmentAccount.length > this.settingsParam$.maxUtAcct){
            this.openInvestmentAccountLimit(this.settingsParam$.maxUtAcct);
        }else{
            this.customerService.openVerifyCustomerDetailPopup().subscribe((res) => {
                if(res === 'Yes, I have verified') {
                    this.newApplicationResolver.cifNumber = this.cifNumber;
                    void this.router.navigate(['/new-application'])
                }
            });
        }
    }

    openInvestmentAccountLimit(maxUTAcct:number):void{
        this.dialog.open(DialogMessageComponent, {
            panelClass: ['custom-dialog', 'investment-account-limit'],
            minWidth: '32.5rem',
            maxWidth: '32.5rem',
            minHeight: '14.5rem',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                title: "Investment Account limit",
                icon: "icon-danger-1",
                description: `<p>Customer has reached the maximum ${maxUTAcct} investment accounts limit.</p><p>You are not allowed to create a new account for this customer.</p>`,
                btnOkLabel: "Okay",
            }
        });
    }

    onClickName(event: string): void {
        if(event === 'click') {
            window.location.reload();
        }
    }

    isNewAccDisabled(): boolean {
        return  !this.customer$ ||
        !this.riskProfile$ ||
        !this.customerProfile$ ||
        this.customerProfile$.casaStatus !== 'Y' ||
        !this.customerProfile$.licenseValidity ||
        this.riskProfile$?.riskProfileStatus !== 'VALID'
    }

    isNewTransactionDisabled(): boolean {
        return !this.customerProfile$ ||
        this.customerProfile$.casaStatus !== 'Y' ||
        !this.fundsAvailable ||
        !this.customerProfile$.licenseValidity  ||
        this.isProfileExpired$ ||
        this.isUserBlock$ ||
        this.customerProfile$.category === 'NTP'
    }
}
