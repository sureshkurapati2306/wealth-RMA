/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, of, Subject } from 'rxjs';
import { filter, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { riskProfileResponse, settingsParam } from '../../+state/customer.selector';
import * as CustomerAction from '../../+state/customer.action';
import { Router } from '@angular/router';
import { Customer, CustomerProfile, DialogAlertComponent, DialogMessageComponent, MintOfficeSelectors, TransactionType } from '@cimb/mint-office';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IRiskProfileInquiryResponse } from '../../../transaction/models/risk-profile.model';
import { ITransactionFunds } from 'libs/mint-office/src/lib/mint-office-table/models/customer-holding.model';
import { FundDetailQueryParam, FundDetail } from '../../../transaction/models/funds.model';
import { TransactionService } from '../../../transaction/services/transaction.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FundDetailDialogComponent } from '../../../transaction/components/fund-detail-dialog/fund-detail-dialog.component';
import { GetSettingsParam } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

@Component({
    selector: 'cimb-office-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

    riskProfile$: Observable<IRiskProfileInquiryResponse | null | undefined>;
    isProfileExpired$: Observable<boolean>;
    fundsAvailable = true;
    customer$: Observable<Customer | null> = this.store.select(MintOfficeSelectors.customer)
    customerProfile$: Observable<CustomerProfile | null> = this.store.select(MintOfficeSelectors.customerProfile);
    settingsParam$:Observable<GetSettingsParam> = this.store.select(settingsParam)


    tab = 0;
    _unSubscriber$ = new Subject();

    @HostListener('window:popstate', ['$event'])
    unloadNotification(event: PopStateEvent) {
        location.hash = '#/home'
    }

    constructor(
        private readonly store: Store,
        private readonly router: Router,
        private readonly transectionService: TransactionService,
        private readonly customerService: CustomerService,
        private readonly dialog: MatDialog,
        private _matDialogRef: MatDialogRef<any>
    ) { }

    ngOnInit(): void {
        this.getRiskProfile();
        this.initLicenceExpired();
        this.store.dispatch(CustomerAction.getSettingsParam());
        this.riskProfile$ = this.store.select(riskProfileResponse);
        this.isProfileExpired$ = this.store.select(riskProfileResponse).pipe(
            filter(response => !!response),
            map(response => this.isProfileExpired((response && response.expiryDate) ? response.expiryDate : new Date().toDateString()))
        );
    }

    getRiskProfile(): void {
        this.customer$.pipe(
            filter(customer => !!customer),
            takeUntil(this._unSubscriber$),
            tap((c: Customer | null) => {
                if(!c) return
                this.store.dispatch(CustomerAction.getRiskProfileInquiry({
                    data: {
                        cifNumber: parseInt(c.cifNumber ? c.cifNumber : ''),
                        custName: '',
                        custIdIssue: '',
                        custIdNo: '',
                        custIdType: ''
                    }
                }));

            })
        ).subscribe();
    }

    isProfileExpired(expiredDate: string): boolean {
        if (!expiredDate) return false;
        const diff = moment().diff(new Date(expiredDate), 'days');
        return diff > 0;
    }

    onFundAvailable(value: boolean): void {
        this.fundsAvailable = value;
    }

    /* istanbul ignore next */
    isUserBlock$(): Observable<boolean> {
        return this.customerProfile$.pipe(
            filter(details => !!details),
            map((customerProfile: CustomerProfile | null) => {
                if(!customerProfile) return false;
                return customerProfile.inSanctionCountry === 'Y';
            })
        )
    }

    tabChnage(event: MatTabChangeEvent){
        this.tab = event.index;
    }

    ngOnDestroy(): void {
        this._unSubscriber$.next(null);
        this._unSubscriber$.complete();
    }

    public redirectToFundDetails(row: ITransactionFunds): void {
        const payload: FundDetailQueryParam = {
            fundCode: row.fundCode.toString(),
            utAccountNumber: 640826135255
        }
        this.transectionService.getFundDetails(payload).pipe(
            filter(data => !!data),
            switchMap((fundDetail: FundDetail) => {
                return this.openFundDetail(fundDetail)
            })
        ).subscribe();
    }

    openFundDetail(fundDetail: FundDetail): Observable<any> {
        return this.dialog.open(FundDetailDialogComponent, {
            width: '1114px',
            height: '90%',
            panelClass: 'fund-detail-dialog',
            data: {
                fundData: fundDetail,
                investmentEnable: true
            }
        }).afterClosed();
    }

    goToTransactionPage(data: { cifNumber: string, transactionType: TransactionType, fundCodes: string[]  }) {
        this.customerService.openVerifyCustomerDetailPopup().subscribe((res) => {
            if(res === 'Yes, I have verified') {
                this.transectionService.cifNumber = data.cifNumber;
                this.transectionService.transactionType = data.transactionType;
                this.transectionService.fundCodes = data.fundCodes;

                void this.router.navigate(['/transaction']);
            }
        })

    }

    initLicenceExpired() {
        this.customerProfile$.pipe(
            filter(p => !!p),
            takeUntil(this._unSubscriber$),
            switchMap(p => p.licenseValidity ? this.openCasaPopup(p) : this.openLicenceExpiredDialog() )
        ).subscribe();
    }

    openLicenceExpiredDialog(): Observable<any> {
        if(this._matDialogRef) return of(null);
        this._matDialogRef = this.dialog.open(DialogAlertComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button', 'error-dialog'],
            maxWidth: '600px',
            minHeight: '498px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
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
            finalize(() => this._matDialogRef = undefined)
        )
    }


    private getCasaPopupBody(profile: CustomerProfile): { heading: string, content: string } {
        // No casa account
        if(profile.casaStatus === 'N') {
            return {
                heading: "Customer has no CASA",
                content: `<p>Unable to proceed because the customer has no CASA.</p>
                <p>Customer is not permitted to do account opening, and/ or to apply for any investment applications until they have opened an active CASA.</p>
                <p>Please direct the customer to visit any CIMB branch for assistance.</p>`
            }
        }

        // inactive account
        if(profile.casaStatus === 'I') {
            return {
                heading: "Customer’s CASA is inactive",
                content: `<p>Unable to proceed because the customer’s CASA is inactive.</p>
                <p>Customer is not permitted to do account opening, and/ or to apply for any investment applications until they have reactivated their CASA.</p>`
            }
        }

        // Forign Acccount
        if(profile.casaStatus === 'F') {
            return {
                heading: "Customer’s CASA is a Foreign Account",
                content: `<p>Unable to proceed because the customer’s CASA is a foreign account.</p>
                <p>Customer is not permitted to do account opening, and/ or to apply for any investment applications.</p>
                <p>Please direct the customer to visit any CIMB branch for assistance.</p>`
            }
        }

        // Joint account
        return {
            heading: "Customer’s CASA is a Joint-And Account",
            content: `<p>Unable to proceed because the customer’s CASA is a Joint-And type account.</p>
            <p>Customer is not permitted to do account opening, and/ or to apply for any investment applications until they have reactivated their CASA.</p>`
        }

    }

    public openCasaPopup(profile: CustomerProfile): Observable<any> {
        if(
            profile.casaStatus !== 'N' &&
            profile.casaStatus !== 'I' &&
            profile.casaStatus !== 'F' &&
            profile.casaStatus !== 'J'
        ) {
            return of(null);
        }

        if(this._matDialogRef) return of(null);
        const popupBody: { heading: string, content: string }  = this.getCasaPopupBody(profile);
        this._matDialogRef = this.dialog.open(DialogMessageComponent, {
            panelClass: ['custom-dialog', 'dialog-inverse-button', 'error-dialog'],
            maxWidth: '600px',
            autoFocus: false,
            backdropClass: 'backdrop-modal',
            data: {
                btnOkLabel: 'Okay',
                icon: 'icon-danger-1',
                title: popupBody.heading,
                description: popupBody.content,
            },
        });

        return this._matDialogRef.afterClosed().pipe(
            finalize(() => this._matDialogRef = undefined)
        )
    }


}
