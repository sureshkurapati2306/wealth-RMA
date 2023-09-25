import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
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
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RmFundsComponent } from './rm-funds.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MockISearchFundData, MockRiskProfileInquiry } from '../../mock/fund-details.mock';
import { FundCardComponent } from '../fund-card/fund-card.component';
import { of } from 'rxjs';
import { RiskProfileToRatingPipe } from '@cimb/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TransactionService } from '../../services/transaction.service';
import { By } from '@angular/platform-browser';
import { FundDetailDialogComponent } from '../fund-detail-dialog/fund-detail-dialog.component';
import { MockSalesChargeResponse } from '../../mock/sales-charge.mock';


class MockTransactionService {
    getFundDetails() { /* mock */ }
    openFundRemoveConfirmation() { /* mock */ }
    getSalesChargeDropDown() { /* mock */ }
}

describe('RmFundsComponent', () => {
  let component: RmFundsComponent;
  let fixture: ComponentFixture<RmFundsComponent>;
  let store: MockStore<any>;
  let transactionService: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatDividerModule,
        MatCardModule,
        MatButtonModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatExpansionModule,
        MatDialogModule,
        StoreModule.forRoot({}),
      ],
      declarations: [RmFundsComponent, FundDetailDialogComponent, FundCardComponent, RiskProfileToRatingPipe],
      providers: [
        provideMockStore({ initialState: {
            riskProfileInquiry: MockRiskProfileInquiry
        }}),
        { provide: TransactionService, useClass: MockTransactionService }
      ],
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmFundsComponent);
    transactionService = TestBed.inject(TransactionService);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    jest.spyOn(transactionService, 'getSalesChargeDropDown').mockReturnValue(of(MockSalesChargeResponse));
    component.availableFunds$ = of(MockISearchFundData);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event remove record', (done)=> {
    jest.spyOn(transactionService, 'openFundRemoveConfirmation').mockReturnValue(of('Yes, Remove the Fund'));
    const spy = jest.spyOn(component.removeFund, 'emit');
    component.removeRecord(MockISearchFundData[0], MockISearchFundData);
    component.openConfirmation(MockISearchFundData[0], MockISearchFundData).subscribe(res => {
        expect(res).toBe('Yes, Remove the Fund');
        expect(spy).toHaveBeenCalledWith(MockISearchFundData[0]);
        done();
    })
  });

});
