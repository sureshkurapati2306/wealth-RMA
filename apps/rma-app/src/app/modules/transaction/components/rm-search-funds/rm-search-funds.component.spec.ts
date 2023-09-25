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
import { of, Subscription } from 'rxjs';
import { TransactionEffects } from '../../+state/transaction.effects';
import { RmSearchFilterComponent } from '../rm-search-filter/rm-search-filter.component';
import { RmSearchFundsComponent } from './rm-search-funds.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MockFundDetail, MockFundDetailData, MockISearchFundData } from '../../mock/fund-details.mock';
import { TransactionService } from '../../services/transaction.service';
import { ISearchFundData } from '../../+state/transaction.models';
import { CoreModule as MintOfficeModule, Environment } from '@cimb/mint-office';

class MockTransactionService {
    getFundDetails() { /* mock */ }
    openFundRemoveConfirmation() { /* mock */ }
}

describe('RmSearchFundsComponent', () => {
    let component: RmSearchFundsComponent;
    let fixture: ComponentFixture<RmSearchFundsComponent>;
    let transactionService: TransactionService;
    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                MatFormFieldModule,
                MatDialogModule,
                MatInputModule,
                MatIconModule,
                MatSelectModule,
                MatDividerModule,
                MatCardModule,
                MatButtonModule,
                MatCheckboxModule,
                MatAutocompleteModule,
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                HttpClientTestingModule,
                RouterTestingModule,
                MintOfficeModule,
            ],
            declarations: [RmSearchFundsComponent, RmSearchFilterComponent],
            providers: [
                TransactionEffects,
                { provide: 'environment', useValue: environment },
                {
                    provide: TransactionService,
                    useClass: MockTransactionService,
                },
                provideMockStore({
                    initialState: {
                        subscribeFunds: MockISearchFundData,
                        fundDetails: MockFundDetailData
                    }
                }),
            ],
        })
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RmSearchFundsComponent);
        transactionService = TestBed.inject(TransactionService);
        component = fixture.componentInstance;
        component.subscribeFunds$ = of(MockISearchFundData);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should unsubscribe formSubscription ngOnDestroy', () => {
        const formSubscribe = new Subscription();
        component.formSubscription = formSubscribe;
        const spy = jest.spyOn(component.formSubscription, 'unsubscribe');
        component.ngOnDestroy();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should remove funds', (done) => {
        jest.spyOn(transactionService, 'openFundRemoveConfirmation').mockReturnValue(of(true));
        component.addedFunds = MockISearchFundData;
        component.availableFunds = MockISearchFundData;
        component.removeFunds(MockISearchFundData[0]);

        component.openConfirmation(MockISearchFundData[0]).subscribe(res => {
            expect(res).toBe(true);
            expect(component.addedFunds).toEqual([]);
            done();
        })

    });

    it('should get true if fund added', () => {
        component.addedFunds = MockISearchFundData;
        const spy = jest.spyOn(component, 'isFundAdded');

        component.isFundAdded(MockISearchFundData[0]);

        expect(spy).toReturnWith(true);
    })

    it('should get false if fund not added', () => {
        component.addedFunds = MockISearchFundData;
        const spy = jest.spyOn(component, 'isFundAdded');

        component.isFundAdded({} as ISearchFundData);

        expect(spy).toReturnWith(false);
    })

    it('shoild set the funds in cart if fundCodes are avalable', () => {
        component.transactionFundsResponse$ = of(MockISearchFundData);
        transactionService.fundCodes = ['FD1234'];

        const spy = jest.spyOn(component, 'setFund');
        component.ngOnInit();

        expect(spy).toHaveBeenCalledWith(['FD1234']);
    })

    it('should to call allowFundsCart',()=>{
        component.allowFundsCart(MockFundDetail);
        expect(component.allowFundsCart(MockFundDetail)).toBeFalsy();
    })


});
