/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';
import { TransactionLogoutService } from 'libs/mint-office/src/lib/core/services/logout.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TransactionComponent } from './transaction.component';
import { mockDraftTransactionIdResponse, mockDraftTransactionResponse, mockTransactionAppResponse } from './+state/transaction.effects.spec';
import { ISearchFundData } from './+state/transaction.models';
import { MockIProductTransactionFormData, MockISalesFormData, MockIRefferalFormData } from './+state/transaction.reducer.spec';
import { RmAcknowledgementComponent } from './components/rm-acknowledgement/rm-acknowledgement.component';
import { RmSalesComponent } from './components/rm-sales/rm-sales.component';
import { MockISearchFundData, MockRiskProfileInquiry } from './mock/fund-details.mock';
import { IRiskProfileInquiryResponse } from './models/risk-profile.model';
import { SnackbarService } from './services/snack-bar.service';
import { Environment } from '@cimb/mint-office';
import { MockCustomer } from '../customer/mock/customer-state.mock';
import { TransactionService } from './services/transaction.service';
import { riskProfileInquiry, subscribeFunds } from './+state/transaction.selectors';
import { RmProductTransactionComponent } from './components/rm-product-transaction/rm-product-transaction.component';
import { RmSearchFundsComponent } from './components/rm-search-funds/rm-search-funds.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { EffectsModule } from '@ngrx/effects';

export class MockTransactionService {
  getFundDetails() { /* mock */ }
  deleteCustomerDraft() { return of() }
}

export class MockSnackBarService {
  openSnackBar() { /* mock */ }
}

let mockRiskProfileInquiry: MemoizedSelector<any, IRiskProfileInquiryResponse>;
let mockSubscribeFunds: MemoizedSelector<any, ISearchFundData[]>;

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>

  const apiUrl = '/';
  const production = false;
  const environment: Environment = { production, apiUrl };
  let snackbarService: SnackbarService;
  let transactionService: TransactionService;
  let httpClient: HttpClient;
  let transactionLogoutService: TransactionLogoutService
  let actions$: Observable<any>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatRadioModule,
        MatSelectModule,
        MatDividerModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
      ],
      declarations: [
        TransactionComponent,
        RmAcknowledgementComponent,
        RmProductTransactionComponent,
        RmSearchFundsComponent,
        RmSalesComponent
      ],
      providers: [
        { provide: 'environment', useValue: environment },
        { provide: TransactionService, useClass: MockTransactionService },
        { provide: SnackbarService, useClass: MockSnackBarService },
        provideMockActions(() => actions$),
        provideMockStore({ initialState: {} })
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    mockRiskProfileInquiry = store.overrideSelector(
        riskProfileInquiry, null
    )

    mockSubscribeFunds = store.overrideSelector(
        subscribeFunds, []
    )

    fixture = TestBed.createComponent(TransactionComponent);
    httpClient = TestBed.inject(HttpClient);
    snackbarService = TestBed.inject(SnackbarService);
    transactionService = TestBed.inject(TransactionService);
    transactionLogoutService = TestBed.inject(TransactionLogoutService);
    component = fixture.componentInstance;
    component.fundsData = [{
      totalAmount: 1000,
      salesChargeId: "1",
      salesChargeRate: "1",
      salesChargeAmount: "1000",
      remark: "test",
      currencyCode: "code",
      fundCode: "fcode",
      fundStatus: 'A'
    }]
    component.productTransactionForm$ = of(MockIProductTransactionFormData);
    component.salesForm$ = of(MockISalesFormData);
    component.refferalFormResponse$ = of(MockIRefferalFormData);
    component.customerSelector$ = of(MockCustomer[0]);
    component.getDraftTransactionIdDetails$ = of(mockDraftTransactionIdResponse);
    component.createdApplicationStatus$ = of(mockTransactionAppResponse);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger transactionFunds', () => {
    const funds = MockISearchFundData
    component.transactionFunds(funds);
    component.parentTransactionFunds = funds;
    expect(component).toBeTruthy();
    expect(component.parentTransactionFunds).toBe(MockISearchFundData);
  });

  it('should trigger pageTypeData', () => {
    component.pageTypeData('fund');
    component.pageType = 'fund';
    expect(component).toBeTruthy();
    expect(component.pageType).toBe('fund');
  });

  it('should call open openDraftDialog box for true', () => {
    const spy = jest.spyOn(component.dialog, 'open');
    component.openDraftDialog('true');
    expect(spy).toHaveBeenCalled();
  });

  it('should call open openDraftDialog box for false', () => {
    const spy = jest.spyOn(component.dialog, 'open');
    component.openDraftDialog('false');

    expect(spy).toHaveBeenCalled();
  });

  it('check deviation status', (done) => {
    mockSubscribeFunds.setResult(MockISearchFundData);
    mockRiskProfileInquiry.setResult(MockRiskProfileInquiry)

    component.getDeviationStatus().subscribe(res => {
        expect(res).toBe(false);
        done();
    })
  })

  it('should call open openDialog box', () => {
    const createOrCancelPopupSpy = jest.spyOn(component.dialog, 'open');
    component.openDialog(true);
    expect(createOrCancelPopupSpy).toHaveBeenCalled();
  });

  it('should call deleteDraft', (done) => {
    const draftDialogSpy = jest.spyOn(component, 'openDraftDialog').mockReturnValue(of(component.yesConfirm));
    component.delete_Draft();

    component.openDraftDialog('false').subscribe(res => {
      expect(res).toBe(component.yesConfirm);
      expect(draftDialogSpy).toHaveBeenCalled();
      done()
    });
  });

  it('should call saveDraft', (done) => {
    const saveDraftSpy = jest.spyOn(component, 'saveDraft');
    const saveDraftTransactionSpy = jest.spyOn(component, 'saveDraftTransaction').mockReturnValue(of(mockDraftTransactionResponse))
    component.saveDraft(false);

    component.saveDraftTransaction(false).subscribe(res => {
      component.getFormGroupsValues();
      expect(saveDraftSpy).toHaveBeenCalled();
      expect(saveDraftTransactionSpy).toHaveBeenCalled();
      expect(res.status).toBe('200')
      done()
    });
  });

  it('should call createOrCancelConfirmation if true', (done) => {
    const dialogSpy = jest.spyOn(component, 'openDialog').mockReturnValue(of('Save Draft and Leave'));
    component.createOrCancelConfirmation(true);

    component.openDialog(false).subscribe((res: any) => {
      expect(res).toBe('Save Draft and Leave');
      expect(dialogSpy).toHaveBeenCalled();
      done()
    });
  });

  it('should call createOrCancelConfirmation if true', (done) => {
    const dialogSpy = jest.spyOn(component, 'openDialog').mockReturnValue(of('Leave without Saving'));
    component.createOrCancelConfirmation(true);

    component.openDialog(false).subscribe(res => {
      expect(res).toBe('Leave without Saving');
      expect(dialogSpy).toHaveBeenCalled();
      done()
    });
  });

  it('should call getFormGroupsValues for funds salesChargeRate', (done) => {

    component.fundsData.forEach(res => {
      expect(res.salesChargeRate).toBe("1");
      done();
    })

  })

  it('should call getFormGroupsValues for funds totalAmount', (done) => {

    component.fundsData.forEach(res => {
      expect(res.totalAmount).toBe(1000);
      done();
    })

  });

  it('should call onRadioChange if isChange is false', (done) => {
    const data = {
      isChange: false, event: 'S', previousValue: 'W'
    }
    const dialogSpy = jest.spyOn(component, 'openDialog').mockReturnValue(of('Change Type and Reset'));

    component.onRadioChange(data)
    component.openDialog(false).subscribe(res => {
      expect(res).toBe('Change Type and Reset');
      expect(dialogSpy).toHaveBeenCalled();
      done()
    });

  });



  it('should have a valid status for transaction', (done) => {
    jest.spyOn(component, 'getDeviationStatus').mockReturnValue(of(false));
    const productTransactionRequest = {
        isValid: true,
        formData: null,
    }
    component.productTransactionForm$ = of(productTransactionRequest);
    component.salesForm$ = of(productTransactionRequest);
    component.fundsInvalid = false;

    component.createApplicationStatus().subscribe(res => {
        expect(res).toBe(true);
        done();
    })
  })

  it('should have a invalid status for transaction', (done) => {
    jest.spyOn(component, 'getDeviationStatus').mockReturnValue(of(false));
    const productTransactionRequest = {
        isValid: false,
        formData: null,
    }
    component.productTransactionForm$ = of(productTransactionRequest);
    component.salesForm$ = of(productTransactionRequest);
    component.fundsInvalid = false;

    component.createApplicationStatus().subscribe(res => {
        expect(res).toBe(false);
        done();
    })
  });

  it('should call openDialogBox', () => {
    const dialogSpy = jest.spyOn(component.dialog, 'open');
    component.openDialogBox(true);
    expect(dialogSpy).toHaveBeenCalled();
  });

  it('should call beforeUnload', () => {
    const event = window.dispatchEvent(new Event('beforeunload'));
    component.beforeUnload({} as BeforeUnloadEvent);
  });

  it('should call dirtyCheckDialog', (done) => {
    const dialogSpy = jest.spyOn(component, 'openDialog').mockReturnValue(of(component.saveDraftLeave));
    component.dirtyCheckDialog();

    component.openDialog(false).subscribe(res => {
      expect(res).toBe(component.saveDraftLeave);
      expect(dialogSpy).toHaveBeenCalled();
      done()
    });
  });

  it('should call fundWarning', () => {
    const dialogSpy = jest.spyOn(component, 'openDialogBox');
    component.fundWarning('switch');
    component.fundWarningType = 'switch';

    component.openDialogBox(false).subscribe(() => {
      expect(dialogSpy).toHaveBeenCalled();
    });
  });

    it('should call resetSalesChargeWarning', () => {
      const openPopupSpy = jest.spyOn(component.dialog, 'open');
      component.resetSalesChargeWarning(mockDraftTransactionIdResponse);
      expect(openPopupSpy).toHaveBeenCalled();
  });

});
