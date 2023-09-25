import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderSummaryResolver } from './order-summary.resolver';
import { StoreModule } from '@ngrx/store';
import { MatDialogModule } from '@angular/material/dialog';

describe('OrderSummaryResolver', () => {
    let resolver: OrderSummaryResolver;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                MatDialogModule,
                StoreModule.forRoot({})
            ],
            providers:[]
        });

        resolver = TestBed.inject(OrderSummaryResolver);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });

    it('should return transactionRefId from current session', () => {
        resolver.transactionRefId = 'abc';
        resolver.transactionId = '123';
        resolver.cifNumber = 'cifNumner'
        const spy = jest.spyOn(resolver, 'resolve');
        resolver.resolve();

        expect(spy).toReturnWith({
            cifNumber: 'cifNumner',
            transactionRefId: 'abc',
            transactionId: '123'
        });
    });
});

