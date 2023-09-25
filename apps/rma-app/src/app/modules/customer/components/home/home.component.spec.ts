/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonModule, Location } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home.component';
import { RouterTestingModule } from "@angular/router/testing";
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MockCustomer, MockGetSettingsParam, MockInvestmentAccount } from '../../mock/customer-state.mock';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { MockRiskProfileInquiry } from '../../../transaction/mock/fund-details.mock';
import { TransactionService } from '../../../transaction/services/transaction.service';
import { MockCustomerProfile } from '@cimb/mint-office';
import { By } from '@angular/platform-browser';
import { CustomerService } from '../../services/customer.service';
import { TransactionComponent } from '../../../transaction/transaction.component';
import { NewApplicationComponent } from '../../../new-investment/components/new-application/new-application.component';
import { SharedModule } from '../../../shared/shared.module';
import { of } from 'rxjs';

class MockCustomerService {
    openVerifyCustomerDetailPopup() { /* mock */ }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let customerService: CustomerService;
  let location: Location;
  const btnNewAccId = '#new_account';
  const btnConfirm = 'Yes, I have verified';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
          CommonModule,
          MatCardModule,
          MatIconModule,
          MatDividerModule,
          HttpClientTestingModule,
          MatFormFieldModule,
          MatDialogModule,
          BrowserAnimationsModule,
          SharedModule,
          RouterTestingModule.withRoutes([
            {
                path: 'transaction',
                component: TransactionComponent
            },
            {
                path: 'new-application',
                component: NewApplicationComponent
            }
        ]),
          StoreModule.forRoot({})
      ],
      providers: [
        TransactionService,
        { provide: CustomerService, useClass: MockCustomerService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    customerService = TestBed.inject(CustomerService);
    location = TestBed.inject(Location);
    component = fixture.componentInstance;
    component.riskProfile$ = MockRiskProfileInquiry;
    component.customer$ = MockCustomer[0];

    component.isProfileExpired$ = true;
    component.isUserBlock$ = true;
    component.fundsAvailable = false;
    component.customerProfile$= MockCustomerProfile;
    component.settingsParam$ = MockGetSettingsParam;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to routeTotransactionPage', () => {
    const route = 'transactionPage';
    const cifNumber = 'CifNumber';
    void component.routeTotransactionPage(route , cifNumber);
  });

  it('should to call routeTotransactionPage on new transaction btn click', async () => {
    component.customerProfile$ = {
      ...MockCustomerProfile,
      casaStatus: 'Y',
      licenseValidity: true,
      category: 'ETP'
    }
    component.fundsAvailable = true;
    component.isProfileExpired$ = false;
    component.isUserBlock$  = false;

    const spy = jest.spyOn(component, 'routeTotransactionPage');

    const btnElement = fixture.debugElement.query(By.css('#new_transaction')).nativeElement as HTMLButtonElement;

    expect(btnElement).not.toBe(null);

    fixture.debugElement.query(By.css('#new_transaction')).triggerEventHandler('click', {target:{type:'new', cif: '123456789876543'}});

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should to call gotoNewInvestment on new account btn click', async () => {
    component.customerProfile$ = {
      ...MockCustomerProfile,
      casaStatus: 'Y',
      licenseValidity: true,
      category: 'ETP'
    }
    component.riskProfile$.riskProfileStatus === 'VALID';

    const spy = jest.spyOn(component, 'gotoNewInvestment');

    const newInvestmentbtnElement = fixture.debugElement.query(By.css(btnNewAccId)).nativeElement as HTMLButtonElement;

    expect(newInvestmentbtnElement).not.toBe(null);

    newInvestmentbtnElement.click();

    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should to call onClickName', () => {
     component.onClickName('click');
     window.dispatchEvent(new Event('beforeunload'));

     expect(component.onClickName('click')).toBeUndefined();
  });

  it('CTA button should be disabled if licence is expired', () => {
    component.customer$ = MockCustomer[0];
    component.customerProfile$ = {
        ...MockCustomerProfile,
        licenseValidity: false,
    };
    component.riskProfile$ = MockRiskProfileInquiry;

    fixture.detectChanges();

    const ctaButtons = fixture.debugElement.queryAll(By.css('.account a'));
    expect(ctaButtons.length).toBe(2);
    const newAccountButton = ctaButtons[0];
    expect((newAccountButton.nativeNode as HTMLAnchorElement).classList.contains('disabled')).toBeTruthy();

    const newTransaction = ctaButtons[1];
    expect((newTransaction.nativeNode as HTMLAnchorElement).classList.contains('disabled')).toBeTruthy();
  });

  it('CTA button should be disabled if customer have no valid casa account', () => {
    component.customer$ = MockCustomer[0];
    component.customerProfile$ = {
        ...MockCustomerProfile,
        casaStatus: 'F',
        licenseValidity: true,
    };
    component.riskProfile$ = MockRiskProfileInquiry;

    fixture.detectChanges();

    const ctaButtons = fixture.debugElement.queryAll(By.css('.account a'));
    expect(ctaButtons.length).toBe(2);
    const newAccountButton = ctaButtons[0];
    expect((newAccountButton.nativeNode as HTMLAnchorElement).classList.contains('disabled')).toBeTruthy();

    const newTransaction = ctaButtons[1];
    expect((newTransaction.nativeNode as HTMLAnchorElement).classList.contains('disabled')).toBeTruthy();
  });

  it('should redirect to new application after popup closed', fakeAsync(() => {
        jest.spyOn(customerService, 'openVerifyCustomerDetailPopup').mockReturnValue(of(btnConfirm));
        jest.spyOn(component, 'isNewAccDisabled').mockReturnValue(false);
        component.customerProfile$ = {
          ...MockCustomerProfile,
          casaStatus: 'F',
          licenseValidity: true,
        };
        component.gotoNewInvestment();
        tick(1000);

        expect(location.path()).toBe('/new-application');

  }));

  it('should redirect to transaction page after popup closed', fakeAsync(() => {
    jest.spyOn(customerService, 'openVerifyCustomerDetailPopup').mockReturnValue(of(btnConfirm));
    jest.spyOn(component, 'isNewTransactionDisabled').mockReturnValue(false);
    component.routeTotransactionPage('type', '12309987');
    tick(1000);

    expect(location.path()).toBe('/transaction');

}))

  it('Investment account limit to be maxUtAcct', (() => {
    
    component.customer$ = MockCustomer[0];
    component.customerProfile$ = {
        ...MockCustomerProfile,
        casaStatus: 'F',
        licenseValidity: true,
        investmentAccount: MockInvestmentAccount
    };
    component.riskProfile$ = MockRiskProfileInquiry;

    component.settingsParam$ = MockGetSettingsParam;
    
    const spy = jest.spyOn(component, 'gotoNewInvestment');
    const PopUpSpy = jest.spyOn(component, 'openInvestmentAccountLimit');
    fixture.detectChanges();
    const investmentbtnElement = fixture.debugElement.query(By.css(btnNewAccId)).nativeElement as HTMLButtonElement;

    expect(investmentbtnElement).not.toBe(null);
    investmentbtnElement.click();
    
    expect(spy).toHaveBeenCalled();
    expect(component.customerProfile$.investmentAccount.length).toEqual(component.settingsParam$.maxUtAcct)
    expect(PopUpSpy).toHaveBeenCalled();
  }))

  it('Investment account limit lessthen maxUTAcc', (() => {
    
    component.customer$ = MockCustomer[0];
    component.customerProfile$ = {
        ...MockCustomerProfile,
        casaStatus: 'F',
        licenseValidity: true,
        investmentAccount: MockInvestmentAccount
    };
    component.riskProfile$ = MockRiskProfileInquiry;

    component.settingsParam$ = { maxUtAcct: 7 } ;
    const customerDetailPopupSpy = jest.spyOn(customerService, 'openVerifyCustomerDetailPopup').mockReturnValue(of(btnConfirm));
    const spy = jest.spyOn(component, 'gotoNewInvestment');
    fixture.detectChanges();
    const investBtnElement = fixture.debugElement.query(By.css(btnNewAccId)).nativeElement as HTMLButtonElement;

    expect(investBtnElement).not.toBe(null);
    investBtnElement.click();
    
    expect(spy).toHaveBeenCalled();
    expect(component.customerProfile$.investmentAccount.length).toBeLessThan(component.settingsParam$.maxUtAcct)
    expect(customerDetailPopupSpy).toHaveBeenCalled();
  }))

});
