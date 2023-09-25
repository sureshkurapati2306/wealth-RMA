import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { TransactionEffects } from './transaction.effects';
import * as transactionReducer from './transaction.reducer';
import * as Actions from '../+state/transaction.action';
import { Environment } from '../../core/models/environment.model';
import { ApplicationStatus, ProductType, TransactionDataRequestDTO, TransactionDataResponseDTO, ITransactionType } from '../models/application-status.model';
import { TableService } from '../services/table.service';
import { mockData, mockInvestmentResponse } from '../mock/customer-holding-mock.data';

const mockRequest: TransactionDataRequestDTO = {
    rmId: "123",
    customerId: "345",
    days: 10,
    pageNo: 1,
    pageSize: 0,
    productType: ProductType.UT,
    sortingFieldsOrder: ["createdDateTime.desc", "customerName.asc"],
    transactionStatus: [ApplicationStatus.Confirm],
    transactionType: [ITransactionType.Redeem]
}

const mockResponse: TransactionDataResponseDTO = {
    action: "Success",
    totalRecords: 2,
    pageNo: 1,
    pageSize: 10,
    rmId: 1234,
    prdType: ProductType.UT,
    transactions: [
        {
            id: 5,
            customerName: "Joe",
            refId: 123456,
            creationDate: "23-12-2020,16:45",
            applicationStatus: ApplicationStatus.Confirm,
            transactionType: ITransactionType.Redeem,
            rpExpiry: false,
            rpqApprovalStatus: "Y"

        }
    ]
}

class mockTransactionService {
    getTransaction() { /* mock */ }
    getInvestmentTransaction() { /* mock */ }
}

const mockState: transactionReducer.State = {
    applicationStatus: {
        request: null,
        response: null,
        errorMessage: ''
    },
    applicationHolding: {
        request: null,
        response: null,
        errorMessage: ''
    }
}

describe('AuthEffects', () => {
    let actions: Observable<Action>;
    let effects: TransactionEffects;
    let tableService: TableService;
    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [
              TransactionEffects,
              provideMockActions(() => actions),
              provideMockStore({ initialState: mockState }),
              { provide: 'environment', useValue: environment},
              {
                provide: TableService, useClass: mockTransactionService
              },
           ],
        });

        effects = TestBed.inject(TransactionEffects);

        tableService = TestBed.inject(TableService);
    });


  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should fetch all tracsaction with success status', (done) => {
    const spy = jest.spyOn(tableService, 'getTransaction').mockReturnValue(of(mockResponse));

    actions = of(Actions.transactionStart({
      data: mockRequest
    }));

    // subscribe to the Effect stream and verify it dispatches a SUCCESS action
    effects.transection$
      .subscribe(action => {
        expect(action).toEqual(Actions.transactionSuccess({
          data: mockResponse
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should fetch all customer holding with success status', (done) => {
    const spy = jest.spyOn(tableService, 'getInvestmentTransaction').mockReturnValue(of(mockInvestmentResponse));

    actions = of(Actions.getInvestmentTransaction({
      data: mockData
    }));

    // subscribe to the Effect stream and verify it dispatches a SUCCESS action
    effects.getInvestmentTransaction$
      .subscribe(action => {
        expect(action).toEqual(Actions.investmentTransactionSuccess({
          data: mockInvestmentResponse
        }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
  });


});
