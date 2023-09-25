/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TransactionEffects } from '../../+state/transaction.effects';
import { Environment } from 'libs/mint-office/src/lib/core/models/environment.model';
import { RmProductTransactionComponent } from './rm-product-transaction.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { RmSearchFundsComponent } from '../rm-search-funds/rm-search-funds.component';

export class MockTransactionService {

}

describe('RmProductTransactionComponent', () => {
  let component: RmProductTransactionComponent;
  let fixture: ComponentFixture<RmProductTransactionComponent>;

  let component2: RmSearchFundsComponent;
  let fixture2: ComponentFixture<RmSearchFundsComponent>;

  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatRadioModule,
        MatSelectModule,
        MatDividerModule,
        MatCardModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule, RouterTestingModule
      ],
      declarations: [RmProductTransactionComponent, RmSearchFundsComponent],
      providers: [
        TransactionEffects,
        { provide: 'environment', useValue: environment },
        { provide: 'TransactionService', useClass: MockTransactionService },
        provideMockStore({ initialState: {} }),
      ],
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmProductTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    fixture2 = TestBed.createComponent(RmSearchFundsComponent);
    component2 = fixture2.componentInstance;
    fixture2.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create initProductTransactionForm', () => {
    const formValue = {
      rmId: 3,
      sibsCif: 'test123',
      customerName: 'jack',
      productType: 0,
      transactionType: 1,
      investAccountNo: 'test1',
      settlementAccountNo: 'test2',
      dTotalTransactionAmount: 1200,
      approverId: 1,
      requestUid: "123",
    }
    component.productTransactionForm.patchValue(formValue);
    expect(component.productTransactionForm.value).toEqual(formValue);
  })

  it('should open toggleAccountDetail', () => {
    component.resetAmount();
    component.searchFunds();
    component.toggleAccountDetail(new Event('click'), '1', true);
    expect(component.selectedAccountOption).toBe('1');

    component.toggleAccountDetail(new Event('click'), '', false);
    expect(component.selectedAccountOption).toBe('');
  })

  it('should to call getFundDetailsForTransaction', () => {
    const mockFunds = [
      {
        trxDetStatus: "string",
        totalAmount: 1000,
        fundCode: "12abc",
        salesChargeId: "abc",
        salesChargeRate: 1,
        salesChargeAmount: 100,
        remark: 'test remark',
        outUnit:100,
        switchInFundCode: "string1"
      }
    ]
    component.getFundDetailsForTransaction(mockFunds);

    component2.initFundDetails(mockFunds);
    
    expect(component.getFundDetailsForTransaction(mockFunds)).toBeUndefined();
  })

  it('should to call searchFunds', () => {
    component.searchFunds();
    component2.searchFunds();

    expect(component.searchFunds()).toBeUndefined();
  })

  it('should to call inSufficientFunds', () => {
    component.inSufficientFunds('R');
    component.fundWarning.emit('R');

    expect(component.inSufficientFunds('R')).toBeUndefined();
  })

  it('should open settlementAccountValidator for not insufficient', () => {
    component.settlementAccountValidator();
    component.insufficient = false;
    
    expect(component.insufficient).toBeFalsy();
  })

});
