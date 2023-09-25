/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppStatusComponent } from '../app-status/app-status.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { HomeComponent } from '../home/home.component';
import { RiskProfileComponent } from '../risk-profile/risk-profile.component';
import { TotalPortfolioComponent } from '../total-portfolio/total-portfolio.component';
import { CommonModule, Location } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GoogleChartsModule } from 'angular-google-charts';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { ProfileComponent } from './profile.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import {
    ApplicationStatusTableComponent,
    CustomerHoldingComponent,
    CustomerProfile,
    DialogAlertComponent,
    DialogMessageComponent,
    Environment,
    TransactionType
} from '@cimb/mint-office';
import { of, Subject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from '@cimb/core';
import { MockCustomer } from '../../mock/customer-state.mock';
import { TransactionService } from '../../../transaction/services/transaction.service';
import { MockRiskProfileInquiry } from '../../../transaction/mock/fund-details.mock';
import { TransactionComponent } from '../../../transaction/transaction.component';
import { FundDetail } from '../../../transaction/models/funds.model';
import { MockCustomerProfile } from '@cimb/mint-office';
import { CustomerChartComponent } from '../customer-chart/customer-chart.component';
import { SharedModule } from '../../../shared/shared.module';
import { FundDetailDialogComponent } from '../../../transaction/components/fund-detail-dialog/fund-detail-dialog.component';
import { FundInvestmentDetailComponent } from '../../../transaction/components/fund-investment-detail/fund-investment-detail.component';
import { FundDocumentComponent } from '../../../transaction/components/fund-document/fund-document.component';
import { PastPerformanceComponent } from '../../../transaction/components/past-performance/past-performance.component';
import { FundDetailDisclaimerComponent } from '../../../transaction/components/fund-detail-disclaimer/fund-detail-disclaimer.component';
import { SnackbarService } from '../../../transaction/services/snack-bar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';

class MockTransactionService {
    getFundDetails() { /* mock */ }
}

window['google'] = {
    visualization:  {
        NumberFormat: class {
            constructor() {
                /* mock */
            }
        }
    },
} as  any;

class MockCustomerService {
    openVerifyCustomerDetailPopup() { /* mock */ }
}

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;
    let location: Location;

    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl };
    const popUpTitalClass = 'mat-dialog-title';
    let customerService: CustomerService;


    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                CommonModule,
                RouterTestingModule.withRoutes([{
                    path: 'transaction',
                    component: TransactionComponent
                }]),
                MatPaginatorModule,
                MatDatepickerModule,
                MatGridListModule,
                MatSortModule,
                GoogleChartsModule,
                MatIconModule,
                MatNativeDateModule,
                MatTooltipModule,
                MatCardModule,
                MatTabsModule,
                MatFormFieldModule,
                MatButtonModule,
                MatPaginatorModule,
                MatSelectModule,
                MatMenuModule,
                MatTableModule,
                MatDividerModule,
                MatExpansionModule,
                MatCheckboxModule,
                MatSnackBarModule,
                FormsModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                MatDialogModule,
                SharedModule,
                StoreModule.forRoot({}),
                HttpClientTestingModule
            ],

            declarations: [
                FundDetailDialogComponent,
                ProfileComponent,
                HomeComponent,
                RiskProfileComponent,
                CustomerDetailsComponent,
                AppStatusComponent,
                TotalPortfolioComponent,
                CustomerHoldingComponent,
                ApplicationStatusTableComponent,
                DialogAlertComponent,
                DialogMessageComponent,
                CustomerChartComponent,
                FundInvestmentDetailComponent,
                FundDocumentComponent,
                PastPerformanceComponent,
                FundDetailDisclaimerComponent
            ],

            providers: [
                provideMockStore(),
                HttpService,
                SnackbarService,
                { provide: 'environment', useValue: environment },
                { provide: TransactionService, useClass: MockTransactionService },
                { provide: MatDialogRef, useValue: null },
                { provide: CustomerService, useClass: MockCustomerService }
            ],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        location = TestBed.inject(Location);
        component = fixture.componentInstance;
        customerService = TestBed.inject(CustomerService);
        component._unSubscriber$ = new Subject();
        component.riskProfile$ = of(MockRiskProfileInquiry);
        component.isProfileExpired$ = of(true);
        component.customer$ = of(MockCustomer[0]);
        component.customerProfile$ = of(MockCustomerProfile);
        fixture.detectChanges();
    });

    it('should create', (): void => {
        expect(component).toBeTruthy();
    });

    it('should give true for expired time', () => {
        const spy = jest.spyOn(component, 'isProfileExpired');
        component.isProfileExpired('09-Oct-2020');
        expect(spy).toReturnWith(true);
    });

    it('should give false for valid time', () => {
        const spy = jest.spyOn(component, 'isProfileExpired');
        component.isProfileExpired('09-Oct-2026');
        expect(spy).toReturnWith(false);
    })

    it('should give false for invalid date-time', () => {
        const spy = jest.spyOn(component, 'isProfileExpired');
        component.isProfileExpired('');
        expect(spy).toReturnWith(false);
    });

    it('should detect fund available', () => {
        component.onFundAvailable(true);
        expect(component.fundsAvailable).toBe(true);
    })

    it('should call popstate', () => {
        const event = window.dispatchEvent(new Event('popstate'));
        component.unloadNotification({} as PopStateEvent);
    });

    it('should go to transaction page', fakeAsync(() => {
        jest.spyOn(customerService, 'openVerifyCustomerDetailPopup').mockReturnValue(of('Yes, I have verified'));
        component.tabChnage(new MatTabChangeEvent())
        component.openFundDetail({} as FundDetail)
        component.goToTransactionPage({
            cifNumber: "123088823",
            transactionType: TransactionType.REEDEEM,
            fundCodes: ['ASNB234']
        });

        tick(1000)

        expect(location.path()).toBe('/transaction');
    }));

    it('should open licence expired popup', (done) => {
        const mockProfile = {
            ...MockCustomerProfile,
            licenseValidity: false,
        }
        component.customerProfile$ = of(mockProfile);
        const spy = jest.spyOn(component, 'openLicenceExpiredDialog');

        component.ngOnInit();
        expect(spy).toHaveBeenCalled();

        const modal = document.querySelector('.cdk-overlay-container');

        expect(modal).toBeDefined();
        expect(modal).not.toBe(null);

        component.openLicenceExpiredDialog().subscribe((data) => {
            expect(data).toBe(null);
            done();
        })
    });

    it('should show no casa popup if there is no settlement account', (async() => {
        const mockProfile: CustomerProfile = {
            ...MockCustomerProfile,
            casaStatus: 'N',
            licenseValidity: true
        }
        component.customerProfile$ = of(mockProfile);
        const licensePopUpSpy = jest.spyOn(component, 'openLicenceExpiredDialog');
        const casaPopUpSpy = jest.spyOn(component, 'openCasaPopup');
        component.ngOnInit();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(licensePopUpSpy).not.toHaveBeenCalled();
        expect(casaPopUpSpy).toHaveBeenCalled();
        const dialogHeading = document.getElementsByClassName(popUpTitalClass).item(0);
        expect(dialogHeading).not.toBe(null);
        expect((dialogHeading as HTMLHeadingElement).innerHTML.includes('Customer has no CASA')).toBeTruthy();
    }));

    it('should show inactive casa popup if there is no settlement account', (async() => {
        const mockProfile: CustomerProfile = {
            ...MockCustomerProfile,
            casaStatus: 'I',
            licenseValidity: true
        }
        component.customerProfile$ = of(mockProfile);
        const licensePopUpSpy = jest.spyOn(component, 'openLicenceExpiredDialog');
        const casaPopUpSpy = jest.spyOn(component, 'openCasaPopup');
        component.ngOnInit();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(licensePopUpSpy).not.toHaveBeenCalled();
        expect(casaPopUpSpy).toHaveBeenCalled();
        const dialogHeading = document.getElementsByClassName(popUpTitalClass).item(0);
        expect(dialogHeading).not.toBe(null);
        expect((dialogHeading as HTMLHeadingElement).innerHTML.includes('Customer’s CASA is inactive')).toBeTruthy();
    }))


    it('should show joint account casa popup if there is no settlement account', (async() => {
        const mockProfile: CustomerProfile = {
            ...MockCustomerProfile,
            casaStatus: 'J',
            licenseValidity: true
        }
        component.customerProfile$ = of(mockProfile);
        const licensePopUpSpy = jest.spyOn(component, 'openLicenceExpiredDialog');
        const casaPopUpSpy = jest.spyOn(component, 'openCasaPopup');
        component.ngOnInit();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(licensePopUpSpy).not.toHaveBeenCalled();
        expect(casaPopUpSpy).toHaveBeenCalled();
        const dialogHeading = document.getElementsByClassName(popUpTitalClass).item(0);
        expect(dialogHeading).not.toBe(null);
        expect((dialogHeading as HTMLHeadingElement).innerHTML.includes('Customer’s CASA is a Joint-And Account')).toBeTruthy();
    }))

    it('should show foreign account casa popup if there is no settlement account', (async() => {
        const mockProfile: CustomerProfile = {
            ...MockCustomerProfile,
            casaStatus: 'F',
            licenseValidity: true
        }
        component.customerProfile$ = of(mockProfile);
        const licensePopUpSpy = jest.spyOn(component, 'openLicenceExpiredDialog');
        const casaPopUpSpy = jest.spyOn(component, 'openCasaPopup');
        component.ngOnInit();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(licensePopUpSpy).not.toHaveBeenCalled();
        expect(casaPopUpSpy).toHaveBeenCalled();
        const dialogHeading = document.getElementsByClassName(popUpTitalClass).item(0);
        expect(dialogHeading).not.toBe(null);
        expect((dialogHeading as HTMLHeadingElement).innerHTML.includes('Customer’s CASA is a Foreign Account')).toBeTruthy();
    }))


});
