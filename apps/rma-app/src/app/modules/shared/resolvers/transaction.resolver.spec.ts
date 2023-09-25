import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { TransactionResolver } from './transaction.resolver';
import { ActivatedRoute } from '@angular/router';
import { StorageService, Environment, TransactionType } from '@cimb/mint-office';
import { TransactionService } from '../../transaction/services/transaction.service';
import { MockTransactionService } from '../../transaction/transaction.component.spec';

class MockStorageService {
    getItem() { /* mock */ }
    setItem() { /* mock */}
}

describe('TransactionResolver', () => {
    let route: ActivatedRoute;
    let resolver: TransactionResolver;
    let transactionService: TransactionService;
    let storageService: StorageService;
    const apiUrl = '/';
    const production = false;
    const environment: Environment = { production, apiUrl };


    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                MatDialogModule,
                StoreModule.forRoot({}),
            ],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {snapshot: { routeConfig: { path: 'draft' } }}
                },
                { provide: StorageService, useClass: MockStorageService },
                { provide: TransactionService, useClass: MockTransactionService },
                { provide: 'environment', useValue: environment },
            ]
        });
        resolver = TestBed.inject(TransactionResolver);
        route = TestBed.inject(ActivatedRoute);
        transactionService = TestBed.inject(TransactionService);
        storageService = TestBed.inject(StorageService);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });

    it('should resolve transectionId when we redirected to draft', () => {
        transactionService.cifNumber = 'abc'
        transactionService.transactionId = '123';

        const spy = jest.spyOn(resolver, 'resolve');
        resolver.resolve(route.snapshot);

        expect(spy).toReturnWith({
            cifNumber: 'abc',
            transactionType: null,
            transactionId: '123',
            fundCodes: null
        });
    });

    it('should resolve transection Id when no data in service', ()=> {
        transactionService.cifNumber = null
        transactionService.transactionId = null;
        const spy = jest.spyOn(resolver, 'resolve');

        jest.spyOn(storageService, 'getItem').mockReturnValue('abc');
        resolver.resolve(route.snapshot);

        expect(spy).toReturnWith({
            cifNumber: 'abc',
            transactionType: null,
            transactionId: 'abc',
            fundCodes: null
        });
    });

    it('resolve transactionType for new transaction', () => {
        if(route.snapshot !== null && route.snapshot.routeConfig !== null) {
            route.snapshot.routeConfig.path = 'transaction';
        }

        transactionService.cifNumber = 'abc';
        transactionService.transactionType = TransactionType.REEDEEM,
        transactionService.fundCodes = ["1", "2"];

        const spy = jest.spyOn(resolver, 'resolve');
        resolver.resolve(route.snapshot);

        expect(spy).toReturnWith({
            cifNumber: 'abc',
            transactionType: TransactionType.REEDEEM,
            transactionId: null,
            fundCodes: ["1", "2"]
        });
    });

    it('should return null when no data found', () => {
        if(route.snapshot !== null && route.snapshot.routeConfig !== null) {
            route.snapshot.routeConfig.path = 'transaction';
        }

        transactionService.cifNumber = null;
        transactionService.transactionType = null,
        transactionService.fundCodes = null;
        jest.spyOn(storageService, 'getItem').mockReturnValue(null);

        const spy = jest.spyOn(resolver, 'resolve');
        resolver.resolve(route.snapshot);

        expect(spy).toReturnWith(null);

    })
});
